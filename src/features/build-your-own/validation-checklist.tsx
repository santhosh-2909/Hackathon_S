'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Check, ShieldCheck, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface Criterion {
  id: string;
  question: string;
  detail: string;
}

const CRITERIA: Criterion[] = [
  {
    id: 'c1',
    question: 'Is it a real problem?',
    detail: 'Verified through direct observation, real user reports, or observable operational friction.',
  },
  {
    id: 'c2',
    question: 'Who experiences it?',
    detail: 'Specific target user persona identified (e.g. clinic nurse, hostel mess manager, small merchant).',
  },
  {
    id: 'c3',
    question: 'How often does it occur?',
    detail: 'High-frequency recurring pain point rather than a rare once-a-year anomaly.',
  },
  {
    id: 'c4',
    question: 'What is the current solution?',
    detail: 'Existing manual process, paper log, or workaround is clearly documented.',
  },
  {
    id: 'c5',
    question: 'Why is the current solution ineffective?',
    detail: 'Clear bottleneck, high error rate, excessive cost, or delay in existing methods.',
  },
  {
    id: 'c6',
    question: 'Can technology improve it?',
    detail: 'Software, AI, or automation can deliver a 10x improvement in speed, accuracy, or access.',
  },
  {
    id: 'c7',
    question: 'Can you collect data?',
    detail: 'Accessible public dataset or student-collectable log exists for training & validation.',
  },
];

export function ValidationChecklist() {
  const [checkedIds, setCheckedIds] = React.useState<Record<string, boolean>>({
    c1: true,
    c2: true,
    c3: true,
    c4: false,
    c5: false,
    c6: false,
    c7: false,
  });

  const toggleCriterion = (id: string) => {
    setCheckedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const resetChecklist = () => {
    setCheckedIds({
      c1: false,
      c2: false,
      c3: false,
      c4: false,
      c5: false,
      c6: false,
      c7: false,
    });
  };

  const checkedCount = Object.values(checkedIds).filter(Boolean).length;
  const totalCount = CRITERIA.length;
  const isFullyValidated = checkedCount === totalCount;

  return (
    <section className="py-12 border-t border-slate-100 dark:border-slate-800">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 mb-2">
            <ShieldCheck className="size-3.5" />
            <span>Problem Validation Matrix</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Validation Checklist
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Run your candidate problem through these seven validation gates before locking your project.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-right">
            <span className="block text-xl font-extrabold text-slate-900 dark:text-white leading-none">
              {checkedCount} / {totalCount}
            </span>
            <span className="text-[10px] font-semibold uppercase text-slate-500">
              {isFullyValidated ? 'Fully Validated!' : 'Gates Passed'}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={resetChecklist}
            className="rounded-xl border-slate-200 dark:border-slate-700 text-xs font-medium"
          >
            <RefreshCw className="size-3" />
            <span>Reset</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {CRITERIA.map((crit, idx) => {
          const isChecked = Boolean(checkedIds[crit.id]);
          return (
            <motion.div
              key={crit.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              onClick={() => toggleCriterion(crit.id)}
              className={cn(
                'cursor-pointer p-5 rounded-[24px] border transition-all duration-200 flex items-start gap-3.5 select-none',
                isChecked
                  ? 'bg-emerald-500/5 dark:bg-emerald-500/10 border-emerald-500/30 dark:border-emerald-500/30 shadow-2xs'
                  : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              )}
            >
              <div
                className={cn(
                  'size-6 rounded-lg flex items-center justify-center border transition-colors shrink-0 mt-0.5',
                  isChecked
                    ? 'bg-emerald-600 border-emerald-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-transparent'
                )}
              >
                <Check className="size-3.5 stroke-[3]" />
              </div>

              <div>
                <h4
                  className={cn(
                    'text-sm font-bold transition-colors',
                    isChecked
                      ? 'text-slate-900 dark:text-white'
                      : 'text-slate-700 dark:text-slate-300'
                  )}
                >
                  {crit.question}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {crit.detail}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
