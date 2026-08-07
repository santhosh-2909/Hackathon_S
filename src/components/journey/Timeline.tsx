'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flame,
  ArrowRight,
  RefreshCw,
  Search,
  BookOpen,
  PenTool,
  Code2,
  Presentation,
  Crown,
  Calendar,
  Users,
  Target,
  Trophy,
  Lightbulb,
} from 'lucide-react';
import { useTimelineProgress } from '@/hooks/useTimelineProgress';
import { AnimatedProgress } from '@/components/journey/AnimatedProgress';
import { TimelineNode } from '@/components/journey/TimelineNode';
import { TimelineCard } from '@/components/journey/TimelineCard';
import { Button } from '@/components/ui/button';
import type { Milestone } from '@/components/journey/types';

const MENTOR_TIPS = [
  'Focus on solving one real problem extremely well instead of solving many partially.',
  'Validate your core user workflow with target users before committing to complex backend architecture.',
  'Keep your presentation crisp: 1 key message per slide with live, working app demonstrations.',
  'Maintain clean code structure and a clear README so judges can clone and verify your build effortlessly.',
  'Practice your pitch under realistic timer constraints to deliver a confident Q&A defense.',
];

const PROCESS_STEPS = [
  { step: '01', title: 'Discover', icon: Search, desc: 'Problem Selection' },
  { step: '02', title: 'Research', icon: BookOpen, desc: 'User & Market Validation' },
  { step: '03', title: 'Design', icon: PenTool, desc: 'Architecture & UX Specs' },
  { step: '04', title: 'Prototype', icon: Code2, desc: 'MVP Build & Integration' },
  { step: '05', title: 'Present', icon: Presentation, desc: 'Jury Pitch & Defense' },
  { step: '06', title: 'Win', icon: Crown, desc: 'Championship Honors' },
];

