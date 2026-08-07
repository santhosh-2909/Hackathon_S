import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * Loading placeholder. Always paired with an accessible status announcement at
 * the region level — see `SkeletonRegion` — so screen readers hear "loading"
 * instead of nothing at all.
 */
function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn('shimmer-surface rounded-md bg-muted', className)}
      {...props}
    />
  );
}

interface SkeletonRegionProps extends React.ComponentProps<'div'> {
  /** Announced to assistive tech while the region is pending. */
  label?: string;
}

function SkeletonRegion({ label = 'Loading', className, children, ...props }: SkeletonRegionProps) {
  return (
    <div role="status" aria-live="polite" aria-busy className={cn(className)} {...props}>
      <span className="sr-only">{label}</span>
      {children}
    </div>
  );
}

export { Skeleton, SkeletonRegion };
