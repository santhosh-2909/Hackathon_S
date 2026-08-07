# Architecture

## Folder structure

Organised **by feature where behaviour is domain-specific, by type where it is shared.**
A component used by one surface lives with that surface; one used by three lives in
`components/`.

```
src/
├── app/                          # Routing only — thin route components
│   ├── (marketing)/              # Public surface: header + footer shell
│   ├── (auth)/                   # Credential surface: split-panel shell
│   ├── (app)/dashboard/          # Authenticated surface: sidebar + topbar shell
│   ├── layout.tsx                # Root: fonts, providers, metadata, skip link
│   ├── error.tsx                 # Route-level error boundary
│   ├── global-error.tsx          # Root boundary (renders its own <html>)
│   ├── not-found.tsx             # 404
│   ├── sitemap.ts robots.ts manifest.ts
│
├── features/                     # Domain slices — the bulk of the product
│   ├── marketing/                # Hero, framework, timeline, stack, CTA, marquee
│   ├── problems/components/      # Card, filters, pagination
│   ├── problem-statement/        # Framework cards, shared by the landing section
│                                 # and the dedicated /problem-statement page
│   ├── auth/                     # Sign-up schema + form + password field
│   ├── deck/                     # Slide canvas (16:9, container-query type) + viewer
│   ├── dashboard/                # Library table, invite dialog, status badges
│   └── settings/                 # Section nav, profile / appearance / notification forms
│
├── components/
│   ├── ui/                       # Design-system primitives (28 files)
│   ├── layout/                   # Shells: headers, sidebar, footer, palette, logo, theme
│   ├── common/                   # Section, PageHeader, EmptyState, ErrorState, Reveal
│   └── charts/                   # ChartFrame, TrendChart, BarChart, StatTile
│
├── services/                     # Data access — the ONLY place data is read
│   ├── problems.ts               # Directory queries (list, get, counts, neighbours)
│   ├── workspace.ts              # Workspace fixtures (user, tracked, team, submissions)
│   └── deck-file.ts              # Renders the slide constants to a .pptx (server-only)
│
├── constants/                    # Static domain data: 10 statements, 5 domains,
│                                 # the 7-slide pitch template, the workshop-deck outline
├── config/                       # site.ts (brand + URLs), navigation.ts (every nav map)
├── types/                        # problem.ts, workspace.ts
├── hooks/                        # use-element-size, use-is-hydrated
├── lib/                          # utils.ts (cn, slugify, pagination), format.ts
├── providers/                    # theme-provider, query-provider
├── stores/                       # ui-store (Zustand)
└── styles/                       # tokens.css, base.css, utilities.css, globals.css
```

**The rule that keeps this honest:** route components in `app/` never import from
`constants/`. They call `services/`. Swapping the fixtures for a database touches two
files and nothing else.

---

## Routing architecture

Three route groups, three shells, one URL namespace. Route groups `(marketing)`,
`(auth)` and `(app)` do not appear in any URL — they exist so each surface gets its own
layout without a path prefix.

| Route                                                | Rendering                | Shell                        | Notes                                                                              |
| ---------------------------------------------------- | ------------------------ | ---------------------------- | ---------------------------------------------------------------------------------- |
| `/`                                                  | Static                   | Marketing                    | Streams the directory preview behind `Suspense`                                    |
| `/problems`                                          | **Dynamic**              | Marketing                    | Reads `searchParams`; filter state lives in the URL                                |
| `/problems/[slug]`                                   | **SSG ×10**              | Marketing                    | `generateStaticParams` + per-page `generateMetadata`                               |
| `/problem-statement`                                 | Static                   | Marketing                    | The nav's first destination; opens with the template rather than an in-page anchor |
| `/playbook`                                          | Static                   | Marketing                    |                                                                                    |
| `/workshop`                                          | Static                   | Marketing                    | Outline of the supplied 72-slide technical deck; the file is a static asset        |
| `/deck`                                              | Static                   | Marketing                    | Seven-slide pitch template, viewer + timing table                                  |
| `/deck/download`                                     | **Static route handler** | —                            | Generates the real `.pptx`; `force-static` so it is built once, not per request    |
| `/sign-up`                                           | Static                   | Auth                         | `robots: noindex`. Sign-in and password reset were removed on request              |
| `/dashboard`                                         | Static                   | App                          | Four `Suspense` islands stream independently                                       |
| `/dashboard/library`                                 | Static                   | App                          |                                                                                    |
| `/dashboard/team`                                    | Static                   | App                          |                                                                                    |
| `/dashboard/submissions`                             | Static                   | App                          |                                                                                    |
| `/dashboard/profile`                                 | Static                   | App                          |                                                                                    |
| `/dashboard/settings`                                | Static                   | App + nested settings layout | Profile panel                                                                      |
| `/dashboard/settings/account`                        | Static                   | ↳                            |                                                                                    |
| `/dashboard/settings/appearance`                     | Static                   | ↳                            |                                                                                    |
| `/dashboard/settings/notifications`                  | Static                   | ↳                            |                                                                                    |
| `/sitemap.xml` `/robots.txt` `/manifest.webmanifest` | Static                   | —                            | Metadata route handlers                                                            |

