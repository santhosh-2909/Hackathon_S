/**
 * The milestone dates are stored as display strings like "08 September 2026".
 * Parse them back into a Date so the countdown can be computed exactly and
 * live, rather than relying on the hard-coded `remainingDays` values in the
 * milestone data.
 */

const MONTHS: Record<string, number> = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};

/** Parse "08 September 2026" (or "5 August 2026") into a local Date. */
export function parseMilestoneDate(dateString: string): Date | null {
  const match = dateString.trim().match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/);
  if (!match) return null;

  const day = parseInt(match[1]!, 10);
  const month = MONTHS[match[2]!];
  const year = parseInt(match[3]!, 10);

  if (month === undefined || Number.isNaN(day) || Number.isNaN(year)) return null;
  return new Date(year, month, day, 23, 59, 59, 999);
}

/** Whole days remaining from now until the milestone date. Never negative. */
export function getDaysRemaining(dateString: string, now: Date = new Date()): number {
  const target = parseMilestoneDate(dateString);
  if (!target) return 0;

  const diff = target.getTime() - now.getTime();
  if (diff <= 0) return 0;

  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}
