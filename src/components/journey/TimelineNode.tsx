'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { Milestone } from '@/components/journey/types';

interface TimelineNodeProps {
  milestone: Milestone;
  index: number;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

const STAGE_COLORS = [
  {
    ring: 'border-[#4F7CFF]/40 bg-[#4F7CFF]/10 text-[#4F7CFF]',
    dot: 'bg-[#4F7CFF]',
    glow: 'shadow-[0_0_16px_rgba(79,124,255,0.4)]',
    badge: 'bg-blue-50 text-[#4F7CFF] border-blue-200 dark:bg-blue-950/60 dark:border-blue-800 dark:text-blue-300',
  },
  {
    ring: 'border-[#8B5CF6]/40 bg-[#8B5CF6]/10 text-[#8B5CF6]',
    dot: 'bg-[#8B5CF6]',
    glow: 'shadow-[0_0_16px_rgba(139,92,246,0.4)]',
    badge: 'bg-purple-50 text-[#8B5CF6] border-purple-200 dark:bg-purple-950/60 dark:border-purple-800 dark:text-purple-300',
  },
  {
    ring: 'border-[#EC4899]/40 bg-[#EC4899]/10 text-[#EC4899]',
    dot: 'bg-[#EC4899]',
    glow: 'shadow-[0_0_16px_rgba(236,72,153,0.4)]',
    badge: 'bg-pink-50 text-[#EC4899] border-pink-200 dark:bg-pink-950/60 dark:border-pink-800 dark:text-pink-300',
  },
  {
    ring: 'border-[#10B981]/40 bg-[#10B981]/10 text-[#10B981]',
    dot: 'bg-[#10B981]',
    glow: 'shadow-[0_0_16px_rgba(16,185,129,0.4)]',
    badge: 'bg-emerald-50 text-[#10B981] border-emerald-200 dark:bg-emerald-950/60 dark:border-emerald-800 dark:text-emerald-300',
  },
];

export function TimelineNode({ milestone, index, onClick, className }: TimelineNodeProps) {
  const colors = STAGE_COLORS[index % STAGE_COLORS.length] ?? STAGE_COLORS[0]!;
  const isCompleted = milestone.status === 'Completed';

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
          {isCompleted ? 'Completed' : `${milestone.remainingDays ?? 10} Days Left`}
        </span>
      </div>
    </div>
  );
}