Special files: `app/(app)/dashboard/loading.tsx`,
`app/(marketing)/problems/loading.tsx`, `app/error.tsx`, `app/global-error.tsx`,
`app/not-found.tsx`.

**Nested layouts.** `/dashboard/settings/*` has its own layout holding the page header
and section nav, so switching panels re-renders the panel only.

**Why `/problems` is dynamic and everything else is not.** Filters write to the query
string rather than to component state, which makes a filtered view shareable,
bookmarkable and refresh-safe — and lets the server component re-render from the URL
alone. That requires request-time rendering. The `Suspense` boundary is keyed on the
params so a filter change shows the skeleton instead of a stale list.

---

## Page inventory

**Marketing (7 pages / 17 URLs)**

| Page                 | Sections                                                                                                                                           |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Landing              | Hero (copy left, workshop-deck panel right) · sourcing marquee · problem framework · approach stepper · stack guide · directory preview · CTA band |
| Problem statement    | Template with its five slots · worked strong/weak examples · the five checks · onward CTA                                                          |
| Workshop deck        | Header + download · format note · 5 parts × 18 module cards with slide ranges                                                                      |
| Pitch deck           | Header + download · slide viewer with thumbnail rail · timing-budget table · usage note                                                            |
| Directory            | Search · domain chips · sort · result grid · pagination · filtered-empty state                                                                     |
| Statement detail ×10 | Breadcrumb · header + art · fact strip · four prose blocks · dataset + stack + verification sidebar · prev/next                                    |
| Playbook             | Three accordion sections (choosing / building / stack) · sticky on-this-page nav                                                                   |

**Auth (1 page)** — sign-up only: live password requirement checklist, confirm, terms.
Sign-in and password reset were removed on request; `/sign-in` and `/reset-password` now
404, and the workspace "Sign out" item returns to `/` rather than to a login screen.

**Workspace (8 pages)** — overview (4 stat tiles, trend chart, bar chart, tracking list,
activity feed), library (sortable/filterable table with row actions), team (members
table + invite dialog), submissions (cards with empty state), profile, and four settings
panels.

**System (3)** — 404, route error, global error.

---

## Component inventory

### Primitives — `components/ui/` (28)

| Component                          | Base             | Notes                                                        |
| ---------------------------------- | ---------------- | ------------------------------------------------------------ |
| `button`                           | Radix Slot + CVA | 7 variants × 5 sizes; `asChild`                              |
| `badge`                            | Radix Slot + CVA | 8 variants × 2 sizes                                         |
| `card`                             | —                | Header / Title / Description / Action / Content / Footer     |
| `input`                            | —                | `Input` + `Textarea` share one `fieldBase`                   |
| `label`                            | Radix Label      |                                                              |
| `form`                             | RHF + Radix Slot | Wires `aria-describedby` / `aria-invalid` / `role="alert"`   |
| `dialog`                           | Radix Dialog     |                                                              |
| `sheet`                            | Radix Dialog     | 4 sides; Header / Body / Footer                              |
| `dropdown-menu`                    | Radix            | Items, checkbox, radio, sub-menus, shortcuts, danger variant |
| `select`                           | Radix Select     |                                                              |
| `popover`                          | Radix Popover    |                                                              |
| `tooltip`                          | Radix Tooltip    |                                                              |
| `command`                          | cmdk + Dialog    | Command palette surface                                      |
| `tabs` `accordion` `collapsible`   | Radix            |                                                              |
| `checkbox` `switch` `radio-group`  | Radix            |                                                              |
| `table`                            | —                | Focusable, labelled scroll container                         |
| `pagination`                       | —                | Real links; disabled edges render as `<span>`                |
| `breadcrumb`                       | —                |                                                              |
| `progress`                         | Radix Progress   | Track is a lighter step of the fill's own ramp               |
| `avatar` `separator` `scroll-area` | Radix            |                                                              |
| `skeleton`                         | —                | `Skeleton` + `SkeletonRegion` (announces "loading")          |
| `alert`                            | —                | Icon per variant, enforced                                   |
| `toaster`                          | Sonner           | Token-driven in both themes                                  |

