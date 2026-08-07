import * as React from 'react';

import { cn } from '@/lib/utils';

const fieldBase = [
  'w-full rounded-md border border-input bg-surface text-foreground',
  'placeholder:text-subtle-foreground',
  'transition-[border-color,box-shadow] duration-150 ease-[var(--ease-standard)]',
  'outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/25',
  'disabled:cursor-not-allowed disabled:opacity-60 disabled:bg-muted',
  'aria-invalid:border-danger aria-invalid:ring-2 aria-invalid:ring-danger/20',
];

function Input({ className, type = 'text', ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        fieldBase,
        'h-9 px-3 py-1 text-body-sm',
        'file:mr-3 file:border-0 file:bg-transparent file:text-body-sm file:font-medium',
        className,
      )}
      {...props}
    />
  );
}

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(fieldBase, 'field-sizing-content min-h-24 px-3 py-2 text-body-sm', className)}
      {...props}
    />
  );
}

export { Input, Textarea, fieldBase };
