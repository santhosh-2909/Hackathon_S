import * as React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      data-slot="pagination"
      className={cn('mx-auto flex w-full justify-center', className)}
      {...props}
    />
  );
}

function PaginationContent({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn('flex flex-row items-center gap-1', className)}
      {...props}
    />
  );
}

function PaginationItem(props: React.ComponentProps<'li'>) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = React.ComponentProps<typeof Link> & {
  isActive?: boolean;
  size?: 'icon-sm' | 'sm' | 'md';
};

function PaginationLink({ className, isActive, size = 'icon-sm', ...props }: PaginationLinkProps) {
  return (
    <Link
      aria-current={isActive ? 'page' : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({ variant: isActive ? 'outline' : 'ghost', size }),
        isActive && 'border-border-strong bg-surface font-semibold text-foreground',
        className,
      )}
      {...props}
    />
  );
}

/**
 * Disabled edges render as plain `<span>` rather than a link — an anchor that
 * goes nowhere is still focusable and still announced as a link.
 */
function PaginationEdge({
  direction,
  disabled,
  className,
  ...props
}: Omit<PaginationLinkProps, 'size' | 'isActive'> & {
  direction: 'previous' | 'next';
  disabled?: boolean;
}) {
  const label = direction === 'previous' ? 'Previous page' : 'Next page';
  const Icon = direction === 'previous' ? ChevronLeft : ChevronRight;
  const content = (
    <>
      {direction === 'previous' ? <Icon className="size-4" aria-hidden /> : null}
      <span className="hidden sm:inline">{direction === 'previous' ? 'Previous' : 'Next'}</span>
      {direction === 'next' ? <Icon className="size-4" aria-hidden /> : null}
    </>
  );

  if (disabled) {
    return (
      <span
        aria-disabled="true"
        className={cn(
          buttonVariants({ variant: 'ghost', size: 'sm' }),
          'pointer-events-none gap-1 px-2.5 opacity-40',
          className,
        )}
      >
        {content}
      </span>
    );
  }

  return (
    <Link
      aria-label={label}
      className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'gap-1 px-2.5', className)}
      {...props}
    >
      {content}
    </Link>
  );
}

function PaginationEllipsis({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn('grid size-8 place-items-center text-muted-foreground', className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationEdge,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
};
