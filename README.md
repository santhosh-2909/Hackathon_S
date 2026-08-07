# Hackathon_2026 — Innovation Challenge

A Next.js App Router experience for the Hackathon_2026 innovation challenge. Two surfaces in one
application:

- **Marketing** — the method for choosing a hackathon problem statement, a researched
  directory of ten real SIH statements, the 72-slide technical workshop deck, and a
  seven-slide pitch template that downloads as a genuine `.pptx`.
- **Workspace** — an authenticated shell where a team tracks statements, logs validation
  interviews, manages members and files submissions.

The previous frontend (a static `build/index.html` + `style.css`, and an exported
design-system kit under `system/`) was deleted outright. Nothing was ported. See
[`docs/MIGRATION.md`](docs/MIGRATION.md) for the removal inventory.

---

## Quick start

```bash
npm install     # legacy peer resolution is pinned in .npmrc — see Notes
npm run dev     # http://localhost:3000
```

| Script              | Purpose                                                            |
| ------------------- | ------------------------------------------------------------------ |
| `npm run dev`       | Dev server (Turbopack)                                             |
| `npm run build`     | Production build                                                   |
| `npm start`         | Serve the production build                                         |
| `npm run typecheck` | `tsc --noEmit`, strict mode                                        |
| `npm run lint`      | ESLint 9 flat config + Next core-web-vitals + React Compiler rules |
| `npm run format`    | Prettier, with Tailwind class sorting                              |

---

## Stack

| Layer           | Choice                                                       | Version         |
| --------------- | ------------------------------------------------------------ | --------------- |
| Framework       | Next.js (App Router, Turbopack)                              | 16.3.0          |
| UI runtime      | React                                                        | 19.2.8          |
| Language        | TypeScript, strict + `noUncheckedIndexedAccess`              | 5.9.3           |
| Styling         | Tailwind CSS (CSS-first `@theme`)                            | 4.3.3           |
| Type            | Fraunces (display) · Plus Jakarta Sans (UI) · JetBrains Mono | via `next/font` |
| Primitives      | Radix UI, composed shadcn/ui-style                           | 1.x / 2.x       |
| Motion          | Framer Motion                                                | 12.43.0         |
| Icons           | Lucide React                                                 | 1.28.0          |
| Forms           | React Hook Form + Zod                                        | 7.84 / 4.4      |
| Server state    | TanStack Query                                               | 5.101.4         |
| Client state    | Zustand                                                      | 5.0.14          |
| Theming         | next-themes                                                  | 0.4.6           |
| Command palette | cmdk                                                         | 1.1.1           |
| Toasts          | Sonner                                                       | 2.0.7           |

Full rationale per dependency: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md#dependency-list).

---

## Documentation

| Document                                         | Contents                                                                                     |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| [`docs/DESIGN-SYSTEM.md`](docs/DESIGN-SYSTEM.md) | Tokens, type scale, spacing, radius, elevation, motion, colour, dark mode, charts            |
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)   | Folder structure, routing architecture, component inventory, page inventory, dependency list |
| [`docs/ACCESSIBILITY.md`](docs/ACCESSIBILITY.md) | Accessibility report — what was implemented, what was verified, what is open                 |
| [`docs/PERFORMANCE.md`](docs/PERFORMANCE.md)     | Rendering strategy, bundle discipline, measured build output                                 |
| [`docs/MIGRATION.md`](docs/MIGRATION.md)         | Removed files, migration notes, future scalability recommendations                           |
| [`docs/content-sources/`](docs/content-sources/) | The research markdown the directory copy is derived from                                     |

---

## Verification status

Everything below was run against this tree, not assumed:

```
npm run typecheck   → clean
npm run lint        → clean (0 errors, 0 warnings)
npm run build       → 32 routes generated, 0 errors
deck template       → /deck/download serves a valid 7-slide .pptx (zip verified,
                      7 slide parts + 7 notes parts, correct OOXML MIME type)
dev server smoke    → 19 routes 200, unknown path 404, 0 runtime errors logged
contrast matrix     → 28 pairs, all pass in both themes
```

`/problems` filtering, search, sort and pagination were exercised over HTTP:
`?domain=spacetech` returns its 2 statements, `?q=phishing` returns 1, page 1 returns
6 and page 2 returns 4 of the 10 total.

---

## Notes

- **`.npmrc` pins `legacy-peer-deps=true`.** With React 19, the Radix set and
  `eslint-config-next@16` in one tree, npm's strict resolver backtracked for over ten
  minutes of CPU without converging. Legacy resolution produces the same tree in
  seconds. Revisit when the peer ranges settle.
- **`AGENTS.md` and `CLAUDE.md` at the repo root are generated by Next.js 16**, not
  hand-written. Set `agentRules: false` in `next.config.ts` to stop that.
- **Auth is a shell, and sign-in has been removed.** Only `/sign-up` remains; it validates
  properly and exercises pending and success states, but no identity provider is wired up.
  `/sign-in` and `/reset-password` were deleted on request and now 404. Workspace data
  comes from fixtures in `src/services/workspace.ts`.
- **`public/decks/hackathon-technical-workshop-v2.pptx`** is the supplied workshop deck,
  served byte-for-byte as a static asset. `/workshop` presents its outline, which was
  extracted from the file rather than written by hand.
- **Directory content is study material.** Expected-solution text is informed guidance
  reconstructed from each statement's official title, theme and organisation — not
  verbatim portal text. PS numbers must be verified on the live portal before a team
  commits to one; the UI says so on every detail page.
