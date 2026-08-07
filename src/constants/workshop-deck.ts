/**
 * Outline of the technical-track workshop deck.
 *
 * Every title here was extracted from the .pptx itself rather than written by
 * hand, so the outline cannot drift from the file it describes. If the deck is
 * replaced, re-extract rather than editing this by eye.
 *
 * The file is served straight from `public/decks/` — it is a fixed asset, so
 * routing it through a handler would buy nothing.
 */
export const WORKSHOP_DECK = {
  title: 'The Technical Hackathon Playbook',
  eyebrow: 'Mentor workshop · Technical track',
  closingLine: 'Ship small. Ship working.',
  slideCount: 72,
  moduleCount: 18,
  partCount: 5,
  fileHref: '/decks/hackathon-technical-workshop-v2.pptx',
  fileName: 'hackathon-technical-workshop-v2.pptx',
  fileSizeMb: 2.7,
  finalFileHref: '/decks/Final_pres.pptx',
  finalFileName: 'Final_pres.pptx',
} as const;

export interface WorkshopModule {
  /** `00`–`17`, as numbered in the deck. */
  code: string;
  title: string;
  /** Inclusive slide range in the source file. */
  slides: [number, number];
  topics: string[];
}

export interface WorkshopPart {
  number: number;
  title: string;
  modules: WorkshopModule[];
}

export const WORKSHOP_PARTS: readonly WorkshopPart[] = [
  {
    number: 1,
    title: 'Foundations and the problem',
    modules: [
      {
        code: '00',
        title: 'Foundations',
        slides: [4, 8],
        topics: [
          'What a hackathon is — and why',
          'Hackathon vs traditional dev',
          'Categories of hackathons',
          'Lifecycle of a hackathon project',
          'What you walk away with',
        ],
      },
      {
        code: '01',
        title: 'Problem statements & idea validation',
        slides: [9, 13],
        topics: [
          'Most losing projects fail before any code is written',
          'Anatomy of a strong problem statement',
          'Good vs poor problem statements',
          'Find real pain — then prove it',
          'Lightweight competitor research',
        ],
      },
    ],
  },
  {
    number: 2,
    title: 'From idea to a scoped build',
    modules: [
      {
        code: '02',
        title: 'Ideation',
        slides: [15, 18],
        topics: [
          'Diverge, then converge',
          'AI-assisted ideation',
          'De-risk first: the spike',
          'Worked example: shared-expense app',
        ],
      },
      {
        code: '03',
        title: 'MVP & scoping',
        slides: [19, 21],
        topics: [
          'The MVP and the magic moment',
          'Scope: slice vertically',
          'Execution plan: 24h / 36h / 48h',
        ],
      },
      {
        code: '04',
        title: 'Tech stack selection',
        slides: [22, 26],
        topics: [
          'Front-end & back-end choices',
          'Mobile & databases',
          'Auth · hosting · APIs & SDKs',
          'Decision matrix: your stack in 60s',
        ],
      },
      {
        code: '05',
        title: 'Software engineering workflow',
        slides: [27, 31],
        topics: [
          'Requirements, stories & “done”',
          'Wireframes & UX principles',
          'Data model & API contract',
          'Architecture & structure',
        ],
      },
    ],
  },
  {
    number: 3,
    title: 'Whiteboarding and prompting',
    modules: [
      {
        code: '06',
        title: 'AI whiteboarding tools',
        slides: [33, 35],
        topics: ['Why AI whiteboards matter', 'The tool landscape', 'Pick the tool for the job'],
      },
      {
        code: '07',
        title: 'Prompt engineering for whiteboards',
        slides: [36, 39],
        topics: [
          'The 5-part diagram prompt',
          'Same task, rising precision',
          'Reusable prompt templates',
          'Iterate, optimise, debug the output',
        ],
      },
    ],
  },
  {
    number: 4,
    title: 'Building, integrating and shipping',
    modules: [
      {
        code: '08',
        title: 'The prototype build',
        slides: [41, 44],
        topics: [
          'Validated idea → working software',
          'Slice first, then integrations',
          'Test as you build · ship & tag',
          'Worked example: build order',
        ],
      },
      {
        code: '09',
        title: 'Git & GitHub',
        slides: [45, 46],
        topics: ['Version control in one picture', 'PRs, boards & merge conflicts'],
      },
      {
        code: '10',
        title: 'APIs, SDKs & integrations',
        slides: [47, 49],
        topics: ['API auth, rate limits & cost', 'Integration cheat-sheet', 'The AI API families'],
      },
      {
        code: '11',
        title: 'AI integration',
        slides: [50, 55],
        topics: [
          'Pre-trained model = trained by a provider, used via API',
          'The LLM API landscape',
          'Prompt it well — then guard it',
          'RAG: answer from your data',
          'AI capabilities on tap',
          'Reference AI architectures',
        ],
      },
      {
        code: '12',
        title: 'Testing',
        slides: [56, 58],
        topics: ['Test the critical path', 'The debugging loop', 'See inside · fail gracefully'],
      },
      {
        code: '13',
        title: 'Security & privacy',
        slides: [59, 61],
        topics: [
          'Security basics judges notice',
          'Tokens, passwords & encryption',
          'Attack → defense',
        ],
      },
      {
        code: '14',
        title: 'Deployment',
        slides: [62, 64],
        topics: [
          '“Works on my machine” convinces nobody',
          'Platform cheat-sheet',
          'Deploy strategy by project type',
        ],
      },
    ],
  },
  {
    number: 5,
    title: 'Judging and lessons',
    modules: [
      {
        code: '15',
        title: 'Technical judging',
        slides: [66, 67],
        topics: ['The rubric is the scoring sheet', 'Judging dimensions — how to win'],
      },
      {
        code: '16',
        title: 'Best practices & patterns',
        slides: [68, 69],
        topics: ['Beginner-safe design patterns', 'The README that earns points'],
      },
      {
        code: '17',
        title: 'Mistakes & lessons',
        slides: [70, 71],
        topics: ['Mistake → fix', 'What winning teams do'],
      },
    ],
  },
] as const;
