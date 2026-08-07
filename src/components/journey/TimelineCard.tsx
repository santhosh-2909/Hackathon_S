'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Lightbulb,
  Trophy,
  Crown,
  ArrowRight,
  Calendar,
  Check,
  ShieldCheck,
  LightbulbIcon,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Milestone } from '@/components/journey/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface TimelineCardProps {
  milestone: Milestone;
  index: number;
  className?: string;
}

const ICON_MAP: Record<string, React.ElementType> = {
  FileText: FileText,
  Lightbulb: Lightbulb,
  Trophy: Trophy,
  Crown: Crown,
};

const ACCENT_STYLES = [
  {
    borderHover: 'hover:border-[#2563EB]/50 hover:shadow-[0_12px_30px_rgba(37,99,235,0.1)]',
    leftBorderLg: 'lg:border-l-4 lg:border-l-[#2563EB]',
    accentText: 'text-[#2563EB]',
  },
  {
    borderHover: 'hover:border-[#0891B2]/50 hover:shadow-[0_12px_30px_rgba(8,145,178,0.1)]',
    leftBorderLg: 'lg:border-l-4 lg:border-l-[#0891B2]',
    accentText: 'text-[#0891B2]',
  },
  {
    borderHover: 'hover:border-[#0F9F8C]/50 hover:shadow-[0_12px_30px_rgba(15,159,140,0.1)]',
    leftBorderLg: 'lg:border-l-4 lg:border-l-[#0F9F8C]',
    accentText: 'text-[#0F9F8C]',
  },
  {
    borderHover: 'hover:border-[#D97706]/50 hover:shadow-[0_12px_30px_rgba(217,119,6,0.1)]',
    leftBorderLg: 'lg:border-l-4 lg:border-l-[#D97706]',
    accentText: 'text-[#B45309]',
  },
];

export function TimelineCard({ milestone, index, className }: TimelineCardProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const IconComponent = ICON_MAP[milestone.iconName] || FileText;

  const accent = ACCENT_STYLES[index % ACCENT_STYLES.length] ?? ACCENT_STYLES[0]!;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, delay: index * 0.08 }}
        whileHover={{ y: -6, transition: { duration: 0.2 } }}
        className={cn('flex flex-col h-full', className)}
      >
        <div
          onClick={() => setIsOpen(true)}
          className={cn(
            'group cursor-pointer relative flex-1 p-6 rounded-[24px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 transition-all duration-300 shadow-2xs flex flex-col justify-between overflow-hidden',
            accent.borderHover,
            // Only show the accent left border at large viewports so it doesn't
            // collide with the vertical timeline line on mobile.
            // `leftBorderLg` contains the `lg:` prefix.
            accent.leftBorderLg
          )}
        >
          {/* Card Top Section: Small Monochrome Icon + Date */}
          <div>
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="size-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center border border-slate-200/60 dark:border-slate-700/60 transition-colors group-hover:bg-slate-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-slate-900">
                <IconComponent className="size-4 stroke-[1.75]" />
              </div>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Calendar className="size-3.5" />
                {milestone.date}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
              {milestone.title}
            </h3>

            {/* Description */}
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3 mb-6 font-normal">
              {milestone.description}
            </p>
          </div>

          {/* Divider & Action link */}
          <div>
            <div className="w-full h-px bg-slate-100 dark:bg-slate-800/80 mb-4" />
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
              <span className={cn('font-semibold', accent.accentText)}>View Details</span>
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* DETAIL MODAL / DIALOG */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-xl rounded-[24px] bg-white dark:bg-slate-900 p-6 sm:p-8 border border-slate-200 dark:border-slate-800 max-h-[85vh] overflow-y-auto">
          <DialogHeader className="pr-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="size-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center border border-slate-200/60 dark:border-slate-700/60">
                <IconComponent className="size-4" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {milestone.stageName}
              </span>
              <span className="text-xs text-slate-400 font-medium flex items-center gap-1 ml-auto">
                <Calendar className="size-3.5" />
                {milestone.date}
              </span>
            </div>

            <DialogTitle className="text-xl font-bold text-slate-900 dark:text-white">
              {milestone.title}
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              {milestone.description}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 mt-5">
            {/* DELIVERABLES */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2.5 flex items-center gap-2">
                <FileText className="size-4 text-blue-600 dark:text-blue-400" />
                <span>Required Deliverables</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                {milestone.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* EVALUATION CRITERIA */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                <ShieldCheck className="size-4 text-blue-600 dark:text-blue-400" />
                <span>Evaluation Criteria</span>
              </h4>
              <div className="space-y-2.5">
                {milestone.evaluationCriteria.map((crit, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-slate-800 dark:text-slate-200">
                      <span>{crit.name}</span>
                      <span className="text-blue-600 dark:text-blue-400">{crit.weight}</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-blue-600 dark:bg-blue-500 h-full rounded-full"
                        style={{ width: crit.weight }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* MENTOR NOTES & TIPS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/20">
                <h5 className="text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300 mb-1 flex items-center gap-1.5">
                  <LightbulbIcon className="size-3.5" />
                  Mentor Note
                </h5>
                <p className="text-xs text-slate-600 dark:text-slate-300 font-normal">
                  &ldquo;{milestone.mentorNotes}&rdquo;
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                  <Zap className="size-3.5 text-amber-500" />
                  Pro Tip
                </h5>
                <p className="text-xs text-slate-600 dark:text-slate-300 font-normal">
                  {milestone.tips}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <Button
              onClick={() => setIsOpen(false)}
              className="rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 font-semibold text-xs px-5 py-2"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
