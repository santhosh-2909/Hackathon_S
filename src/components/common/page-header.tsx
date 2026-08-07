import * as React from 'react';

import { cn } from '@/lib/utils';

interface PageHeaderProps extends React.ComponentProps<'div'> {
  title: string;
  description?: React.ReactNode;
  breadcrumb?: React.ReactNode;
  actions?: React.ReactNode;
}

/** Header block for every authenticated route. One `h1` per page lives here. */
function PageHeader({
  title,
  description,
  breadcrumb,
  actions,
  className,
  children,
  ...props
}: PageHeaderProps) {
  return (
    <div className={cn('flex flex-col gap-4', className)} {...props}>
      {breadcrumb}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-8">
        <div className="flex max-w-2xl flex-col gap-1.5">
          <h1 className="text-h1">{title}</h1>
          {description ? <p className="text-body-sm text-muted-foreground">{description}</p> : null}
        </div>
        {actions ? (
          <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>
        ) : null}
      </div>
      {children}
    </div>
  );
}

export { PageHeader };
