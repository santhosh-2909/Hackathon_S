'use client';

import * as React from 'react';
import { Eye, EyeOff } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

/**
 * Password input with a reveal toggle. The toggle is a real button with a
 * changing accessible name, so a screen-reader user knows the current state
 * rather than only seeing an icon swap.
 */
const PasswordField = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  function PasswordField({ className, ...props }, ref) {
    const [visible, setVisible] = React.useState(false);

    return (
      <div className="relative">
        <Input
          ref={ref}
          type={visible ? 'text' : 'password'}
          className={cn('pr-10', className)}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((value) => !value)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          aria-pressed={visible}
          className={cn(
            'absolute top-1/2 right-1 grid size-8 -translate-y-1/2 place-items-center rounded-md',
            'text-muted-foreground transition-colors hover:text-foreground',
            'focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
          )}
        >
          {visible ? (
            <EyeOff className="size-4" aria-hidden />
          ) : (
            <Eye className="size-4" aria-hidden />
          )}
        </button>
      </div>
    );
  },
);

export { PasswordField };
