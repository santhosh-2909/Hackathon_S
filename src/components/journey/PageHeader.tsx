'use client';

import * as React from 'react';
import { motion } from 'framer-motion';

export function PageHeader() {
  return (
    <div className="text-center max-w-[700px] mx-auto pt-8 pb-16 px-4">
      {/* Small Badge with Purple Outline */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/5 border border-purple-500/30 text-purple-600 dark:text-purple-400 text-[11px] font-bold tracking-widest uppercase mb-6 shadow-2xs"
      >
        <span>HACKATHON ROADMAP</span>
      </motion.div>

      {/* Large Desktop Typography Heading (72px) */}
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.08 }}
        className="text-4xl sm:text-6xl lg:text-[72px] font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.05] mb-6"
      >
        Project Journey
      </motion.h1>

      {/* Supporting Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.16 }}
        className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-normal leading-relaxed text-balance"
      >
        Stay on track throughout the hackathon with every important milestone. Follow every
        milestone from idea selection to the Grand Finale.
      </motion.p>
    </div>
  );
}
