# Accessibility report

Target: **WCAG 2.2 AA**.

This report separates what was _implemented and verified in code_ from what is _claimed
but not yet measured_. The second list is short and honest — no automated audit or
assistive-technology pass has been run against this build.

---

## Implemented and verified by inspection

### Structure and semantics

- Exactly one `<h1>` per page. Heading size is a token, never the tag — a visually
  smaller heading uses a smaller class, so the outline is never broken to get a size.
- Landmarks on every surface: `<header>`, `<nav>` (each with a distinct `aria-label`:
  Primary, Mobile, Workspace, Settings sections, Breadcrumb, Pagination, Adjacent
  statements), `<main id="main">`, `<footer>`, `<aside>`.
- Lists are lists. Card grids are `<ul>/<li>`, the approach stepper is an `<ol>`, the
  activity feed is an `<ol>`, fact strips are `<dl>/<dt>/<dd>`.
- Tables use `<th scope="col">` and `<th scope="row">`, plus `<caption>` where the table
  needs an explanation.

### Keyboard

- **Skip link** is the first focusable element on every page, moving focus to `#main`.
  It is off-canvas until focused, then slides in.
- One focus policy site-wide: 2px `--ring` outline at 2px offset via `:focus-visible`.
  Nothing anywhere sets `outline: none` without a replacement.
- **Focus-visible parity on hover affordances.** Cards style `:focus-within` identically
  to `:hover`, so keyboard users see the same state change.
- **Horizontally scrolling tables are reachable without a pointer** — the scroll
  container is `tabIndex={0}` with `role="region"` and a label. This is the most common
  place a responsive layout locks out keyboard users.
- Focus traps, restore-on-close, `Escape`, roving tabindex and typeahead come from Radix
  in every dialog, sheet, dropdown, select, popover, tabs and accordion.
- Command palette: ⌘K / Ctrl-K globally, with Radix Dialog handling the trap and scroll
  lock.
- Disabled pagination edges render as `<span aria-disabled>`, not as anchors — a link
  that goes nowhere is still focusable and still announced as a link.
- One tab stop per directory card: the whole card is a stretched link anchored to the
  title, so the card is not a focus trap of duplicate targets.

### Screen readers

- `SkeletonRegion` wraps every loading region in `role="status" aria-live="polite"
aria-busy` with a visually hidden "Loading" label — otherwise a skeleton is silence.
- Result counts announce with `aria-live="polite"` on both `/problems` and the library
  table, so filtering is audible.
- `FormMessage` renders `role="alert"` and is wired to its control through
  `aria-describedby`; `FormControl` sets `aria-invalid`. Errors are announced, not just
  reddened.
- Decorative images use `alt=""`; decorative SVG and icons use `aria-hidden`.
- Icon-only buttons all carry `aria-label` (theme, menu, notifications, account, sidebar
  collapse, password reveal, row actions).
- Password reveal is a real `<button>` with `aria-pressed` and a label that changes with
  state, so the current state is announced rather than only drawn.
- Sign-up's live password checklist adds visually hidden "— met" / "— not yet met" text
  so the checkmark opacity is not the only signal.
- Links that open a new tab append a visually hidden "(opens in a new tab)".
- Charts carry a descriptive `role="img"` label and point at the table view.

### Colour and contrast

Every pair in the system was computed from the OKLCH token definitions through sRGB to
WCAG relative luminance. **All 28 pairs pass in both themes:**

| Pair                                         | Threshold | Light | Dark  |
| -------------------------------------------- | --------- | ----- | ----- |
| Body ink on canvas                           | 4.5       | 17.71 | 17.84 |
| Body ink on surface                          | 4.5       | 19.26 | —     |
| Muted ink on canvas (nav links)              | 4.5       | 7.29  | 7.07  |
| Muted ink on surface                         | 4.5       | 7.93  | —     |
| Muted ink on sunken                          | 4.5       | 6.77  | —     |
| Subtle ink on canvas                         | 4.5       | 5.39  | —     |
| Subtle ink on the darkest plane it sits on   | 4.5       | 5.01  | 4.52  |
| Accent as ink on canvas                      | 4.5       | 7.71  | —     |
| Accent as ink on surface                     | 4.5       | 8.38  | 7.15  |
| Accent as ink on accent surface (active nav) | 4.5       | 6.98  | 6.13  |
| Accent on inverted panel                     | 4.5       | 9.23  | 5.81  |
| Inverse text on the inverted panel           | 4.5       | 18.46 | —     |
| CTA ink on the soft lavender fill            | 4.5       | 11.10 | 11.10 |
| Soft-fill **boundary** on canvas             | 3.0       | 3.70  | 11.75 |
| `--border-strong` on canvas                  | 3.0       | 3.00  | —     |
| `--input` on a white card                    | 3.0       | 3.00  | —     |
| Primary-foreground on primary                | 4.5       | 17.69 | 17.39 |
| Focus ring on canvas                         | 3.0       | 6.75  | 7.54  |

