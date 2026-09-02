'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { Milestone } from '@/components/journey/types';
import { getDaysRemaining } from '@/components/journey/dates';

interface TimelineNodeProps {
  milestone: Milestone;
  index: number;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

const STAGE_COLORS = [
  {
    ring: 'border-[#2563EB]/40 bg-[#2563EB]/10 text-[#2563EB]',
    dot: 'bg-[#2563EB]',
    glow: 'shadow-[0_0_16px_rgba(37,99,235,0.35)]',
    badge: 'border-blue-200 bg-blue-50 text-[#2563EB] dark:border-blue-800 dark:bg-blue-950/60 dark:text-blue-300',
  },
  {
    ring: 'border-[#0891B2]/40 bg-[#0891B2]/10 text-[#0891B2]',
    dot: 'bg-[#0891B2]',
    glow: 'shadow-[0_0_16px_rgba(8,145,178,0.35)]',
    badge: 'border-cyan-200 bg-cyan-50 text-[#0891B2] dark:border-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-300',
  },
  {
    ring: 'border-[#0F9F8C]/40 bg-[#0F9F8C]/10 text-[#0F9F8C]',
    dot: 'bg-[#0F9F8C]',
    glow: 'shadow-[0_0_16px_rgba(15,159,140,0.35)]',
    badge: 'border-teal-200 bg-teal-50 text-[#0F9F8C] dark:border-teal-800 dark:bg-teal-950/60 dark:text-teal-300',
  },
  {
    ring: 'border-[#D97706]/40 bg-[#D97706]/10 text-[#D97706]',
    dot: 'bg-[#D97706]',
    glow: 'shadow-[0_0_16px_rgba(217,119,6,0.3)]',
    badge: 'border-amber-200 bg-amber-50 text-[#B45309] dark:border-amber-800 dark:bg-amber-950/60 dark:text-amber-300',
  },
];

export function TimelineNode({ milestone, index, onClick, className }: TimelineNodeProps) {
  const colors = STAGE_COLORS[index % STAGE_COLORS.length] ?? STAGE_COLORS[0]!;
  const isCompleted = milestone.status === 'Completed';

  // Recompute the exact days remaining whenever the calendar day changes so the
  // "X Days Left" badge stays accurate daily without a full page reload.
  const [, setDayTick] = React.useState(0);

  React.useEffect(() => {
    const now = new Date();
    const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const untilMidnight = nextMidnight.getTime() - now.getTime();

    const timer = window.setTimeout(() => {
      setDayTick((t) => t + 1);
    }, untilMidnight + 1000);

    return () => window.clearTimeout(timer);
  }, []);

  const daysLeft = getDaysRemaining(milestone.date);

  return (
    <div
      onClick={onClick}
      className={cn(
        'group cursor-pointer flex flex-col items-center text-center select-none',
        className
      )}
    >
      {/* Stage Name above node */}
      <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-3 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
        {milestone.stageName}
      </span>

      {/* Large Circular Milestone Node with Outer Ring + Inner Colored Circle + Glow */}
      <motion.div
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          'size-11 rounded-full flex items-center justify-center border-2 bg-white dark:bg-slate-900 transition-all duration-300 relative z-10',
          colors.ring,
          colors.glow
        )}
      >
        <div className={cn('size-4 rounded-full transition-transform duration-300 group-hover:scale-125', colors.dot)} />
      </motion.div>

      {/* Under every node: Rounded countdown badge */}
      <div className="mt-3">
        <span
          className={cn(
            'inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-semibold tracking-wide border shadow-2xs',
            colors.badge
          )}
        >
          {isCompleted ? 'Completed' : `${daysLeft} Days Left`}
        </span>
      </div>
    </div>
  );
}
