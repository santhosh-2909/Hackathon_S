# Problem Statement Showcase

## 1. The Problem

Most losing projects fail before any code is written — they solve a problem nobody has, or one too big to finish in the time box. The problem you choose is the highest-leverage decision of the whole build.

**A problem statement describes pain — not a solution.**
> "People waste time finding parking" is a problem. "A parking-map app" is already a solution.

**The template:**
> "[Specific user] struggles to [do a task] when [context], because [obstacle], which leads to [negative consequence]."

- ✅ **Strong** — "Night-shift nurses struggle to log patient vitals when moving between rooms, because systems require a desktop — leading to delayed, error-prone records."
- ❌ **Weak** — "Hospitals need better software." *(No user, no concrete pain, unbuildable in a weekend.)*

**Five checks before you build:**
| Check | Good | Poor |
|---|---|---|
| User | One specific persona | "Everyone" / undefined |
| Pain | Concrete, observable | Vague, abstract |
| Scope | Solvable in the time box | Needs months / institutions |
| Evidence | A real observation | Assumed / imagined |
| Framing | Describes the pain | Names a solution too early |

**Proof it's real:** ask 3 target users — zero yeses means pick a new problem. Existing workarounds (people already paying time or money to avoid the pain) are proof it's worth solving.

---

## 2. Our Approach

- **MVP:** the smallest version that delivers the core value and can be demoed — in a hackathon, the MVP *is* the submission.
- **Magic moment:** the one "oh, that's useful" interaction — everything else is cut.
- **Vertical slice:** one complete path (UI → API → DB → screen) built end-to-end before adding breadth. A working slice is a working demo.
- **De-risk first:** spike the riskiest unknown in 15–30 minutes before committing the team — a failed spike costs 30 minutes, not 20 hours.
- **Feature freeze at ~80% of time** — after that, only fix, deploy, document, and rehearse the demo.

---

## 3. Tech Stack

A stack = **front-end · back-end · database · auth · hosting · APIs/AI**. Choose what the team builds fastest tonight — familiarity beats "better-but-unknown."

**Defaults by team skill:**
| Team knows… | Front-end | Back-end | Data + Deploy |
|---|---|---|---|
| JavaScript | React / Next.js | Next.js API / Express | Supabase → Vercel |
| Python | HTML+JS or React | FastAPI / Flask | SQLite/Supabase → Render |
| Little coding | No-code + HTML | Firebase (BaaS) | Firebase end-to-end |

- **AI:** call pre-trained APIs (LLM / vision / speech) — never train a model.
- **Auth & payments:** integrate a provider (Firebase, Supabase, Auth0, Stripe) — don't build it.
- **By judging emphasis:** AI novelty → budget the AI integration; UX → invest in front-end with BaaS behind it; technical depth → showcase one hard component, keep the rest minimal.
