import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  [
    'inline-flex w-fit shrink-0 items-center gap-1.5 whitespace-nowrap',
    'rounded-full border px-2.5 py-0.5 text-caption font-medium',
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-3.5",
  ],
  {
    variants: {
      variant: {
        neutral: 'border-border bg-muted text-muted-foreground',
        outline: 'border-border bg-transparent text-foreground',
        solid: 'border-transparent bg-primary text-primary-foreground',
        accent: 'border-accent-border bg-accent-surface text-accent-text',
        success: 'border-success-border bg-success-surface text-success-foreground',
        warning: 'border-warning-border bg-warning-surface text-warning-foreground',
        danger: 'border-danger-border bg-danger-surface text-danger-foreground',
        info: 'border-info-border bg-info-surface text-info-foreground',
      },
      size: {
        sm: 'px-2 py-0 text-[0.6875rem]',
        md: 'px-2.5 py-0.5 text-caption',
      },
    },
    defaultVariants: { variant: 'neutral', size: 'md' },
  },
);

export interface BadgeProps
  extends React.ComponentProps<'span'>, VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}

function Badge({ className, variant, size, asChild = false, ...props }: BadgeProps) {
  const Comp = asChild ? Slot : 'span';
  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
