import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge conditional class names, letting later Tailwind utilities win over
 * earlier ones in the same group. Every component's `className` prop funnels
 * through this so consumers can always override.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const COMBINING_MARKS = /[̀-ͯ]/g;

/** Deterministic slug for routes and DOM ids. */
export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(COMBINING_MARKS, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-/, '')
    .replace(/-$/, '');
}

/** Two-letter monogram for avatar fallbacks. */
export function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? (parts.at(-1)?.[0] ?? '') : '';
  return (first + last).toUpperCase();
}

/** Clamp a number into an inclusive range. */
export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Build a page-number list with ellipses, e.g. [1, '…', 4, 5, 6, '…', 12].
 * Kept pure so both the server-rendered pager and tests can use it.
 */
export function paginationRange(current: number, total: number, siblings = 1): (number | '…')[] {
  const totalSlots = siblings * 2 + 5;
  if (total <= totalSlots) return Array.from({ length: total }, (_, i) => i + 1);

  const left = Math.max(current - siblings, 1);
  const right = Math.min(current + siblings, total);
  const showLeftDots = left > 2;
  const showRightDots = right < total - 1;

  if (!showLeftDots && showRightDots) {
    const count = siblings * 2 + 3;
    return [...Array.from({ length: count }, (_, i) => i + 1), '…', total];
  }

  if (showLeftDots && !showRightDots) {
    const count = siblings * 2 + 3;
    return [1, '…', ...Array.from({ length: count }, (_, i) => total - count + 1 + i)];
  }

  return [1, '…', ...Array.from({ length: right - left + 1 }, (_, i) => left + i), '…', total];
}