### Layout — `components/layout/` (7)

`marketing-header` (sticky, scroll-aware, mobile sheet) · `marketing-footer` ·
`app-sidebar` (collapsible, tooltips when collapsed) · `app-topbar` (search, notifications
popover, account menu, mobile drawer) · `command-palette` + `command-palette-mount`
(server component feeds the index) · `logo` · `theme-toggle`.

### Common — `components/common/` (5)

`Section` (the marketing band template) · `PageHeader` · `EmptyState` (`empty` and
`filtered` variants) · `ErrorState` · `Reveal`.

### Charts — `components/charts/` (4)

`ChartFrame` (title, legend, table view) · `TrendChart` (2 series, crosshair, tooltip) ·
`BarChart` (single series) · `StatTile` (+ inline sparkline).

### Feature components (18)

7 marketing sections · 3 problem-directory components · 4 auth components · 3 dashboard
components · 4 settings components.

---

## Server vs client boundary

Server Components are the default. A component becomes `'use client'` only when it needs
one of: browser events, `useState`/`useEffect`, a Radix primitive that manages focus, or
`useTheme`.

Client components: the two headers, sidebar, palette, theme toggle, all Radix wrappers,
all forms, the filter bar, the library table, the three charts, and `Reveal`. Everything
else — every page, every marketing section, every data read — runs on the server.

Two patterns worth calling out:

- **`CommandPaletteMount`** is a server component that computes the palette index and
  passes it as props. The palette ships no fetch and has no loading state.
- **`services/*.ts` import `server-only`**, so a client component that imports them fails
  at build time rather than leaking the module into the browser bundle.

---

## State management

| Kind               | Tool                      | Where                                       |
| ------------------ | ------------------------- | ------------------------------------------- |
| Server data        | RSC `async` + `services/` | Default for everything                      |
| URL state          | `searchParams`            | Directory filters, search, sort, page       |
| Cross-component UI | Zustand (`ui-store`)      | Palette open, mobile nav, sidebar collapsed |
| Form state         | React Hook Form + Zod     | All five forms                              |
| Client cache       | TanStack Query            | Provider mounted; no query needs it yet     |

Zustand holds exactly three flags — all of them read and written by components that are
not ancestors of one another (the palette opens from the topbar, ⌘K, and the sidebar).
Anything a single subtree owns stays in `useState`.

---

## Dependency list

**Runtime**

| Package                                            | Why                                                                                                          |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `next` `react` `react-dom`                         | Framework and runtime                                                                                        |
| `@radix-ui/react-*` (18)                           | Accessible unstyled primitives — focus traps, roving tabindex, ARIA                                          |
| `class-variance-authority` `clsx` `tailwind-merge` | Variant API and conflict-safe class merging                                                                  |
| `lucide-react`                                     | Icons; tree-shaken via `optimizePackageImports`                                                              |
| `framer-motion`                                    | Scroll reveals with a reduced-motion escape hatch                                                            |
| `cmdk`                                             | Command palette filtering and keyboard model                                                                 |
| `sonner`                                           | Toasts                                                                                                       |
| `react-hook-form` `@hookform/resolvers` `zod`      | Uncontrolled forms + one schema per form                                                                     |
| `@tanstack/react-query`                            | Client cache for future client-fetched data                                                                  |
| `zustand`                                          | Three cross-component UI flags                                                                               |
| `next-themes`                                      | Class-based theme with no flash                                                                              |
| `pptxgenjs`                                        | Builds the real `.pptx`. Server-only, and the route is `force-static`, so it never reaches the client bundle |
| `server-only`                                      | Compile-time guard on the service layer                                                                      |

**Dev** — `typescript`, `@types/*`, `tailwindcss`, `@tailwindcss/postcss`,
`tw-animate-css`, `eslint`, `eslint-config-next`, `eslint-config-prettier`, `prettier`,
`prettier-plugin-tailwindcss`.

Nothing else. No UI kit, no CSS framework beside Tailwind, no date library (`Intl` covers
it), no charting library (the three charts are hand-rolled SVG, which is smaller than any
dependency that would render them).
