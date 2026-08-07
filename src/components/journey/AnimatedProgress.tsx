'use client';

import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedProgressProps {
  progressPercentage?: number;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export function AnimatedProgress({
  progressPercentage = 100,
  orientation = 'horizontal',
  className,
}: AnimatedProgressProps) {
  const prefersReducedMotion = useReducedMotion();
  const scaleRatio = Math.min(Math.max(progressPercentage / 100, 0), 1);

  if (orientation === 'vertical') {
    return (
      <div className={cn('relative w-1 h-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden', className)}>
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: scaleRatio }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: 'easeOut' }}
          className="absolute top-0 right-0 left-0 h-full origin-top rounded-full bg-gradient-to-b from-[#2563EB] via-[#0891B2] via-[#0F9F8C] to-[#D97706]"
        />
      </div>
    );
  }

  return (
    <div className={cn('relative h-[4px] w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden', className)}>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scaleRatio }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: 'easeOut' }}
        className="absolute inset-0 origin-left rounded-full bg-gradient-to-r from-[#2563EB] via-[#0891B2] via-[#0F9F8C] to-[#D97706] shadow-[0_0_10px_rgba(8,145,178,0.25)]"
      />
    </div>
  );
}
