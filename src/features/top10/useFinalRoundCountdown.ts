'use client';

import * as React from 'react';

/**
 * Final round reveal date: 08 September 2026, 00:00 local time.
 * Kept as a plain timestamp so the remaining-time is always derived from the
 * real clock — never hard-coded.
 */
const FINAL_ROUND_AT = new Date(2026, 8, 8).getTime();

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/** True once the final round date has passed or is now. */
export function isFinalRoundRevealed() {
  return Date.now() >= FINAL_ROUND_AT;
}

/**
 * Live countdown to the final round. Auto-calculates from the system clock and
 * ticks every second. Returns `revealed` so consumers can flip to a
 * "WINNERS REVEALED" state after 08 September 2026.
 */
export function useFinalRoundCountdown(): { timeLeft: TimeLeft; revealed: boolean } {
  const [timeLeft, setTimeLeft] = React.useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [revealed, setRevealed] = React.useState(false);

  React.useEffect(() => {
    const tick = () => {
      const now = Date.now();

      if (now >= FINAL_ROUND_AT) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setRevealed(true);
        return;
      }

      const difference = FINAL_ROUND_AT - now;
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    };

    tick();
    const interval = setInterval(tick, 1000);

    return () => clearInterval(interval);
  }, []);

  return { timeLeft, revealed };
}
