import * as React from 'react';
import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

interface StatTileProps extends React.ComponentProps<'div'> {
  label: string;
  value: string;
  /** Signed change vs a named period, e.g. `+3` and `vs last week`. */
  delta?: { value: string; direction: 'up' | 'down' | 'flat'; period: string };
  /** `true` when a rise is the good outcome. Drives delta colour. */
  upIsGood?: boolean;
  /** 12-point trend, drawn as a sparkline in the de-emphasis hue. */
  trend?: number[];
  hint?: string;
}

/**
 * Stat tile: label · value · delta · sparkline.
 *
 * The value uses proportional figures — `tabular-nums` gives every digit the
 * width of a zero, which reads loose at display sizes. Direction is carried by
 * an arrow as well as colour.
 */
function StatTile({
  label,
  value,
  delta,
  upIsGood = true,
  trend,
  hint,
  className,
  ...props
}: StatTileProps) {
  const good = delta ? (delta.direction === 'up' ? upIsGood : !upIsGood) : false;
  const DeltaIcon =
    delta?.direction === 'up' ? ArrowUpRight : delta?.direction === 'down' ? ArrowDownRight : Minus;

  return (
    <Card className={cn('gap-3 p-5', className)} {...props}>
      <p className="text-caption text-muted-foreground">{label}</p>

      <div className="flex items-end justify-between gap-4">
        <p className="text-display-lg leading-none font-semibold">{value}</p>
        {trend && trend.length > 1 ? <Sparkline points={trend} /> : null}
      </div>

      {delta ? (
        <p className="flex items-center gap-1.5 text-caption">
          <span
            className={cn(
              'inline-flex items-center gap-0.5 font-medium',
              delta.direction === 'flat'
                ? 'text-muted-foreground'
                : good
                  ? 'text-success-foreground'
                  : 'text-danger-foreground',
            )}
          >
            <DeltaIcon className="size-3.5" aria-hidden />
            {delta.value}
          </span>
          <span className="text-muted-foreground">{delta.period}</span>
        </p>
      ) : hint ? (
        <p className="text-caption text-muted-foreground">{hint}</p>
      ) : null}
    </Card>
  );
}

/**
 * 60×20 sparkline. Decorative by contract — the tile's value and delta carry the
 * meaning — so it is hidden from assistive tech rather than mislabelled.
 */
function Sparkline({ points }: { points: number[] }) {
  const width = 64;
  const height = 20;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const span = max - min || 1;

  const path = points
    .map((value, index) => {
      const x = (index / (points.length - 1)) * width;
      const y = height - ((value - min) / span) * height;
      return `${index === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(' ');

  const lastValue = points[points.length - 1] ?? 0;
  const lastX = width;
  const lastY = height - ((lastValue - min) / span) * height;

  return (
    <svg width={width} height={height} aria-hidden className="shrink-0 overflow-visible">
      <path
        d={path}
        fill="none"
        stroke="var(--chart-axis)"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={lastX}
        cy={lastY}
        r={3}
        fill="var(--chart-1)"
        stroke="var(--chart-surface)"
        strokeWidth={2}
      />
    </svg>
  );
}

export { StatTile };
