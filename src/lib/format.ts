/** Formatting helpers shared by charts, tables and stat tiles. */

const COMPACT = new Intl.NumberFormat('en-IN', { notation: 'compact', maximumFractionDigits: 1 });
const PLAIN = new Intl.NumberFormat('en-IN');
const PERCENT = new Intl.NumberFormat('en-IN', { style: 'percent', maximumFractionDigits: 0 });

/** 1,284 below 10k; 12.9K above. Used for stat-tile values. */
export function compactNumber(value: number) {
  return Math.abs(value) < 10_000 ? PLAIN.format(value) : COMPACT.format(value);
}

export function number(value: number) {
  return PLAIN.format(value);
}

export function percent(ratio: number) {
  return PERCENT.format(ratio);
}

/**
 * Absolute date, always. Relative strings ("2 days ago") drift between server
 * and client render and produce a hydration mismatch.
 */
export function formatDate(iso: string, opts: Intl.DateTimeFormatOptions = {}) {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
    ...opts,
  }).format(new Date(iso));
}

export function formatDateTime(iso: string) {
  return formatDate(iso, { hour: '2-digit', minute: '2-digit', hour12: false });
}

/** Axis ticks round to clean numbers: 0 / 5 / 10 / 15. */
export function niceTicks(max: number, count = 4): number[] {
  if (max <= 0) return [0];
  const rawStep = max / count;
  const magnitude = 10 ** Math.floor(Math.log10(rawStep));
  const normalized = rawStep / magnitude;
  const step = (normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10) * magnitude;
  const top = Math.ceil(max / step) * step;
  const ticks: number[] = [];
  for (let value = 0; value <= top + step / 2; value += step) ticks.push(Number(value.toFixed(6)));
  return ticks;
}
