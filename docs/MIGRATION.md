# Migration notes

## Removed files summary

The old frontend was deleted, not ported. Nothing in `src/` derives from it.

Everything listed below was copied to a scratchpad backup before deletion
(`…/scratchpad/old-frontend-backup`, 29 files) — that backup is outside the repository
and is not a project artefact.

### Deleted — rendered frontend

| Path               | Size  | What it was                        |
| ------------------ | ----- | ---------------------------------- |
| `build/index.html` | 65 KB | The entire previous site, one file |
| `build/style.css`  | 60 KB | Its stylesheet                     |

### Deleted — exported design-system kit

| Path                                                                    | What it was                                                |
| ----------------------------------------------------------------------- | ---------------------------------------------------------- |
| `system/index.html`                                                     | 280 KB kit launcher                                        |
| `system/kit.html`, `system/kit.dark.html`                               | Light/dark component kits                                  |
| `system/artifacts/` (6 files)                                           | `deck` `email` `form` `landing` `newsletter` `poster` HTML |
| `system/variables.css`, `system/variables.dark.css`                     | Old CSS custom properties                                  |
| `system/tokens.default.json`, `tokens.dark.json`, `tokens.compact.json` | Old token exports                                          |
| `system/theme.json`, `system/seed.json`                                 | Theme config                                               |
| `system/scripts/apply-design-tokens.mjs`                                | Token-application script                                   |
| `system/BRAND-SYSTEM.md`                                                | Old system doc                                             |

### Deleted — brand and design documentation

`brand.html` (65 KB) · `brand.json` · `DESIGN (1).md` · `DESIGN-HANDOFF.md` ·
`DESIGN-MANIFEST.json` · `context/input-DESIGN.md` · `context/source-context.md`

### Deleted — assets

`imagery/catalis-template.jpg` — a Webflow template reference used only by the old hero.

### Preserved, and why

