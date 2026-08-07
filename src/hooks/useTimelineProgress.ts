'use client';

import { useMemo } from 'react';
import type { Milestone, TimelineProgressResult } from '@/components/journey/types';

export const INITIAL_MILESTONES: Milestone[] = [
  {
    id: 'm1',
    stageName: 'RELEASE',
    title: 'Problem Statements Released',
    date: '05 August 2026',
    description:
      'Browse all available challenges, discuss ideas with your team and choose the problem statement you want to solve.',
    status: 'Completed',
    remainingDays: null,
    iconName: 'FileText',
    deliverables: [
      'Team Registration & Member Roles Locked',
      'Selected Problem Statement ID Confirmation',
      'Initial Problem Scope & Domain Research Document',
      'Target User Needs & Impact Hypothesis',
    ],
    evaluationCriteria: [
      { name: 'Problem Scope & Domain Alignment', weight: '35%' },
      { name: 'Team Skill & Capacity Match', weight: '35%' },
      { name: 'Initial Feasibility Score', weight: '30%' },
    ],
    mentorNotes:
      'Make sure all team members are aligned on the choice before locking it in. Choose a problem your team is genuinely passionate about solving.',
    tips: 'Review all available problem statements thoroughly before deciding. Compare technical requirements against team strengths.',
  },
  {
    id: 'm2',
    stageName: 'ROUND 1',
    title: 'Solution Presentation',
    date: '17 August 2026',
    description:
      'Present your proposed solution, architecture and implementation strategy to the internal jury.',
    status: 'Upcoming',
    remainingDays: 10,
    iconName: 'Lightbulb',
    deliverables: [
      'Architecture & System Component Diagram',
      'High-Level Solution Pitch Deck (Max 10 slides)',
      'Tech Stack & API Integration Breakdown',
      'Core User Workflow Wireframes & Prototype',
    ],
    evaluationCriteria: [
      { name: 'Technical Feasibility & Architecture', weight: '35%' },
      { name: 'Innovation & Core Differentiator', weight: '35%' },
      { name: 'Clarity of Approach & UX Design', weight: '30%' },
    ],
    mentorNotes:
      'Focus heavily on the core differentiator. Don\'t try to build everything at once — win the jury with an unshakeable core design.',
    tips: 'Practice your 5-minute elevator pitch with a non-technical audience to ensure maximum communication clarity.',
  },
  {
    id: 'm3',
    stageName: 'ROUND 2',
    title: 'Top 7 Shortlisting',
    date: '20 August 2026',
    description:
      'The jury evaluates all projects and selects the seven strongest teams based on innovation, feasibility and execution.',
    status: 'Upcoming',
    remainingDays: 13,
    iconName: 'Trophy',
    deliverables: [
      'Working MVP / Interactive Web Prototype',
      'Clean GitHub Repository with Setup README',
      'Live Staging Deployment URL',
      '3-Minute Async Video Demo Walkthrough',
    ],
    evaluationCriteria: [
      { name: 'Working Prototype Completeness', weight: '40%' },
      { name: 'Code Quality & System Resilience', weight: '30%' },
      { name: 'Real-world Utility & Edge Case Handling', weight: '30%' },
    ],
    mentorNotes:
      'Ensure your primary happy path is 100% bug-free for the live demonstration. A polished core beats 10 broken features.',
    tips: 'Record a backup video demo in case of live network latency or third-party API hiccups during judging.',
  },
  {
    id: 'm4',
    stageName: 'GRAND FINALE',
    title: 'Final Presentation',
    date: '24 August 2026',
    description:
      'Pitch your complete working prototype before external jury members and compete for the championship.',
    status: 'Locked',
    remainingDays: 17,
    iconName: 'Crown',
    deliverables: [
      'Polished Executive Presentation Deck',
      'Live Production App & Scalability Showcase',
      'Future Roadmap & Business Viability Plan',
      'Live Q&A Technical Defense Appendix',
    ],
    evaluationCriteria: [
      { name: 'Production Readiness & Polish', weight: '35%' },
      { name: 'Market Viability & Scalability', weight: '35%' },
      { name: 'Presentation Mastery & Q&A Defense', weight: '30%' },
    ],
    mentorNotes:
      'Confidently explain your design choices and technical trade-offs when questioned by industry experts.',
    tips: 'Anticipate tough questions from industry experts on security, scale, data privacy, and maintenance costs.',
  },
];

export function useTimelineProgress(milestones: Milestone[] = INITIAL_MILESTONES): TimelineProgressResult {
  return useMemo(() => {
    const totalCount = milestones.length;
    const completedCount = milestones.filter(
      (m) => m.status === 'Completed'
    ).length;

    const progressPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    const liveMilestone = milestones.find((m) => m.status === 'Live');
    const upcomingMilestones = milestones.filter((m) => m.status === 'Upcoming');

    const activeMilestone = liveMilestone || upcomingMilestones[0] || milestones[0] || null;
    const nextMilestone = upcomingMilestones[0] || null;

    return {
      completedCount,
      totalCount,
      progressPercentage,
      activeMilestone,
      nextMilestone,
    };
  }, [milestones]);
}
