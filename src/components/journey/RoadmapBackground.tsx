'use client';

import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export function RoadmapBackground() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Soft Radial Ambient Gradient Wash */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-cyan-500/5 via-blue-500/3 to-transparent blur-3xl dark:from-cyan-500/10 dark:via-blue-500/5" />

      {/* Tiny Hairline Grid Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] [background-size:40px_40px] opacity-40 dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] dark:opacity-30" />

      {/* Floating Light Blur Shapes (Disabled when prefers-reduced-motion is true) */}
      {!prefersReducedMotion && (
        <>
          <motion.div
            animate={{
              y: [0, -15, 0],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/4 left-10 size-72 rounded-full bg-blue-400/5 blur-3xl dark:bg-blue-600/10"
          />
          <motion.div
            animate={{
              y: [0, 15, 0],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-1/4 right-10 size-72 rounded-full bg-blue-400/5 blur-3xl dark:bg-blue-600/10"
          />
        </>
      )}
    </div>
  );
}