| Path                                             | Reason                                                                                                                                          |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/content-sources/sih-problem-statements.md` | The research the directory is built from. Content, not UI. Moved from `assets/`.                                                                |
| `docs/content-sources/workshop-copy.md`          | Source copy for the workshop sections. Moved from `assets/`.                                                                                    |
| `public/imagery/*` (19 files)                    | 10 `ps-*.png` domain illustrations (one per statement), 7 `hero-*.avif`, `cover-0.png` (OG image), `hero-bg-banana.png`. Moved from `imagery/`. |

**Totals:** 25 files deleted, ~1.1 MB of markup and CSS plus one unused image. Two
markdown files and nineteen images relocated. Zero files from the old frontend survive in
`src/`.

---

## What was deliberately not carried over

The previous `DESIGN-HANDOFF.md` framed itself as a "visual contract" requiring the export
to be matched pixel-for-pixel. That instruction is directly contrary to the rebuild brief,
so it was discarded along with the export. Specifically **not** reused:

- The old colour tokens. `brand.json` listed `#ebf5ff` as the page canvas and `#ffffff` as
  the _border_ colour — a border indistinguishable from the surface it borders. The new
  palette was authored from scratch in OKLCH.
- The old typography. `brand.json` specified `SFMono` for display _and_ body _and_ mono —
  a monospace body face at every size. The new system uses Geist Sans for text and reserves
  mono for codes and metadata, which is what the brand voice actually calls for.
- The old page structure: the circular drag-to-rotate problem gallery, the "Nano Banana"
  AI-image-prompt panel, the fake logo strip ("Northwind", "Lumen Labs", "Arcadia" — none
  of them real), and the "Rated by 500+ hackathon teams" star rating.

**The fabricated social proof was not reproduced.** The old page carried invented company
logos and an invented rating. The replacement strip lists the actual sourcing ministries
and organisations behind the statements, which is both true and more persuasive to the
audience.

---

## Content migration

All real copy was preserved and re-set, not rewritten:

| Old section                                              | New home                                                        |
| -------------------------------------------------------- | --------------------------------------------------------------- |
| "Most losing projects fail before any code is written"   | Hero headline, `features/marketing/hero.tsx`                    |
| The `[specific user] struggles to…` template             | Hero card + playbook                                            |
| Strong/weak nurse example, five checks, three-user proof | `features/marketing/problem-framework.tsx`                      |
| MVP / magic moment / vertical slice / de-risk / freeze   | `features/marketing/approach-timeline.tsx`                      |
| Stack table by team skill, AI / auth / judging rules     | `features/marketing/stack-guide.tsx`                            |
| SIH directory (10 statements)                            | `constants/problem-statements.ts` → directory + 10 detail pages |
| `mentor@hackathon:~/workshop $ build. test. ship.`       | Footer, auth panel, CTA band                                    |

The ten statements gained structured fields the flat HTML did not have — difficulty,
dataset availability, vertical-slice estimate, suggested stack — derived from the research
document's own assessments. Each detail page carries the research file's caveat that
expected-solution text is reconstructed guidance and PS codes must be verified on the live
portal.

---

## Notable implementation decisions

**`.npmrc` pins `legacy-peer-deps=true`.** React 19 + 18 Radix packages +
`eslint-config-next@16` gave npm's strict resolver a graph it backtracked on for more than
ten minutes of CPU without converging or failing. Legacy resolution produced a working
tree in seconds. Revisit when the peer ranges settle.

**ESLint uses `eslint-config-next`'s native flat configs, not `FlatCompat`.** The compat
shim throws `Converting circular structure to JSON` against v16, which ships real flat
configs. `@eslint/eslintrc` remains in `devDependencies` but is no longer imported.

**Tailwind's source detection is pinned with `source(none)`.** By default
`@import 'tailwindcss'` walks up to the nearest git root to find files to scan. That root
is `e:/app_build`, which holds several unrelated projects and a ~500 MB archive. With that
scan surface the dev server stopped detecting newly added class names: `text-hero`,
`font-display` and `bg-accent-soft` were absent from the served stylesheet while older
utilities in the same `@theme` block compiled fine, so the page rendered with fallback
type sizes and unsized SVGs. A clean production build was always correct, which is what
identified it as a scan problem rather than a config error. `@import 'tailwindcss'
source(none)` plus the three explicit `@source` lines makes the scan surface exactly
`src/app`, `src/components` and `src/features`.

_Lesson recorded here because it nearly shipped:_ checking that a route returns 200 does
not tell you its CSS compiled. When a utility is new, grep the served stylesheet for it.

**Next.js 16's React Compiler lint rules were treated as correctness feedback, not noise.**
Four `set-state-in-effect` errors were fixed at the source rather than suppressed:

- `useIsHydrated` was written on `useSyncExternalStore`, which gives React separate server
  and client snapshots — the hydration-safe pattern without state or an effect. It replaced
  the `useState` + `useEffect` "mounted" idiom in two components.
- The mobile drawer now closes via a delegated click handler, which also covers same-page
  anchors that never change `pathname`.
- The directory search field syncs from the URL by adjusting state during render behind a
  previous-value guard — the documented pattern, and one render faster than an effect.
- `form.watch()` was replaced with `useWatch()` in two forms, so React Compiler can
  memoise them.

**`AGENTS.md` and `CLAUDE.md` at the repo root are generated by Next.js 16**, not written
by hand. Disable with `agentRules: false` in `next.config.ts` if unwanted.

---

## Future scalability recommendations

### Near term

1. **Replace the fixtures with a real backend.** `services/problems.ts` and
   `services/workspace.ts` are the only modules that read data, and route components never
   import `constants/` directly. Swapping in Prisma or Supabase touches those two files.
2. **Wire real auth.** The three forms validate and exercise pending/success states but
   post nowhere. Add Auth.js or Clerk, then a `middleware.ts` matcher on `/dashboard/:path*`.
3. **Convert mutations to Server Actions.** Invite, profile save and notification
   preferences currently simulate with `setTimeout`. Server Actions plus `useOptimistic`
   would give real optimistic UI with no client fetch layer.
4. **Add tests.** Vitest for `paginationRange`, `niceTicks`, `slugify` and the Zod schemas;
   Playwright for the directory filter flow, the palette, and form validation.
5. **Add CI**: typecheck → lint → build → Playwright → Lighthouse budget.

### As the catalogue grows

6. **Move statements to a CMS or database** once the count passes ~50. The service
   signatures already model pagination and filtering, so `listProblems` changes internally
   and callers do not.
7. **Replace substring search with real search** (Postgres full-text or Typesense) at the
   same threshold.
8. **Add `generateStaticParams` for common filter permutations**, or keep `/problems`
   dynamic with ISR — the choice depends on how large the catalogue gets.

### As the team grows

9. **Enforce the layering with lint.** An `import/no-restricted-paths` rule preventing
   `app/**` from importing `constants/**`, and `features/*` from importing each other,
   turns the current convention into a guarantee.
10. **Add Storybook** for the 28 primitives. The design system is documented in prose; a
    rendered gallery makes drift visible.
11. **Add visual regression** (Chromatic or Playwright screenshots) across the nine
    viewport widths in the breakpoint table.
12. **Extract `components/ui/` into a workspace package** if a second application appears.
    The primitives have no product-specific imports, so this is a move, not a refactor.

### Product surfaces the architecture already anticipates

13. **Parallel and intercepting routes** — a `@modal` slot over `/problems` would give
    statement previews a URL without leaving the directory. The route-group structure
    supports it without reorganisation.
14. **Per-team workspaces** — a `/[team]/dashboard` dynamic segment fits the existing
    `(app)` group directly.
15. **Real charts** — `ChartFrame` already owns the title, legend and table view, so
    adding chart types means new mark components, not new chrome.
