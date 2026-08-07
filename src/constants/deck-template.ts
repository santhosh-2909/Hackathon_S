import type { DeckMeta, DeckSlide } from '@/types/deck';

/**
 * The seven-slide pitch template.
 *
 * Slide order is the workshop's method in presentation form: name the pain,
 * prove it is real, show the one interaction that matters, demo the slice, then
 * account for the build. It is deliberately seven — a five-minute pitch cannot
 * carry more, and every slide past the seventh is one a judge will not remember.
 *
 * `seconds` sums to `DECK_META.totalSeconds`; keep them in sync when editing.
 */
export const DECK_META: DeckMeta = {
  title: 'Hackathon pitch template',
  subtitle: 'Round 1 · Round 2 · Finals — one deck for every stage',
  totalSeconds: 300,
};

export const DECK_SLIDES: readonly DeckSlide[] = [
  {
    number: 1,
    label: 'Title',
    title: 'One line a judge can repeat',
    purpose: 'Say who you are and what pain you attacked, before anything else.',
    bullets: [
      '[Project name]',
      '[Specific user] can now [do the task] without [the obstacle]',
      'Team [name] · [members] · [problem statement code]',
    ],
    example:
      'LeafCheck — smallholder farmers can diagnose crop disease in the field without a lab. Team Vertical Slice · SIH1401',
    pitfall:
      'A clever product name with no sentence under it. If the judge cannot repeat what you built after this slide, the next six are uphill.',
    seconds: 20,
  },
  {
    number: 2,
    label: 'Problem',
    title: 'The pain, stated as pain',
    purpose: 'Name one persona and one concrete, observable problem — not a solution.',
    bullets: [
      '[Specific user] struggles to [do a task] when [context],',
      'because [obstacle], which leads to [negative consequence]',
      'Scope: solvable in the time box · Framing: describes the pain',
    ],
    example:
      'Night-shift nurses struggle to log patient vitals when moving between rooms, because systems require a desktop — leading to delayed, error-prone records.',
    pitfall:
      'Naming a solution here. "A parking-map app" forecloses the design space before anyone has checked whether a map is the answer.',
    seconds: 45,
  },
  {
    number: 3,
    label: 'Evidence',
    title: 'Proof someone actually feels it',
    purpose: 'Show the problem is observed, not assumed. This is the slide teams skip.',
    bullets: [
      'Asked [n] target users · [n] confirmed the pain',
      'Existing workaround: [what they do today to avoid it]',
      'Quote: "[something a real user said]"',
    ],
    example:
      'Three of three ward nurses described writing vitals on a glove and copying them at the desk an hour later.',
    pitfall:
      'Market-size statistics instead of evidence. A billion-dollar TAM is not proof that your three users have this problem.',
    seconds: 40,
  },
  {
    number: 4,
    label: 'Magic moment',
    title: 'The one interaction that earns the demo',
    purpose: 'Show the single moment where a judge thinks "oh, that is useful".',
    bullets: [
      'The moment: [the one interaction]',
      'Everything else was cut to protect it',
      'Why it lands in under 30 seconds: [reason]',
    ],
    example:
      'Photograph a leaf, get a plain-language diagnosis and treatment in under two seconds — offline.',
    pitfall:
      'A feature list. Five half-features read as one unfinished project; one finished interaction reads as a product.',
    seconds: 40,
  },
  {
    number: 5,
    label: 'Demo',
    title: 'The vertical slice, running',
    purpose: 'One complete path — UI to API to data and back — live, not narrated.',
    bullets: [
      'Path shown: [screen] → [API] → [data] → [result]',
      'Running against [real / seeded] data',
      'Fallback: recorded clip at [timestamp] if the network dies',
    ],
    example: 'Camera → FastAPI → MobileNet classifier → treatment card, on airplane mode.',
    pitfall:
      'Demoing from slides. Also: no fallback recording. The venue Wi-Fi will fail, and a dead demo costs more than a plain one.',
    seconds: 90,
  },
  {
    number: 6,
    label: 'Stack',
    title: 'What you built it with, and why',
    purpose: 'Justify the stack by delivery speed, not by fashion.',
    bullets: [
      'Front-end [x] · Back-end [y] · Data [z] · Deploy [w]',
      'Chosen because the team already knew it',
      'Integrated rather than built: [auth / payments / AI provider]',
    ],
    example:
      'React Native · FastAPI · TensorFlow Lite · Render. Pre-trained model, no training run.',
    pitfall:
      'Claiming you trained a model. Judges ask about the dataset, and a weekend training run does not survive that question.',
    seconds: 35,
  },
  {
    number: 7,
    label: 'Next',
    title: 'What is real, what is not, and the ask',
    purpose: 'Be explicit about the boundary. Honesty here buys credibility everywhere else.',
    bullets: [
      'Working today: [what genuinely runs]',
      'Not yet: [what is mocked or stubbed]',
      'Next 30 days: [one concrete step] · Ask: [what you need]',
    ],
    example:
      'Working: classifier and offline cache. Mocked: the agronomist escalation. Next: field test with 20 farmers.',
    pitfall:
      'Presenting mocked features as shipped. One discovered stub retroactively casts doubt on every other claim in the deck.',
    seconds: 30,
  },
] as const;
