# Design system

Built from first principles for this product. No token, scale or component was carried
over from the previous frontend or its exported kit.

**Where it lives:** [`src/styles/tokens.css`](../src/styles/tokens.css) is the single
source of truth. `base.css` sets element defaults and the focus/motion policy;
`utilities.css` holds the handful of repeating patterns that are not a short utility
chain; `globals.css` is the entry that imports Tailwind and the three.

Every token is authored once as a CSS custom property and then bridged into Tailwind
with `@theme inline`, so `bg-surface`, `text-h1` and `rounded-lg` resolve to the exact
same variable that raw CSS reads. There is no second source of colour anywhere.

---

## 1. Design direction

The brand voice is a technical mentor with no patience for fluff — concrete, verifiable,
unimpressed by hype. The visual system reads as **considered editorial**: a warm paper
page, one elegant serif at display sizes, plain white cards, and a single soft violet
that only ever marks the next action.

| Principle                           | Consequence                                                                                                                                          |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tinted page, neutral cards          | The cream canvas carries the warmth; cards stay white so no content is tinted                                                                        |
| Serif for display, sans for reading | The serif appears at ≥2rem only — its thin joins vanish at text sizes                                                                                |
| Hairlines over shadows              | Structure comes from 1px borders; elevation is for things that genuinely float                                                                       |
| One accent, used sparingly          | A soft violet for the next action, emphasis and focus — never a page-wide wash                                                                       |
| Monospace as metadata               | Mono is for codes, keys, prompts and figures; never body copy                                                                                        |
| Restrained motion                   | ~12px of travel on a decelerating curve, once. No overshoot, no parallax                                                                             |
| Decoration must argue               | The only ornament is a hairline grid that fades out above the hero type. An earlier pair of curved-text flourishes was removed for failing that test |

Explicitly rejected: gradient-heavy AI-startup heroes, glassmorphism, floating 3D card
carousels, and template-dashboard chrome.

---

## 2. Colour

Authored in **OKLCH** for perceptual evenness — a lightness step means the same visual
step at every hue, which a hex ramp cannot promise.

### Semantic roles

