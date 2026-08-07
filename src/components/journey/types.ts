export type MilestoneStatus = 'Completed' | 'Upcoming' | 'Locked' | 'Live' | 'Rejected';

export interface EvaluationItem {
  name: string;
  weight: string;
}

export interface Milestone {
  id: string;
  stageName: string;
  title: string;
  date: string;
  description: string;
  status: MilestoneStatus;
  remainingDays: number | null;
  iconName: string;
  deliverables: string[];
  evaluationCriteria: EvaluationItem[];
  mentorNotes: string;
  tips: string;
}

export interface TimelineProgressResult {
  completedCount: number;
  totalCount: number;
  progressPercentage: number;
  activeMilestone: Milestone | null;
  nextMilestone: Milestone | null;
}
