'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

/**
 * Toast surface. Styling is driven entirely by design tokens so toasts match the
 * rest of the system in both themes without a second colour source.
 */
function Toaster(props: ToasterProps) {
  const { resolvedTheme } = useTheme();

  return (
    <Sonner
      theme={(resolvedTheme as ToasterProps['theme']) ?? 'system'}
      position="bottom-right"
      offset={16}
      toastOptions={{
        classNames: {
          toast:
            'group rounded-lg border border-border bg-surface-raised text-foreground shadow-e3 text-body-sm',
          description: 'text-muted-foreground',
          actionButton: 'rounded-md bg-primary text-primary-foreground',
          cancelButton: 'rounded-md bg-muted text-muted-foreground',
          error: 'border-danger-border',
          success: 'border-success-border',
          warning: 'border-warning-border',
          info: 'border-info-border',
        },
      }}
      {...props}
    />
  );
}

export { Toaster };
