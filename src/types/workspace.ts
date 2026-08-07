import type { DomainId } from './problem';

export type TrackStatus = 'exploring' | 'validating' | 'building' | 'shipped' | 'dropped';

export interface TrackedProblem {
  id: string;
  problemSlug: string;
  title: string;
  code: string | null;
  domain: DomainId;
  status: TrackStatus;
  /** 0–5 — how many of the five pre-build checks the team has cleared. */
  checksPassed: number;
  owner: string;
  updatedAt: string;
  validationInterviews: number;
}

export type MemberRole = 'owner' | 'maintainer' | 'member' | 'mentor';
export type MemberStatus = 'active' | 'invited';

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: MemberRole;
  status: MemberStatus;
  focus: string;
  joinedAt: string;
}

export type SubmissionStage = 'draft' | 'in-review' | 'accepted' | 'rejected';

export interface Submission {
  id: string;
  title: string;
  problemSlug: string;
  stage: SubmissionStage;
  submittedAt: string | null;
  repoUrl: string | null;
  demoUrl: string | null;
  reviewer: string | null;
}

export interface ActivityEvent {
  id: string;
  actor: string;
  action: string;
  target: string;
  at: string;
  kind: 'validation' | 'track' | 'team' | 'submission';
}

export interface MetricPoint {
  /** ISO week label, e.g. `W32`. */
  label: string;
  interviews: number;
  spikes: number;
}

export interface CurrentUser {
  name: string;
  email: string;
  handle: string;
  role: MemberRole;
  team: string;
  avatarUrl: string | null;
  timezone: string;
}
