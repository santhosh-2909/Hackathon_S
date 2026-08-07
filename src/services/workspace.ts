import 'server-only';

import type {
  ActivityEvent,
  CurrentUser,
  MetricPoint,
  Submission,
  TeamMember,
  TrackedProblem,
} from '@/types/workspace';

/**
 * Fixture-backed workspace data.
 *
 * Everything here is deterministic and hand-written — no random generation — so
 * screenshots, tests and SSR output stay stable. Replace the bodies with real
 * queries when the API lands; the exported signatures are the contract the app
 * routes are written against.
 */

const USER: CurrentUser = {
  name: 'Aarthi Raman',
  email: 'aarthi@kira.dev',
  handle: 'aarthi',
  role: 'owner',
  team: 'Team Vertical Slice',
  avatarUrl: null,
  timezone: 'Asia/Kolkata',
};

const TRACKED: TrackedProblem[] = [
  {
    id: 'trk_01',
    problemSlug: 'lookalike-phishing-domain-detection',
    title: 'AI/ML detection of look-alike phishing domains',
    code: 'SIH1454',
    domain: 'cybersecurity',
    status: 'building',
    checksPassed: 5,
    owner: 'Aarthi Raman',
    updatedAt: '2026-08-03T09:20:00.000Z',
    validationInterviews: 6,
  },
  {
    id: 'trk_02',
    problemSlug: 'student-mental-health-support',
    title: 'Digital mental health and psychological support for students',
    code: 'SIH25092',
    domain: 'healthcare',
    status: 'validating',
    checksPassed: 4,
    owner: 'Nikhil Verma',
    updatedAt: '2026-08-02T16:05:00.000Z',
    validationInterviews: 3,
  },
  {
    id: 'trk_03',
    problemSlug: 'e-consultation-sentiment-analysis',
    title: 'Sentiment analysis of e-consultation comments',
    code: 'SIH25035',
    domain: 'aiml',
    status: 'validating',
    checksPassed: 3,
    owner: 'Sana Qureshi',
    updatedAt: '2026-08-01T11:40:00.000Z',
    validationInterviews: 3,
  },
  {
    id: 'trk_04',
    problemSlug: 'flood-inundation-probability-mapping',
    title: 'Flood inundation probability mapping',
    code: 'SS597',
    domain: 'spacetech',
    status: 'exploring',
    checksPassed: 2,
    owner: 'Aarthi Raman',
    updatedAt: '2026-07-30T08:15:00.000Z',
    validationInterviews: 1,
  },
  {
    id: 'trk_05',
    problemSlug: 'student-dropout-analysis',
    title: 'Student dropout analysis for school education',
    code: 'SIH1362',
    domain: 'edutech',
    status: 'exploring',
    checksPassed: 2,
    owner: 'Devika Iyer',
    updatedAt: '2026-07-29T14:50:00.000Z',
    validationInterviews: 0,
  },
  {
    id: 'trk_06',
    problemSlug: 'crop-disease-identification',
    title: 'App-based crop and plant disease identification',
    code: 'SIH1401',
    domain: 'aiml',
    status: 'shipped',
    checksPassed: 5,
    owner: 'Nikhil Verma',
    updatedAt: '2026-07-21T19:00:00.000Z',
    validationInterviews: 8,
  },
  {
    id: 'trk_07',
    problemSlug: 'server-side-spoofed-email-detection',
    title: 'Server-side spoofed-email detection',
    code: 'LC1076',
    domain: 'cybersecurity',
    status: 'dropped',
    checksPassed: 1,
    owner: 'Sana Qureshi',
    updatedAt: '2026-07-18T10:10:00.000Z',
    validationInterviews: 3,
  },
  {
    id: 'trk_08',
    problemSlug: 'identify-slow-learners',
    title: 'Identify slow learners for remedial teaching',
    code: 'RK979',
    domain: 'edutech',
    status: 'exploring',
    checksPassed: 1,
    owner: 'Devika Iyer',
    updatedAt: '2026-07-16T07:25:00.000Z',
    validationInterviews: 0,
  },
];

const MEMBERS: TeamMember[] = [
  {
    id: 'usr_01',
    name: 'Aarthi Raman',
    email: 'aarthi@kira.dev',
    role: 'owner',
    status: 'active',
    focus: 'Full-stack · demo owner',
    joinedAt: '2026-06-02T00:00:00.000Z',
  },
  {
    id: 'usr_02',
    name: 'Nikhil Verma',
    email: 'nikhil@kira.dev',
    role: 'maintainer',
    status: 'active',
    focus: 'ML pipeline',
    joinedAt: '2026-06-02T00:00:00.000Z',
  },
  {
    id: 'usr_03',
    name: 'Sana Qureshi',
    email: 'sana@kira.dev',
    role: 'member',
    status: 'active',
    focus: 'Research · user interviews',
    joinedAt: '2026-06-09T00:00:00.000Z',
  },
  {
    id: 'usr_04',
    name: 'Devika Iyer',
    email: 'devika@kira.dev',
    role: 'member',
    status: 'active',
    focus: 'Front-end',
    joinedAt: '2026-06-14T00:00:00.000Z',
  },
  {
    id: 'usr_05',
    name: 'Raghav Menon',
    email: 'raghav@iiit.ac.in',
    role: 'mentor',
    status: 'active',
    focus: 'Judge-side feedback',
    joinedAt: '2026-07-01T00:00:00.000Z',
  },
  {
    id: 'usr_06',
    name: 'Priya Nair',
    email: 'priya@kira.dev',
    role: 'member',
    status: 'invited',
    focus: 'Pending — invited 2 days ago',
    joinedAt: '2026-08-02T00:00:00.000Z',
  },
];

