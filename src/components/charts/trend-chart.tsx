'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { niceTicks, number } from '@/lib/format';
import { useElementSize } from '@/hooks/use-element-size';
import { ChartFrame, type ChartSeries } from '@/components/charts/chart-frame';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export interface TrendDatum {
  label: string;
  [key: string]: string | number;
}

interface TrendChartProps {
  title: string;
  subtitle?: string;
  data: TrendDatum[];
  series: ChartSeries[];
  height?: number;
  className?: string;
}

const PAD = { top: 16, right: 56, bottom: 28, left: 36 };

/**
 * Two-series line chart with an area wash, a hover crosshair and a tooltip.
 *
 * Mark spec: 2px lines with round caps, an ~10% area wash, hairline solid
 * gridlines, an 8px end marker carrying a 2px surface ring, and a single direct
 * label per series at the right edge. Everything else is carried by the axis,
 * the legend and the table view.
 */
function TrendChart({ title, subtitle, data, series, height = 240, className }: TrendChartProps) {
  const [ref, { width }] = useElementSize<HTMLDivElement>();
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const innerWidth = Math.max(0, width - PAD.left - PAD.right);
  const innerHeight = height - PAD.top - PAD.bottom;

  const max = React.useMemo(() => {
    const values = data.flatMap((row) => series.map((s) => Number(row[s.key] ?? 0)));
    return Math.max(1, ...values);
  }, [data, series]);

  const ticks = React.useMemo(() => niceTicks(max, 4), [max]);
  const scaleMax = ticks[ticks.length - 1] ?? max;

  const x = React.useCallback(
    (index: number) => PAD.left + (data.length <= 1 ? 0 : (index / (data.length - 1)) * innerWidth),
    [data.length, innerWidth],
  );
  const y = React.useCallback(
    (value: number) => PAD.top + innerHeight - (value / scaleMax) * innerHeight,
    [innerHeight, scaleMax],
  );

  const handlePointer = (event: React.PointerEvent<SVGRectElement>) => {
    if (data.length === 0 || innerWidth <= 0) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const offset = event.clientX - bounds.left;
    const step = innerWidth / Math.max(1, data.length - 1);
    setActiveIndex(Math.min(data.length - 1, Math.max(0, Math.round(offset / step))));
  };

  const active = activeIndex === null ? null : data[activeIndex];
  const ready = width > 0;

  return (
    <ChartFrame
      title={title}
      subtitle={subtitle}
      series={series}
      className={className}
      table={
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Week</TableHead>
              {series.map((s) => (
                <TableHead key={s.key} className="text-right">
                  {s.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.label}>
                <TableCell className="font-medium">{row.label}</TableCell>
                {series.map((s) => (
                  <TableCell key={s.key} className="text-right">
                    {number(Number(row[s.key] ?? 0))}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      }
    >
      <div ref={ref} className="relative w-full" style={{ height }}>
        {ready ? (
          <svg
            width={width}
            height={height}
            role="img"
            aria-label={`${title}. ${series.map((s) => s.label).join(' and ')} by week. Full values are available in the table below.`}
            className="overflow-visible"
          >
            {/* Gridlines + y ticks — recessive, hairline, solid. */}
            {ticks.map((tick) => (
              <g key={tick}>
                <line
                  x1={PAD.left}
                  x2={width - PAD.right}
                  y1={y(tick)}
                  y2={y(tick)}
                  stroke="var(--chart-grid)"
                  strokeWidth={1}
                  shapeRendering="crispEdges"
                />
                <text
                  x={PAD.left - 8}
                  y={y(tick)}
                  textAnchor="end"
                  dominantBaseline="middle"
                  className="fill-subtle-foreground text-[0.6875rem] tabular-nums"
                >
                  {tick}
                </text>
              </g>
            ))}

            {/* X labels: first, last and every other tick to avoid collisions. */}
            {data.map((row, index) =>
              index % 2 === 0 || index === data.length - 1 ? (
                <text
                  key={row.label}
                  x={x(index)}
                  y={height - 8}
                  textAnchor="middle"
                  className="fill-subtle-foreground text-[0.6875rem]"
                >
                  {row.label}
                </text>
              ) : null,
            )}

            {series.map((s) => {
              const points = data.map((row, index) => ({
                cx: x(index),
                cy: y(Number(row[s.key] ?? 0)),
              }));
              const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.cx},${p.cy}`).join(' ');
              const areaBase = PAD.top + innerHeight;
              const first = points[0];
              const last = points[points.length - 1];
              const area =
                first && last
                  ? `${line} L${last.cx},${areaBase} L${first.cx},${areaBase} Z`
                  : undefined;

              return (
                <g key={s.key}>
                  {area ? <path d={area} fill={s.color} opacity={0.1} /> : null}
                  <path
                    d={line}
                    fill="none"
                    stroke={s.color}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {last ? (
                    <>
                      {/* End marker: 8px dot with a 2px surface ring. */}
                      <circle
                        cx={last.cx}
                        cy={last.cy}
                        r={4}
                        fill={s.color}
                        stroke="var(--chart-surface)"
                        strokeWidth={2}
                      />
                      {/* The one direct label per series — the endpoint value. */}
                      <text
                        x={last.cx + 10}
                        y={last.cy}
                        dominantBaseline="middle"
                        className="fill-muted-foreground text-[0.6875rem] font-medium tabular-nums"
                      >
                        {number(Number(data[data.length - 1]?.[s.key] ?? 0))}
                      </text>
                    </>
                  ) : null}
                </g>
              );
            })}

            {/* Crosshair */}
            {activeIndex !== null ? (
              <g pointerEvents="none">
                <line
                  x1={x(activeIndex)}
                  x2={x(activeIndex)}
                  y1={PAD.top}
                  y2={PAD.top + innerHeight}
                  stroke="var(--chart-axis)"
                  strokeWidth={1}
                />
                {series.map((s) => (
                  <circle
                    key={s.key}
                    cx={x(activeIndex)}
                    cy={y(Number(data[activeIndex]?.[s.key] ?? 0))}
                    r={4}
                    fill={s.color}
                    stroke="var(--chart-surface)"
                    strokeWidth={2}
                  />
                ))}
              </g>
            ) : null}

            <rect
              x={PAD.left}
              y={PAD.top}
              width={Math.max(0, innerWidth)}
              height={innerHeight}
              fill="transparent"
              onPointerMove={handlePointer}
              onPointerLeave={() => setActiveIndex(null)}
            />
          </svg>
        ) : null}

        {active && activeIndex !== null ? (
          <div
            role="status"
            className={cn(
              'pointer-events-none absolute top-2 z-10 min-w-36 rounded-md border border-border',
              'bg-surface-raised px-3 py-2 shadow-e3',
            )}
            style={{
              left: Math.min(Math.max(x(activeIndex) - 72, 0), Math.max(0, width - 150)),
            }}
          >
            <p className="text-caption font-medium">{active.label}</p>
            <ul className="mt-1 flex flex-col gap-0.5">
              {series.map((s) => (
                <li key={s.key} className="flex items-center gap-2 text-caption">
                  <span
                    aria-hidden
                    className="size-2 shrink-0 rounded-full"
                    style={{ backgroundColor: s.color }}
                  />
                  <span className="text-muted-foreground">{s.label}</span>
                  <span className="ml-auto font-medium tabular-nums">
                    {number(Number(active[s.key] ?? 0))}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </ChartFrame>
  );
}

export { TrendChart };
