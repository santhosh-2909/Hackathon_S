'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  const scrollToFramework = () => {
    const el = document.getElementById('framework-editor');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToDiscovery = () => {
    const el = document.getElementById('problem-discovery');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="text-center max-w-3xl mx-auto pt-8 pb-14 px-4">
      {/* Small Badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/5 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-bold tracking-widest uppercase mb-6 shadow-2xs"
      >
        <Sparkles className="size-3.5 text-blue-600 dark:text-blue-400" />
        <span>Guided Problem Discovery</span>
      </motion.div>

      {/* Large Typography Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.08 }}
        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08] mb-6"
      >
        Build Your Own Problem Statement
      </motion.h1>

      {/* Subtitle / Description */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.16 }}
        className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-normal leading-relaxed text-balance max-w-2xl mx-auto mb-8"
      >
        The strongest hackathon projects begin with real problems—not random ideas. Observe your
        surroundings, talk to users, validate the pain point, and define a problem worth solving.
      </motion.p>

      {/* Primary & Secondary Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.24 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-3"
      >
        <Button
          onClick={scrollToFramework}
          size="lg"
          className="h-12 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/20 transition-all cursor-pointer flex items-center gap-2"
        >
          <span>Start Building</span>
          <ArrowRight className="size-4" />
        </Button>
        <Button
          onClick={scrollToDiscovery}
          variant="outline"
          size="lg"
          className="h-12 px-6 rounded-xl border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-sm transition-all cursor-pointer flex items-center gap-2"
        >
          <Compass className="size-4 text-blue-600" />
          <span>View Framework</span>
        </Button>
      </motion.div>
    </div>
  );
}
