'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Users, Eye, BookOpen, Building, BarChart2, Compass, Database } from 'lucide-react';

const TIPS = [
  {
    title: 'Interview Real Users',
    icon: Users,
    description: 'Speak to 3-5 people actively experiencing the problem. Record verbatim phrases they use to describe their pain.',
  },
  {
    title: 'Observe Workflows',
    icon: Eye,
    description: 'Shadow users in their actual environment. Spot hidden workarounds, repeated manual entries, and paper logs.',
  },
  {
    title: 'Search Research Papers',
    icon: BookOpen,
    description: 'Consult IEEE, ACM, or Google Scholar for existing academic benchmarks and validated algorithmic approaches.',
  },
  {
    title: 'Government Reports',
    icon: Building,
    description: 'Examine official public data portals (UDISE+, AYUSH, NITI Aayog, Data.gov.in) for verified national statistics.',
  },
  {
    title: 'Industry Surveys',
    icon: BarChart2,
    description: 'Review whitepapers and industry benchmark surveys (McKinsey, Gartner) to quantify financial or material waste.',
  },
  {
    title: 'Existing Solutions',
    icon: Compass,
    description: 'Map competitor products and open-source tools to identify exact feature gaps and unaddressed use cases.',
  },
  {
    title: 'Data Availability',
    icon: Database,
    description: 'Verify if open datasets exist on Kaggle, GitHub, or public APIs before committing to a machine learning stack.',
  },
];

export function ResearchTips() {
  return (
    <section className="py-12 border-t border-slate-100 dark:border-slate-800">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
          Research Best Practices
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
          Ground your problem statement in empirical evidence using these seven validation channels.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {TIPS.map((tip, idx) => {
          const Icon = tip.icon;
          return (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              whileHover={{ y: -3 }}
              className="p-5 rounded-[20px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:border-blue-500/40 transition-all"
            >
              <div className="size-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center border border-slate-200/60 dark:border-slate-700/60 mb-3">
                <Icon className="size-4" />
              </div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white mb-1">
                {tip.title}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                {tip.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
