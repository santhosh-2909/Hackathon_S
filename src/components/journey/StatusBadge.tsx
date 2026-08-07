import * as React from 'react';
import { Check, Clock, Lock, Play, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { MilestoneStatus } from '@/components/journey/types';

interface StatusBadgeProps {
  status: MilestoneStatus;
  className?: string;
}

const STATUS_CONFIG: Record<
  MilestoneStatus,
  {
    label: string;
    icon: React.ElementType;
    className: string;
  }
> = {
  Completed: {
    label: 'Completed',
    icon: Check,
    className:
      'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 dark:border-emerald-500/30',
  },
  Live: {
    label: 'Live',
    icon: Play,
    className:
      'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/30 dark:border-purple-500/30',
  },
  Upcoming: {
    label: 'Upcoming',
    icon: Clock,
    className:
      'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/30 dark:border-blue-500/30',
  },
  Locked: {
    label: 'Locked',
    icon: Lock,
    className:
      'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20 dark:border-slate-500/20',
  },
  Rejected: {
    label: 'Rejected',
    icon: XCircle,
    className:
      'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/30 dark:border-red-500/30',
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.Upcoming;
  const Icon = config.icon;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide uppercase border backdrop-blur-sm transition-colors',
        config.className,
        className
      )}
    >
      <Icon className="size-3 shrink-0" />
      <span>{config.label}</span>
    </span>
  );
}
