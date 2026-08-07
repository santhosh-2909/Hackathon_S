import type { Metadata } from 'next';
import { ProjectJourney } from '@/features/marketing/project-journey';

export const metadata: Metadata = {
  title: 'Project Journey',
  description:
    'Track every milestone from problem statement release to the Grand Finale with a clear visual roadmap designed for teams.',
};

export default function ProjectJourneyPage() {
  return <ProjectJourney />;
}