| Token                                                       | Role                                                                                                                                                          |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--canvas`                                                  | Page background — one step off `--surface` so cards read as raised without a shadow                                                                           |
| `--surface`, `--surface-raised`, `--surface-sunken`         | Card, popover, and inset-panel planes                                                                                                                         |
| `--surface-inverse` (+ `-foreground`)                       | Inverted bands: the CTA band, tooltips, the auth panel                                                                                                        |
| `--foreground`, `--muted-foreground`, `--subtle-foreground` | Three ink levels — body, secondary, metadata                                                                                                                  |
| `--border`                                                  | Decorative hairline — dividers and card edges                                                                                                                 |
| `--border-strong`, `--input`                                | Control boundaries. Both carry 3:1 (WCAG 1.4.11) against the plane they sit on — 3.00:1 for `--border-strong` on canvas, 3.00:1 for `--input` on a white card |
| `--primary` (+ `-hover`, `-foreground`)                     | Primary action. Near-black in light, near-white in dark                                                                                                       |
| `--accent` (+ `-hover`, `-foreground`)                      | Violet **mark** step — chart marks, emphasis, the ring                                                                                                        |
| `--accent-text`                                             | Same hue **as ink** on light planes. Darker so caption-size text clears 4.5:1                                                                                 |
| `--accent-soft` (+ `-foreground`, `-border`, `-hover`)      | Pale lavender **button fill** carrying near-black ink                                                                                                         |
| `--accent-on-inverse`                                       | Same hue as ink on `--surface-inverse`. Flips lightness between modes because the panel does                                                                  |
| `--accent-surface`, `--accent-border`                       | Tinted plane and its boundary                                                                                                                                 |
| `--ring`                                                    | Focus ring. Bound to accent so focus is unmistakable                                                                                                          |
| `--overlay`                                                 | Scrim behind dialogs and sheets                                                                                                                               |

**The accent is four steps, not one.** A single violet cannot simultaneously be a pale
button fill under near-black text, 12px ink on cream, and a saturated chart mark — the
three requirements pull lightness in different directions. Splitting them is the same
pattern the status colours already use (`--success` for the mark, `--success-foreground`
for the word), so it needed no new concept.

Two of those steps exist for a specific measured reason:

- **`--accent-soft-border` is not decoration.** The pale fill sits at 1.47:1 against the
  cream page — far under the 3:1 that WCAG 1.4.11 requires for a control's boundary. The
  border is what makes the button's edge perceivable, so `variant="soft"` always ships it.
- **`--accent-on-inverse`** exists because inverted panels swap lightness between themes;
  a step that passes on a dark panel in light mode fails on a light panel in dark mode.

The pale fill deliberately does **not** flip between themes. A bright lavender button
reads correctly on both a cream page and a near-black one, and flipping it would make the
primary call to action change character depending on the viewer's OS setting.

### Status

`success` · `warning` · `danger` · `info`, each with a `-foreground` (contrast-corrected
text step), `-surface` and `-border`.

**Status never travels on colour alone.** `Alert` ships a matching icon per variant and
requires a visible title. `TrackStatusBadge` and `SubmissionStageBadge` pair every state
with an icon _and_ a word. Colour is the third channel, never the only one.

### Dark mode

Dark is a **selected** set of steps, not an inversion. `next-themes` writes `class="dark"`
on `<html>` and Tailwind's dark variant is bound to that class
(`@custom-variant dark (&:where(.dark, .dark *))`), so the in-app toggle is authoritative
over the OS preference rather than fighting it. Surfaces lift as they rise (`0.1477 →
0.1837 → 0.2144` L) because a dark plane cannot cast a visible shadow; elevation is
carried by lightness instead.

---

## 3. Typography

Three faces, each with one job:

- **Fraunces** (`font-display`) — display sizes only, ≥1.5rem. A variable serif with an
  optical-size axis, so the 112px headline gets the high-contrast display cut while the
  smaller stat figures keep enough stroke weight to hold. A single static optical size
  cannot serve both ends of that range.
- **Plus Jakarta Sans** (`font-sans`) — all reading text and every UI control.
- **JetBrains Mono** (`font-mono`) — codes, keyboard hints, the shell prompt.

All three load through `next/font/google` with `display: swap` and are self-hosted at
build time — no render-blocking request, no layout shift, no third-party origin. Each is
exposed as a neutral CSS variable (`--font-display-family`, not `--font-fraunces`) so
swapping a face again touches `layout.tsx` alone.

Display and heading sizes are fluid `clamp()` values, so they scale continuously between
360px and 1920px rather than stepping at breakpoints.

| Token                               | Size                                     | Line height       | Tracking     | Use                                         |
| ----------------------------------- | ---------------------------------------- | ----------------- | ------------ | ------------------------------------------- |
| `text-hero`                         | `clamp(3rem, 1.6rem + 6.4vw, 7rem)`      | 1.0               | −0.02em      | The landing headline, in serif              |
| `text-display-2xl`                  | `clamp(2.75rem, 1.55rem + 5vw, 5.25rem)` | 0.95              | −0.042em     | Sans display, unused since the serif landed |
| `text-display-xl`                   | `clamp(2.25rem, 1.5rem + 3.4vw, 4rem)`   | 1.0               | −0.036em     | 404, major statements                       |
| `text-display-lg`                   | `clamp(1.875rem, 1.35rem + 2.3vw, 3rem)` | 1.06              | −0.03em      | Section headings                            |
| `text-h1` … `text-h6`               | fluid → fixed below h4                   | 1.12 → 1.44       | −0.026em → 0 | Page and block headings                     |
| `text-body-lg` / `body` / `body-sm` | 1.125 / 1 / 0.875rem                     | 1.65 / 1.65 / 1.6 | —            | Lede, body, dense UI                        |
| `text-caption`                      | 0.8125rem                                | 1.5               | +0.004em     | Metadata, helper text                       |
| `text-overline`                     | 0.75rem                                  | 1.2               | +0.14em      | Eyebrow labels (uppercase)                  |

**Size is decoupled from semantics.** Heading elements carry no intrinsic scale — a
visually smaller heading uses a smaller token, never a demoted tag. That is what keeps
one `h1` per page and the outline unbroken.

**The serif is a class, not a default.** `font-display` is applied per element rather
than bound to `h1`–`h3`, so a heading that lands in a card or a table caption stays in
the sans where it belongs.

`text-wrap: balance` on headings, `pretty` on paragraphs.

---

## 4. Spacing, grid, radius, elevation

**Spacing** is Tailwind's 0.25rem base scale, unmodified. Section rhythm is the one
decision that repeats, so it is a utility: `section-y` (4rem → 6rem → 7.5rem) and
`section-y-sm`.

**Grid.** `container-page` — max 80rem, gutters 1.25 → 2 → 2.5rem — is used by every
full-width band, which is what makes the left edge line up from navbar to footer.
`container-prose` caps long-form copy at 44rem.

Breakpoints are named for the device class they serve, matching the viewport matrix the
product is validated against:

| Token | px   | Target                  |
| ----- | ---- | ----------------------- |
| `xs`  | 414  | Large phones            |
| `sm`  | 600  | Foldable / small tablet |
| `md`  | 820  | Tablet portrait         |
| `lg`  | 1024 | Tablet landscape        |
| `xl`  | 1366 | Laptop                  |
| `2xl` | 1440 | Desktop                 |
| `3xl` | 1920 | Wide desktop            |

**Radius.** `xs` 4 · `sm` 6 · `md` 8 · `lg` 10 · `xl` 14 · `2xl` 20 · `3xl` 28px.
Buttons cap at `md` — the brief rejects oversized rounded buttons, and 8px is where a
control still reads as a control.

**Elevation.** Five levels, each a two-part shadow: a tight contact shadow plus a wide
ambient one. `e1` is a hairline lift (buttons); `e3` is the popover/dropdown default;
`e5` is the command palette. In dark mode the same five recompute against a much darker
shadow colour, because a light-mode shadow is invisible on a dark plane.

---

## 5. Motion

| Token               | Curve                            | Use                                                |
| ------------------- | -------------------------------- | -------------------------------------------------- |
| `--ease-standard`   | `cubic-bezier(0.2, 0, 0, 1)`     | Everything by default — decelerating, no overshoot |
| `--ease-emphasized` | `cubic-bezier(0.32, 0.72, 0, 1)` | Sheets and drawers                                 |
| `--ease-exit`       | `cubic-bezier(0.4, 0, 1, 1)`     | Dismissals                                         |

Durations: 150ms for state changes, 200–240ms for overlays, 320–420ms for scroll reveals,
500ms for meter fills.

**Reduced motion is handled once, globally,** in `base.css`: `prefers-reduced-motion:
reduce` collapses every animation and transition to 0.01ms and disables smooth scrolling.
Individual components do not re-implement it. `Reveal` additionally checks
`useReducedMotion()` and renders a plain `div` — no motion component mounts at all.

---

## 6. Focus and interaction

One focus treatment site-wide: a 2px `--ring` outline at 2px offset, keyboard-only via
`:focus-visible`. It is declared once on `:focus-visible` in `base.css`; components that
need a ring on a child element opt in explicitly.

Interactive surfaces:

- Buttons translate 1px on `:active` — the entire press feedback.
- Cards lift 2px and darken their border on hover, and the same treatment applies on
  `focus-within`, so keyboard users get the identical affordance.
- Touch targets are ≥44px in every mobile navigation surface.

---

## 7. Component inventory

Primitives live in `src/components/ui/` and are owned in-repo (shadcn/ui's model —
copy, do not depend). See
[`ARCHITECTURE.md`](ARCHITECTURE.md#component-inventory) for the full table.

---

## 8. Charts

Charts follow a validated method rather than taste. The categorical palette is used in a
**fixed slot order, never cycled**, and was validated against this product's own light
(`#ffffff`) and dark (`#16181d`) surfaces:

