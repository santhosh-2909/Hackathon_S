# Performance

## What was actually measured

```
npm run build   →  compiled in ~6-11s, 32 routes generated, exit 0
npm run dev     →  ready in ~1.7s
routes          →  all served 200, unknown path 404, no runtime errors logged
deck template   →  /deck/download returns a valid .pptx: zip integrity OK,
                   7 slide parts + 7 notes parts, correct OOXML MIME type
```

Route rendering, from the build output:

| Kind                                | Count | Routes                                                                    |
| ----------------------------------- | ----- | ------------------------------------------------------------------------- |
| Static (prerendered)                | 21    | Landing, playbook, deck, all auth, all 8 workspace pages, metadata routes |
| SSG via `generateStaticParams`      | 10    | Every problem-statement detail page                                       |
| Dynamic (server-rendered on demand) | 1     | `/problems` — reads `searchParams`                                        |

`/deck/download` is a route handler pinned `force-static`: the file is derived from a
constant, so generating it per request would burn CPU producing identical bytes.

**Not measured:** no Lighthouse run, no field data, no bundle-size budget. The numbers
above are build and smoke-test facts; Core Web Vitals for this build are unproven. See
_Open items_.

---

## Rendering strategy

**Server Components are the default.** Every page, every marketing section and every data
read runs on the server. A component opts into `'use client'` only for browser events,
local state, a focus-managing Radix primitive, or `useTheme`.

**Streaming where it buys something.** Four `Suspense` boundaries:

- Landing: the directory preview streams after the static bands, so the hero never waits
  on it.
- `/problems`: the result grid streams behind the filter bar, keyed on the query so a
  filter change shows a skeleton rather than a stale list.
- `/dashboard`: the two charts and the two lists stream as four independent islands, so
  the stat tiles paint immediately.

**Segment-level loading UI** at `dashboard/loading.tsx` and `problems/loading.tsx` — the
shell stays mounted and only the segment shows skeletons.

**Data stays on the server.** `services/*.ts` import `server-only`, so the 10-statement
catalogue and every workspace fixture are compile-time-guaranteed not to reach the client
bundle. `CommandPaletteMount` is a server component that hands the palette its index as
props — the palette ships no fetch and no loading state.

---

## Client bundle discipline

- **`optimizePackageImports`** on `lucide-react`, `framer-motion` and `cmdk`. All three
  are barrel-heavy; without this, one icon import pulls the whole set into the graph.
- **No charting library.** The three charts are hand-rolled SVG. Recharts or Chart.js
  would add 50–100 kB gzipped to render three simple figures.
- **No date library.** `Intl.NumberFormat` and `Intl.DateTimeFormat` are already in the
  runtime.
- **`pptxgenjs` never reaches the browser.** It is imported only by
  `services/deck-file.ts`, which is `server-only`, and consumed by a `force-static` route
  handler — so it runs at build time and ships zero bytes to the client.
- **No UI kit.** Radix primitives are individually imported; only what is used ships.
- Radix wrappers are leaf client components, so a `'use client'` boundary never pulls a
  page's worth of tree into the browser.

---

## Images

- `next/image` everywhere, with AVIF and WebP configured ahead of the original PNG.
- `deviceSizes` and `imageSizes` are trimmed to the actual container breakpoints, so the
  CDN never generates a variant nothing requests.
- **The hero ships no image at all** — its LCP element is the headline, so there is
  nothing above the fold to preload or shift. `priority` is reserved for the first three
  directory cards.
- Every image declares `sizes`, so the browser picks the right variant before layout.
- `fill` with an aspect-ratio parent, so images reserve their box and contribute **zero
  CLS**.

## Fonts

- Fraunces (display), Plus Jakarta Sans (UI) and JetBrains Mono through `next/font/google`:
  self-hosted at build time, no third-party origin, no render-blocking request.
- `display: swap` plus `font-synthesis-weight: none` — no faux-bold flash.
- Exposed as role-named CSS variables (`--font-display-family`) and consumed through the
  `--font-display` / `--font-sans` / `--font-mono` tokens, so a face swap touches one file.

## CSS

- Tailwind v4 with `source(none)` plus explicit `@source` directives scoped to `app/`,
  `components/` and `features/`. Automatic detection walks to the git root, which here
  holds unrelated projects and a 500 MB archive — see `MIGRATION.md`.
- Design tokens are CSS custom properties, so theme switching repaints without shipping a
  second stylesheet.
- Four CSS files total, bundled into one.

## Layout stability

- Fluid `clamp()` type: no reflow step at breakpoints.
- Aspect-ratio boxes on every image.
- `SkeletonRegion` placeholders match the dimensions of the content they stand in for.
- The sticky header is a fixed 4rem, and `scroll-padding-top` accounts for it.

## Caching and headers

- Static and SSG routes are immutable at the CDN edge by default.
- Security headers set in `next.config.ts`: `X-Content-Type-Options`, `X-Frame-Options`,
  `Referrer-Policy`, `Permissions-Policy`, `X-DNS-Prefetch-Control`.
- TanStack Query is configured with a 60s `staleTime` and `refetchOnWindowFocus: false`,
  so a client refetch never immediately duplicates what the server just rendered.

---

## Open items

1. **Run Lighthouse against `npm start`** and record LCP, CLS, INP and TBT. Nothing here
   substitutes for that.
2. **Set a bundle budget.** Add `@next/bundle-analyzer` and fail CI above a first-load JS
   ceiling.
3. **The ten `ps-*.png` source images are 0.6–1.1 MB each.** `next/image` re-encodes them
   to AVIF on demand, but pre-optimising the sources would cut build-time work and cold
   first-request latency.
4. **`/problems` is dynamic** because filters live in the URL. If the catalogue stays at
   ten entries, generating the common filter permutations statically would remove the
   only server-rendered route.
5. **Framer Motion is used for scroll reveals only.** If bundle size becomes a
   constraint, a CSS `@starting-style` + `IntersectionObserver` implementation would drop
   the dependency entirely.
