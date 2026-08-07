'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Eye, MessageSquare, FileSpreadsheet, Target, Search } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    title: 'Observe',
    icon: Eye,
    description:
      'Notice recurring bottlenecks, manual inefficiencies, and workarounds in daily workflows across your campus or community.',
  },
  {
    step: '02',
    title: 'Interview Users',
    icon: MessageSquare,
    description:
      'Talk directly to people experiencing the friction. Ask open questions about what blocks them and how they cope today.',
  },
  {
    step: '03',
    title: 'Record Pain Points',
    icon: FileSpreadsheet,
    description:
      'Document exact costs: lost hours, financial drain, administrative stress, or physical material waste.',
  },
  {
    step: '04',
    title: 'Validate Demand',
    icon: Target,
    description:
      'Verify if multiple users face the exact same problem or if it is isolated to a single person.',
  },
  {
    step: '05',
    title: 'Find Root Causes',
    icon: Search,
    description:
      'Distinguish between the visible symptom (e.g. food waste) and the core breakdown (unpredictable opt-outs).',
  },
];

export function DiscoveryGuide() {
  return (
    <section id="problem-discovery" className="py-12 border-t border-slate-100 dark:border-slate-800">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
          Problem Discovery Pathway
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
          Start by identifying a real issue that people face every day before writing any code.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {STEPS.map((s, idx) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.07 }}
              whileHover={{ y: -4 }}
              className="p-5 rounded-[24px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:border-blue-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                    Step {s.step}
                  </span>
                  <div className="size-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center border border-slate-200/60 dark:border-slate-700/60">
                    <Icon className="size-4" />
                  </div>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  {s.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {s.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
