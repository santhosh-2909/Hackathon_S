'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Check, CheckCircle2, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface SubmissionItem {
  id: string;
  label: string;
  subtext: string;
}

const ITEMS: SubmissionItem[] = [
  { id: 's1', label: 'Problem is Real', subtext: 'Verified by observing friction or interviewing active sufferers.' },
  { id: 's2', label: 'Users Validated', subtext: 'Direct user feedback confirms this is a genuine high-priority pain point.' },
  { id: 's3', label: 'Data Exists', subtext: 'Public dataset, API, or collectable student log mechanism is ready.' },
  { id: 's4', label: 'Solution is Feasible', subtext: 'A working core vertical slice can be built inside the hackathon window.' },
  { id: 's5', label: 'Impact is Measurable', subtext: 'Clear baseline metrics exist to evaluate before vs after outcomes.' },
  { id: 's6', label: 'Innovation is Clear', subtext: 'Distinct workflow, integration, or accessibility differentiator defined.' },
];

export function SubmissionChecklist() {
  const [checkedState, setCheckedState] = React.useState<Record<string, boolean>>({
    s1: true,
    s2: true,
    s3: true,
    s4: true,
    s5: true,
    s6: true,
  });

  const toggleItem = (id: string) => {
    setCheckedState((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const allReady = Object.values(checkedState).filter(Boolean).length === ITEMS.length;

  return (
    <section className="py-12 border-t border-slate-100 dark:border-slate-800">
      <div className="p-8 sm:p-10 rounded-[28px] bg-gradient-to-b from-blue-50/50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-blue-950/20 border border-blue-500/20 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 mb-2">
              <CheckCircle2 className="size-3.5" />
              <span>Final Readiness Gate</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Submission Checklist
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Verify all six criteria before locking your problem statement and starting your build.
            </p>
          </div>

          <Button
            asChild
            disabled={!allReady}
            className="h-12 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/20 shrink-0 cursor-pointer"
          >
            <Link href="/project-journey">
              <Rocket className="size-4" />
              <span>Lock & Track on Journey</span>
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {ITEMS.map((item, idx) => {
            const isChecked = Boolean(checkedState[item.id]);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                onClick={() => toggleItem(item.id)}
                className="cursor-pointer p-4 rounded-[20px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:border-blue-500/40 transition-all flex items-start gap-3 select-none"
              >
                <div
                  className={`size-5 rounded-md flex items-center justify-center border transition-colors shrink-0 mt-0.5 ${
                    isChecked
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-transparent'
                  }`}
                >
                  <Check className="size-3 stroke-[3]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{item.label}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-normal">
                    {item.subtext}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
