export const DOMAIN_IDS = [
  'healthcare',
  'aiml',
  'cybersecurity',
  'spacetech',
  'edutech',
  'student-innovation',
] as const;

export type DomainId = (typeof DOMAIN_IDS)[number];

export interface Domain {
  id: DomainId;
  label: string;
  /** Short line used under the filter chip and on the domain header. */
  blurb: string;
}

export const DIFFICULTY_IDS = ['approachable', 'medium', 'stretch'] as const;
export type DifficultyId = (typeof DIFFICULTY_IDS)[number];

export type DatasetAvailability = 'provided' | 'public-substitute' | 'self-sourced';

export interface ProblemStatement {
  slug: string;
  /** Official portal code, e.g. `SIH1343`. `null` where the code is unconfirmed. */
  code: string | null;
  year: number;
  title: string;
  /** One sentence, phrased as pain — never as a solution. */
  summary: string;
  domain: DomainId;
  organization: string;
  theme: string;
  category: 'Software' | 'Hardware';
  difficulty: DifficultyId;
  dataset: DatasetAvailability;
  datasetNote: string;
  background: string;
  statement: string;
  expectedSolution: string;
  whyItFits: string;
  /** Stack hints a first-time team can realistically execute in the time box. */
  stack: string[];
  image: string;
  /** Rough hours a vertical slice takes, used for the effort meter. */
  sliceHours: number;

  /* --- Student-innovation entries only -----------------------------------
     Every field below is optional so the ten official statements need no edit
     to coexist with them. Absent `origin` means "official SIH statement"; the
     UI keys the "not an official problem statement" marking off this field, so
     an entry can never be a student idea without saying so. */

  origin?: 'student-innovation';
  /** What the build actually does, as a feature list. */
  keyFeatures?: string[];
  /** The outcome, stated so it could be measured. */
  expectedImpact?: string;
  /** What is genuinely new here, and how far it could be taken. */
  innovationScope?: string;
  /** Concrete artefacts a team would hand over. */
  deliverables?: string[];
}
