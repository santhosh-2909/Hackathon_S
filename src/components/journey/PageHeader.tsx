'use client';

import * as React from 'react';
import { siteConfig } from '@/config/site';
import { motion } from 'framer-motion';

export function PageHeader() {
  return (
    <div className="text-center max-w-[700px] mx-auto pt-8 pb-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent-border bg-accent-surface px-3.5 py-1 text-[11px] font-bold tracking-widest text-accent-text uppercase shadow-e1"
      >
        <span>{siteConfig.name} TIMELINE</span>
      </motion.div>

      {/* Large Desktop Typography Heading (72px) */}
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.08 }}
        className="mb-6 text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-[72px]"
      >
        Timeline
      </motion.h1>

      {/* Supporting Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.16 }}
        className="text-balance text-base leading-relaxed text-muted-foreground sm:text-lg"
      >
        A clear, focused view of every key milestone — from choosing your challenge to presenting
        a working prototype at the Grand Finale.
      </motion.p>
    </div>
  );
}