const SUBMISSIONS: Submission[] = [
  {
    id: 'sub_01',
    title: 'Homoglyph Watch — look-alike domain scanner',
    problemSlug: 'lookalike-phishing-domain-detection',
    stage: 'in-review',
    submittedAt: '2026-08-01T18:00:00.000Z',
    repoUrl: 'https://github.com/kira-teams/homoglyph-watch',
    demoUrl: 'https://homoglyph-watch.demo.dev',
    reviewer: 'Raghav Menon',
  },
  {
    id: 'sub_02',
    title: 'LeafCheck — offline crop disease triage',
    problemSlug: 'crop-disease-identification',
    stage: 'accepted',
    submittedAt: '2026-07-21T19:00:00.000Z',
    repoUrl: 'https://github.com/kira-teams/leafcheck',
    demoUrl: 'https://leafcheck.demo.dev',
    reviewer: 'Raghav Menon',
  },
  {
    id: 'sub_03',
    title: 'Quiet Hours — student support triage',
    problemSlug: 'student-mental-health-support',
    stage: 'draft',
    submittedAt: null,
    repoUrl: null,
    demoUrl: null,
    reviewer: null,
  },
];

const ACTIVITY: ActivityEvent[] = [
  {
    id: 'act_01',
    actor: 'Sana Qureshi',
    action: 'logged interview 3 of 3 for',
    target: 'Sentiment analysis of e-consultation comments',
    at: '2026-08-03T10:12:00.000Z',
    kind: 'validation',
  },
  {
    id: 'act_02',
    actor: 'Aarthi Raman',
    action: 'moved to Building',
    target: 'AI/ML detection of look-alike phishing domains',
    at: '2026-08-03T09:20:00.000Z',
    kind: 'track',
  },
  {
    id: 'act_03',
    actor: 'Raghav Menon',
    action: 'left review notes on',
    target: 'Homoglyph Watch',
    at: '2026-08-02T21:04:00.000Z',
    kind: 'submission',
  },
  {
    id: 'act_04',
    actor: 'Aarthi Raman',
    action: 'invited',
    target: 'priya@kira.dev',
    at: '2026-08-02T12:30:00.000Z',
    kind: 'team',
  },
  {
    id: 'act_05',
    actor: 'Nikhil Verma',
    action: 'cleared the Scope check on',
    target: 'Digital mental health and psychological support',
    at: '2026-08-02T08:45:00.000Z',
    kind: 'validation',
  },
  {
    id: 'act_06',
    actor: 'Devika Iyer',
    action: 'started tracking',
    target: 'Student dropout analysis for school education',
    at: '2026-07-29T14:50:00.000Z',
    kind: 'track',
  },
];

/** Eight weeks of validation activity — two series, both counts. */
const METRICS: MetricPoint[] = [
  { label: 'W26', interviews: 2, spikes: 1 },
  { label: 'W27', interviews: 5, spikes: 2 },
  { label: 'W28', interviews: 4, spikes: 4 },
  { label: 'W29', interviews: 9, spikes: 3 },
  { label: 'W30', interviews: 7, spikes: 6 },
  { label: 'W31', interviews: 12, spikes: 5 },
  { label: 'W32', interviews: 10, spikes: 9 },
  { label: 'W33', interviews: 15, spikes: 8 },
];

export async function getCurrentUser(): Promise<CurrentUser> {
  return USER;
}

export async function getTrackedProblems(): Promise<TrackedProblem[]> {
  return TRACKED;
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  return MEMBERS;
}

export async function getSubmissions(): Promise<Submission[]> {
  return SUBMISSIONS;
}

export async function getActivity(limit = 6): Promise<ActivityEvent[]> {
  return ACTIVITY.slice(0, limit);
}

export async function getValidationMetrics(): Promise<MetricPoint[]> {
  return METRICS;
}

export interface DashboardSummary {
  tracked: number;
  validating: number;
  building: number;
  interviewsLogged: number;
  /** Share of tracked problems that have cleared all five checks, 0–1. */
  readyRatio: number;
}

export async function getDashboardSummary(): Promise<DashboardSummary> {
  const tracked = TRACKED.filter((t) => t.status !== 'dropped');
  const ready = tracked.filter((t) => t.checksPassed === 5).length;
  return {
    tracked: tracked.length,
    validating: TRACKED.filter((t) => t.status === 'validating').length,
    building: TRACKED.filter((t) => t.status === 'building').length,
    interviewsLogged: TRACKED.reduce((sum, t) => sum + t.validationInterviews, 0),
    readyRatio: tracked.length === 0 ? 0 : ready / tracked.length,
  };
}