**Four failures were found by measuring and fixed in the tokens, not written off in this
report.** In the first palette, `--subtle-foreground` was 3.35:1 on `--surface-sunken`
while carrying caption text; the accent was 3.98:1 as ink and 3.90:1 as a button fill
under white text; and the accent on inverted panels measured 2.82:1 in dark mode. When
the palette later moved to a cream page with a pale lavender CTA, that fill measured
1.47:1 against the page — a WCAG 1.4.11 non-text-contrast failure — which is why
`variant="soft"` carries a mandatory `--accent-soft-border`. A later contrast pass caught
`--border-strong` at 1.84:1 while it was bounding hoverable controls; it and `--input`
were re-stepped to land on 3.00:1 against the planes they actually sit on.

**Navigation is marked with colour, not only weight.** The current page in the header rail
uses `--accent-surface` behind `--accent-text` (6.98:1) rather than a grey wash, so the
active item is findable at a glance among five — and `aria-current="page"` carries the
same fact for anyone not seeing the colour.

- **Status is never colour alone.** `Alert` requires an icon per variant;
  `TrackStatusBadge` and `SubmissionStageBadge` pair every state with an icon and a word.
- Chart palette validated against this product's own surfaces: CVD separation worst ΔE
  9.2 light / 9.4 dark (target ≥8); normal-vision floor worst ΔE 24.0 / 20.9 (floor ≥15).
- **Every chart ships a table view** — a `<details>` disclosure containing the same values
  as a real table. Colour is never the only way to read a chart.
- Charts label text with ink tokens, never the series colour.

### Motion and preferences

- `prefers-reduced-motion: reduce` collapses all animation and transition to 0.01ms and
  disables smooth scrolling, handled once globally in `base.css`.
- `Reveal` additionally short-circuits to a plain `div` — no motion component mounts.
- Charts never animate on data change.
- `forced-colors: active` sets `forced-color-adjust: auto` so Windows High Contrast
  overrides are respected.
- `color-scheme` is declared on both themes, so native form controls and scrollbars match.

### Responsive and touch

- Fluid `clamp()` type and spacing, so nothing steps awkwardly between breakpoints.
- Touch targets ≥44px in every mobile navigation surface.
- `scroll-padding-top: 5.5rem` on `<html>` so a sticky header never covers an in-page
  anchor target.
- Wide content scrolls inside its own container; the page body never scrolls
  horizontally.

### Forms

- Every input has a real `<label>` (visually hidden where the design calls for it).
- `noValidate` on all forms so Zod messages are the single source of validation text.
- `autoComplete` set correctly (`email`, `current-password`, `new-password`, `name`).
- Validation is `onTouched` — errors appear after a field is left, not while typing.

---

## Not yet verified

These are honest gaps, not omissions to be discovered later:

1. **No automated audit has been run.** axe, Lighthouse and pa11y have not been executed
   against this build. Add `@axe-core/react` in development and a Lighthouse CI budget.
2. **No screen-reader pass.** NVDA, JAWS and VoiceOver have not been used to walk the
   flows. The palette, the library table and the chart table views are the three surfaces
   most likely to surface issues.
3. **Contrast figures are computed from the token definitions, not sampled from rendered
   pixels.** The maths is exact for flat colour. The two places that composite —
   `opacity-70` supporting copy on the CTA band and the auth panel — were computed
   separately by alpha-blending against their own backgrounds and land at **8.99:1 light
   / 7.24:1 dark**, so they pass comfortably. Nothing else in the UI stacks alpha over
   text, but a sampled pass on the built pages would confirm that.
4. **Zoom to 400% has not been tested.** WCAG 2.2 AA requires reflow at 320px-equivalent
   width; the fluid scales should hold but this is unproven.
5. **The `sr-only` announcement on the sign-up checklist is inside a static list**, so a
   screen reader will not re-announce it as it changes. An `aria-live` region reporting
   "3 of 3 requirements met" would be better.

---

## Recommended next steps

1. Add `eslint-plugin-jsx-a11y` (Next's config includes a subset; the full ruleset catches
   more).
2. Wire `@axe-core/react` into the dev entry so violations surface during development.
3. Add a Playwright + `@axe-core/playwright` smoke test over the 16 routes.
4. Run one manual NVDA pass over: sign-up, directory filtering, library table sorting, and
   the command palette.