| Slot        | Light     | Dark      |
| ----------- | --------- | --------- |
| `--chart-1` | `#2a78d6` | `#3987e5` |
| `--chart-2` | `#eb6834` | `#d95926` |
| `--chart-3` | `#1baf7a` | `#199e70` |

Validator result, all-pairs, both modes: lightness band **PASS**, chroma floor **PASS**,
CVD separation **PASS** (worst ΔE 9.2 light / 9.4 dark, target ≥8), normal-vision floor
**PASS** (worst ΔE 24.0 light / 20.9 dark, floor ≥15). Slot 3 sits below 3:1 against the
light surface, so the relief rule applies — it is only used where direct labels and the
table view are present, which is everywhere in this product.

Mark specs, applied in `trend-chart.tsx`, `bar-chart.tsx` and `stat-tile.tsx`:

- Lines 2px, round cap and join. Area wash at 10% opacity.
- End markers 8px (r=4) with a 2px surface ring so they stay legible where they cross.
- Bars capped at 16px with a 4px rounded data-end, square at the baseline.
- Gridlines hairline, solid, one step off surface — never dashed.
- **Text never wears the series colour.** Values, labels and legends use ink tokens;
  identity comes from the coloured mark beside them.
- Labels are selective — one endpoint value per series, never a number on every point.
- A legend appears for ≥2 series and is omitted for one (the title already names it).

**Every chart ships a table view.** `ChartFrame` wraps each one in a `<details>`
disclosure containing a real `<table>` of the same values — the non-visual channel for
CVD, screen-reader and print users. It costs no layout until opened.

Charts do not animate on data change. A moving bar is harder to read than a still one.

---

## 9. Using the system

```tsx
// Colour, type and radius all come from tokens — never a raw hex or px value.
<Card className="p-5">
  <p className="overline text-accent">Directory</p>
  <h2 className="text-h3">Ten statements</h2>
  <p className="text-body-sm text-muted-foreground">Filtered for feasibility.</p>
</Card>
```

Rules of thumb:

1. If a value repeats across features, it belongs in `tokens.css`.
2. If a pattern repeats but is not a short utility chain, it belongs in `utilities.css`.
3. If it is used once, it stays inline in the component.
4. No inline `style` except where a value is computed at runtime (chart geometry, meter
   fill width) — those are the only three places it appears.
