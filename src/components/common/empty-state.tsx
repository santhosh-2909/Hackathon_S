import * as React from 'react';

import { cn } from '@/lib/utils';

interface EmptyStateProps extends React.ComponentProps<'div'> {
  icon?: React.ReactNode;
  title: string;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  /** `filtered` is for "no results for this query" — a different message and CTA. */
  variant?: 'empty' | 'filtered';
}

/**
 * The one empty-state shape used everywhere. An empty state always says what is
 * missing AND offers the next action — a bare "No data" is a dead end.
 */
function EmptyState({
  icon,
  title,
  description,
  actions,
  variant = 'empty',
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      data-slot="empty-state"
      data-variant={variant}
      className={cn(
        'flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border blueprint-grid',
        'bg-surface/60 px-6 py-14 text-center',
        className,
      )}
      {...props}
    >
      {icon ? (
        <div className="grid size-11 place-items-center rounded-lg border border-border bg-surface text-muted-foreground [&_svg]:size-5">
          {icon}
        </div>
      ) : null}
      <div className="flex max-w-sm flex-col gap-1.5">
        <p className="text-h5">{title}</p>
        {description ? <p className="text-body-sm text-muted-foreground">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap justify-center gap-2">{actions}</div> : null}
    </div>
  );
}

export { EmptyState };
