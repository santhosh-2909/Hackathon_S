'use client';

import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from '@/lib/utils';

/**
 * Meter. The unfilled track is a lighter step of the fill's own ramp so state
 * reads across the whole bar, per the design system's meter rule.
 */
function Progress({
  className,
  value,
  tone = 'accent',
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & {
  tone?: 'accent' | 'success' | 'warning' | 'danger' | 'neutral';
}) {
  const track = {
    accent: 'bg-accent-surface',
    success: 'bg-success-surface',
    warning: 'bg-warning-surface',
    danger: 'bg-danger-surface',
    neutral: 'bg-muted',
  }[tone];

  const fill = {
    accent: 'bg-accent',
    success: 'bg-success',
    warning: 'bg-warning',
    danger: 'bg-danger',
    neutral: 'bg-primary',
  }[tone];

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      value={value}
      className={cn('relative h-1.5 w-full overflow-hidden rounded-full', track, className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          'h-full w-full transition-transform duration-500 ease-[var(--ease-standard)]',
          fill,
        )}
        style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
