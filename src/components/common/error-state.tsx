'use client';

import * as React from 'react';
import { RotateCcw, TriangleAlert } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ErrorStateProps extends React.ComponentProps<'div'> {
  title?: string;
  description?: React.ReactNode;
  /** Digest or code shown in small print so a user can quote it in a report. */
  reference?: string;
  onRetry?: () => void;
  retryLabel?: string;
  actions?: React.ReactNode;
}

function ErrorState({
  title = 'Something broke on our side',
  description = 'The page failed to load. Retrying usually fixes it — if it does not, the reference below identifies this exact failure.',
  reference,
  onRetry,
  retryLabel = 'Try again',
  actions,
  className,
  ...props
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        'flex flex-col items-center justify-center gap-4 rounded-xl border border-danger-border bg-danger-surface px-6 py-14 text-center',
        className,
      )}
      {...props}
    >
      <div className="grid size-11 place-items-center rounded-lg border border-danger-border bg-surface text-danger-foreground">
        <TriangleAlert className="size-5" aria-hidden />
      </div>
      <div className="flex max-w-md flex-col gap-1.5">
        <p className="text-h5">{title}</p>
        <p className="text-body-sm text-muted-foreground">{description}</p>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {onRetry ? (
          <Button variant="outline" onClick={onRetry}>
            <RotateCcw aria-hidden />
            {retryLabel}
          </Button>
        ) : null}
        {actions}
      </div>
      {reference ? (
        <p className="font-mono text-[0.6875rem] text-subtle-foreground">ref: {reference}</p>
      ) : null}
    </div>
  );
}

export { ErrorState };
