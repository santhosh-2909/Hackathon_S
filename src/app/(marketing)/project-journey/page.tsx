import type { Metadata } from 'next';
import { ProjectJourney } from '@/features/marketing/project-journey';

export const metadata: Metadata = {
  title: 'Timeline',
  description:
    'A clear Hackathon_2026 timeline from challenge selection to the Grand Finale.',
};

export default function ProjectJourneyPage() {
  return <ProjectJourney />;
}
