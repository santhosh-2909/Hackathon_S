import type { DifficultyId, Domain, DomainId, DatasetAvailability } from '@/types/problem';

export const DOMAINS: readonly Domain[] = [
  {
    id: 'healthcare',
    label: 'Healthcare',
    blurb:
      'MedTech, BioTech and HealthTech statements filed under the AYUSH and state health briefs.',
  },
  {
    id: 'aiml',
    label: 'AI / ML',
    blurb:
      'Not an official SIH theme — statements whose technical core is a model, wherever they were filed.',
  },
  {
    id: 'cybersecurity',
    label: 'Cybersecurity',
    blurb: 'Blockchain & Cybersecurity theme. Protocol-level work, not red-team work.',
  },
  {
    id: 'spacetech',
    label: 'Spacetech',
    blurb:
      'The ISRO / Department of Space set. Geospatial and atmospheric data, openly documented.',
  },
  {
    id: 'edutech',
    label: 'Edutech',
    blurb:
      'Smart Education theme. Tabular analytics with a dashboard, grounded in public statistics.',
  },
  {
    id: 'student-innovation',
    label: 'Student Innovation',
    blurb:
      'Original student-generated ideas — not official SIH statements, and carrying no portal code.',
  },
] as const;

export const DOMAIN_BY_ID = Object.fromEntries(DOMAINS.map((d) => [d.id, d])) as Record<
  DomainId,
  Domain
>;

export const DIFFICULTY_LABELS: Record<DifficultyId, string> = {
  approachable: 'Approachable',
  medium: 'Medium',
  stretch: 'Stretch',
};

export const DATASET_LABELS: Record<DatasetAvailability, string> = {
  provided: 'Dataset provided',
  'public-substitute': 'Public substitute',
  'self-sourced': 'Self-sourced',
};
