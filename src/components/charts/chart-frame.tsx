'use client';

import * as React from 'react';
import { Table2 } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export interface ChartSeries {
  key: string;
  label: string;
  /** CSS colour token, e.g. `var(--chart-1)`. */
  color: string;
}

interface ChartFrameProps extends React.ComponentProps<'figure'> {
  title: string;
  subtitle?: string;
  /** Omitted for single-series charts — the title already names what is plotted. */
  series?: ChartSeries[];
  /** Rendered inside the disclosure that backs every chart with a data table. */
  table: React.ReactNode;
  action?: React.ReactNode;
}

/**
 * Shared chrome for every chart: title, legend, and the table view.
 *
 * The table is not optional decoration — it is the non-visual channel that makes
 * the chart's values reachable when colour or shape fails (CVD, screen reader,
 * print). It is a `<details>` so it costs no layout until opened.
 */
function ChartFrame({
  title,
  subtitle,
  series,
  table,
  action,
  className,
  children,
  ...props
}: ChartFrameProps) {
  const showLegend = (series?.length ?? 0) >= 2;

  return (
    <figure className={cn('flex flex-col gap-4', className)} {...props}>
      <figcaption className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <span className="text-h5">{title}</span>
          {subtitle ? <span className="text-caption text-muted-foreground">{subtitle}</span> : null}
        </div>
        <div className="flex items-center gap-4">
          {showLegend ? (
            <ul className="flex flex-wrap items-center gap-3">
              {series?.map((item) => (
                <li
                  key={item.key}
                  className="flex items-center gap-1.5 text-caption text-muted-foreground"
                >
                  <span
                    aria-hidden
                    className="inline-block h-0.5 w-4 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  {item.label}
                </li>
              ))}
            </ul>
          ) : null}
          {action}
        </div>
      </figcaption>

      {children}

      <details className="group rounded-lg border border-border bg-surface-sunken">
        <summary
          className={cn(
            'flex cursor-pointer list-none items-center gap-2 px-3 py-2 text-caption text-muted-foreground',
            'rounded-lg transition-colors hover:text-foreground',
            'focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
          )}
        >
          <Table2 className="size-3.5" aria-hidden />
          View as table
        </summary>
        <div className="overflow-x-auto border-t border-border p-1">{table}</div>
      </details>
    </figure>
  );
}

/** Small trailing control used by charts that offer a range switch. */
function ChartAction({ className, ...props }: React.ComponentProps<typeof Button>) {
  return <Button variant="ghost" size="sm" className={cn('text-caption', className)} {...props} />;
}

export { ChartFrame, ChartAction };
