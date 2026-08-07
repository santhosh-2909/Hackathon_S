import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  [
    'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap',
    'rounded-md font-medium select-none',
    'transition-[background-color,border-color,color,box-shadow,transform] duration-150 ease-[var(--ease-standard)]',
    'outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'disabled:pointer-events-none disabled:opacity-50',
    'active:translate-y-px',
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary-hover shadow-e1',
        accent: 'bg-accent text-accent-foreground hover:bg-accent-hover shadow-e1',
        // Pale lavender fill carrying near-black ink. The border is not
        // decoration: a soft fill on the cream page is only ~1.5:1, so the
        // boundary is what satisfies WCAG 1.4.11 non-text contrast.
        soft: 'border border-accent-soft-border bg-accent-soft text-accent-soft-foreground hover:bg-accent-soft-hover',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-muted border border-border',
        outline:
          'border border-border bg-surface text-foreground hover:bg-muted hover:border-border-strong',
        ghost: 'text-muted-foreground hover:bg-muted hover:text-foreground',
        link: 'text-foreground underline underline-offset-4 decoration-border-strong hover:decoration-accent',
        danger: 'bg-danger text-white hover:brightness-95 shadow-e1',
      },
      size: {
        sm: 'h-8 px-3 text-caption',
        md: 'h-9 px-4 text-body-sm',
        lg: 'h-11 px-5 text-body-sm',
        icon: 'size-9',
        'icon-sm': 'size-8',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

export interface ButtonProps
  extends React.ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  /** Render the child element instead of a `<button>`, keeping all styling. */
  asChild?: boolean;
}

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
