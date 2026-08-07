import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { AlertTriangle, CheckCircle2, Info, OctagonAlert } from 'lucide-react';

import { cn } from '@/lib/utils';

const alertVariants = cva(
  [
    'relative grid w-full grid-cols-[auto_1fr] items-start gap-x-3 gap-y-1',
    'rounded-lg border px-4 py-3 text-body-sm',
    "[&>svg:not([class*='size-'])]:size-4 [&>svg]:mt-0.5",
  ],
  {
    variants: {
      variant: {
        neutral: 'border-border bg-surface-sunken text-foreground [&>svg]:text-muted-foreground',
        info: 'border-info-border bg-info-surface text-foreground [&>svg]:text-info-foreground',
        success:
          'border-success-border bg-success-surface text-foreground [&>svg]:text-success-foreground',
        warning:
          'border-warning-border bg-warning-surface text-foreground [&>svg]:text-warning-foreground',
        danger:
          'border-danger-border bg-danger-surface text-foreground [&>svg]:text-danger-foreground',
      },
    },
    defaultVariants: { variant: 'neutral' },
  },
);

const DEFAULT_ICON = {
  neutral: Info,
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  danger: OctagonAlert,
} as const;

export interface AlertProps
  extends React.ComponentProps<'div'>, VariantProps<typeof alertVariants> {
  /** Pass `false` to suppress the default status icon. */
  icon?: React.ReactNode | false;
}

/**
 * Status is never carried by colour alone — every variant ships a matching icon
 * plus a visible title, per the status-colour rule in the design system.
 */
function Alert({ className, variant = 'neutral', icon, children, ...props }: AlertProps) {
  const Fallback = DEFAULT_ICON[variant ?? 'neutral'];
  return (
    <div
      data-slot="alert"
      role={variant === 'danger' ? 'alert' : 'status'}
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      {icon === false ? null : (icon ?? <Fallback aria-hidden />)}
      <div className="col-start-2 flex flex-col gap-1">{children}</div>
    </div>
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="alert-title"
      className={cn('font-semibold tracking-tight', className)}
      {...props}
    />
  );
}

function AlertDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-description"
      className={cn('text-muted-foreground [&_p]:leading-relaxed', className)}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription, alertVariants };