export function Timeline() {
  const { progressPercentage } = useTimelineProgress();

  const [selectedMilestone, setSelectedMilestone] = React.useState<Milestone | null>(null);
  const [activeTipIndex, setActiveTipIndex] = React.useState<number>(0);

  // Remaining countdown calculation for Round 1 Evaluation
  const [timeLeft, setTimeLeft] = React.useState({
    days: 10,
    hours: 18,
    minutes: 32,
    seconds: 45,
  });

  React.useEffect(() => {
    const targetDate = new Date('2026-08-17T23:59:59').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleNextTip = () => {
    setActiveTipIndex((prev) => (prev + 1) % MENTOR_TIPS.length);
  };

  const milestones = INITIAL_MILESTONES;

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      {/* DESKTOP HORIZONTAL CONTINUOUS TIMELINE */}
      <div className="hidden lg:block relative mb-20">
        {/* Continuous 4px Gradient Line (Blue -> Purple -> Pink -> Green) */}
        <div className="absolute top-[72px] left-[12%] right-[12%] z-0">
          <AnimatedProgress progressPercentage={progressPercentage} orientation="horizontal" />
        </div>

        {/* Milestone Nodes Row */}
        <div className="grid grid-cols-4 gap-8 relative z-10">
          {milestones.map((m, idx) => (
            <TimelineNode
              key={m.id}
              milestone={m}
              index={idx}
              isActive={selectedMilestone?.id === m.id}
              onClick={() => setSelectedMilestone(m)}
            />
          ))}
        </div>
      </div>

      {/* MOBILE VERTICAL TIMELINE STACK */}
      <div className="lg:hidden relative mb-12 pl-6 border-l-2 border-slate-200 dark:border-slate-800 space-y-8">
        {milestones.map((m, idx) => (
          <div key={m.id} className="relative">
            <div className="absolute -left-[31px] top-0">
              <TimelineNode milestone={m} index={idx} />
            </div>
            <div className="pt-2">
              <TimelineCard milestone={m} index={idx} />
            </div>
          </div>
        ))}
      </div>

      {/* FOUR EQUAL-WIDTH MILESTONE CARDS DIRECTLY BELOW TIMELINE */}
      <div className="hidden lg:grid grid-cols-4 gap-8 mb-20">
        {milestones.map((m, idx) => (
          <TimelineCard key={m.id} milestone={m} index={idx} />
        ))}
      </div>

      {/* FOUR STATISTIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.1 }}
          whileHover={{ y: -3 }}
          className="p-6 rounded-[24px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex items-center gap-4"
        >
          <div className="size-11 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center border border-slate-200/60 dark:border-slate-700/60 shrink-0">
            <Calendar className="size-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Timeline Progress
            </p>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {progressPercentage}%
              </span>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                Phase 1 Done
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.2 }}
          whileHover={{ y: -3 }}
          className="p-6 rounded-[24px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex items-center gap-4"
        >
          <div className="size-11 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center border border-slate-200/60 dark:border-slate-700/60 shrink-0">
            <Users className="size-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Teams Participating
            </p>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-extrabold text-slate-900 dark:text-white">120+</span>
              <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">
                Registered
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.3 }}
          whileHover={{ y: -3 }}
          className="p-6 rounded-[24px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex items-center gap-4"
        >
          <div className="size-11 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center border border-slate-200/60 dark:border-slate-700/60 shrink-0">
            <Target className="size-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Current Stage</p>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-lg font-extrabold text-slate-900 dark:text-white truncate">
                Problem Selection
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.4 }}
          whileHover={{ y: -3 }}
          className="p-6 rounded-[24px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex items-center gap-4"
        >
          <div className="size-11 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center border border-slate-200/60 dark:border-slate-700/60 shrink-0">
            <Trophy className="size-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Teams to Final
            </p>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-extrabold text-slate-900 dark:text-white">Top 7</span>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                Shortlisted
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* SIDE-BY-SIDE DEADLINE & MENTOR WIDGETS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
        {/* DEADLINE WIDGET */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="p-8 rounded-[24px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 flex items-center gap-1.5">
                <Flame className="size-3.5 text-purple-600 dark:text-purple-400" />
                Next Deadline
              </span>
              <span className="text-xs text-slate-500 font-medium">Round 1 Evaluation</span>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
              Round 1 Evaluation
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Target Date: <span className="font-semibold text-slate-900 dark:text-white">17 August 2026</span>
            </p>

            {/* Countdown Cards */}
            <div className="grid grid-cols-4 gap-3 text-center mb-6">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                <span className="block text-2xl font-bold text-slate-900 dark:text-white">
                  {String(timeLeft.days).padStart(2, '0')}
                </span>
                <span className="text-[10px] font-semibold uppercase text-slate-500">Days</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                <span className="block text-2xl font-bold text-slate-900 dark:text-white">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[10px] font-semibold uppercase text-slate-500">Hours</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                <span className="block text-2xl font-bold text-slate-900 dark:text-white">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[10px] font-semibold uppercase text-slate-500">Minutes</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                <span className="block text-2xl font-bold text-slate-900 dark:text-white">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[10px] font-semibold uppercase text-slate-500">Seconds</span>
              </div>
            </div>
          </div>

          <Button
            onClick={() => setSelectedMilestone(INITIAL_MILESTONES[1] ?? null)}
            className="w-full h-11 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2"
          >
            <span>Prepare Deliverables</span>
            <ArrowRight className="size-4" />
          </Button>
        </motion.div>

        {/* MENTOR TIP WIDGET */}
        <motion.div
          initial={{ opacity: 0, x: 15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="p-8 rounded-[24px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5">
                <Lightbulb className="size-3.5 text-amber-500" />
                Mentor Insight
              </span>
              <button
                onClick={handleNextTip}
                className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <RefreshCw className="size-3" />
                <span>Next Insight</span>
              </button>
            </div>

            <div className="min-h-[120px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={activeTipIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="text-base sm:text-lg font-medium text-slate-800 dark:text-slate-200 leading-relaxed border-l-3 border-purple-600 pl-4 py-1"
                >
                  &ldquo;{MENTOR_TIPS[activeTipIndex]}&rdquo;
                </motion.blockquote>
              </AnimatePresence>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">
              Insight {activeTipIndex + 1} of {MENTOR_TIPS.length}
            </span>
            <Button
              variant="outline"
              onClick={() => setSelectedMilestone(INITIAL_MILESTONES[1] ?? null)}
              className="h-9 px-4 rounded-xl border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs transition-colors"
            >
              View Jury Rubric
            </Button>
          </div>
        </motion.div>
      </div>

      {/* BOTTOM PROCESS PATHWAY */}
      <div className="pt-12 border-t border-slate-200/80 dark:border-slate-800">
        <div className="text-center mb-10">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Execution Pathway</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Six structured steps from problem definition to final victory
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {PROCESS_STEPS.map((ps, idx) => {
            const StepIcon = ps.icon;
            return (
              <motion.div
                key={ps.step}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center flex flex-col items-center shadow-2xs hover:border-slate-300 dark:hover:border-slate-700 transition-all"
              >
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                  Step {ps.step}
                </span>
                <div className="size-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center mb-2">
                  <StepIcon className="size-4" />
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">{ps.title}</h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{ps.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const INITIAL_MILESTONES: Milestone[] = [
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
