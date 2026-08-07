'use client';

import * as React from 'react';

import { number } from '@/lib/format';
import { ChartFrame } from '@/components/charts/chart-frame';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export interface BarDatum {
  label: string;
  value: number;
}

interface BarChartProps {
  title: string;
  subtitle?: string;
  data: BarDatum[];
  className?: string;
  valueLabel?: string;
}

/**
 * Horizontal bar chart, single series.
 *
 * One measure across named categories, so identity comes from the row label and
 * every bar wears the same hue — no legend, no per-category colour. Bars are
 * capped at 24px, carry a 4px rounded data-end with a square baseline, and are
 * separated by a 2px surface gap.
 */
function BarChart({ title, subtitle, data, valueLabel = 'Count', className }: BarChartProps) {
  const max = Math.max(1, ...data.map((d) => d.value));

  return (
    <ChartFrame
      title={title}
      subtitle={subtitle}
      className={className}
      table={
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Domain</TableHead>
              <TableHead className="text-right">{valueLabel}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.label}>
                <TableCell className="font-medium">{row.label}</TableCell>
                <TableCell className="text-right">{number(row.value)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      }
    >
      <ul className="flex flex-col gap-2">
        {data.map((row) => (
          <li key={row.label} className="grid grid-cols-[7.5rem_1fr_2.5rem] items-center gap-3">
            <span className="truncate text-caption text-muted-foreground">{row.label}</span>
            <span className="relative block h-4 rounded-r-[4px] bg-surface-sunken">
              <span
                className="absolute inset-y-0 left-0 block rounded-r-[4px] transition-[width] duration-500 ease-[var(--ease-standard)]"
                style={{
                  width: `${Math.max(2, (row.value / max) * 100)}%`,
                  backgroundColor: 'var(--chart-1)',
                }}
              />
            </span>
            <span className="text-right text-caption font-medium tabular-nums">
              {number(row.value)}
            </span>
          </li>
        ))}
      </ul>
    </ChartFrame>
  );
}

export { BarChart };
