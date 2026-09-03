'use client';

import { Trophy, Clock } from 'lucide-react';
import { Reveal } from '@/components/common/reveal';
import { useFinalRoundCountdown } from './useFinalRoundCountdown';

const UNITS = [
  { key: 'days', label: 'Days' },
  { key: 'hours', label: 'Hours' },
  { key: 'minutes', label: 'Minutes' },
  { key: 'seconds', label: 'Seconds' },
] as const;

/**
 * Live countdown band to the Final Round. Once the reveal date (Sept 8, 2026)
 * passes, the band flips to a "WINNERS REVEALED" state. In both states the Top 3
 * identities themselves are never shown here.
 */
function FinalRoundCountdown() {
  const { timeLeft, revealed } = useFinalRoundCountdown();

  return (
    <section className="border border-border bg-gradient-to-br from-[#1e1b4b] via-[#111638] to-[#070a14] text-surface-inverse-foreground">
      <div className="container-page flex flex-col items-center gap-6 py-12 text-center md:py-16">
        <Reveal className="flex flex-col items-center gap-2">
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-white/50">
            ─── Final Round · September 8, 2026 ───
          </span>
          <h2 className="font-display text-h2 font-semibold text-white">
            {revealed ? '🏆 Winners Revealed' : 'The Final Reveal'}
          </h2>
          <p className="max-w-md text-body-sm text-white/60">
            {revealed
              ? 'The producers are tallying the votes — the winning names drop now.'
              : 'The countdown to the moment of truth is already ticking.'}
          </p>
        </Reveal>

        {!revealed && (
          <Reveal delayStep={1} className="grid w-full max-w-md grid-cols-4 gap-2 sm:gap-3">
            {UNITS.map((u) => (
              <div
                key={u.key}
                className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur"
              >
                <span className="block font-display text-2xl font-semibold tabular-nums text-white sm:text-3xl">
                  {String(timeLeft[u.key]).padStart(2, '0')}
                </span>
                <span className="text-[0.6875rem] font-medium uppercase tracking-wider text-white/50">
                  {u.label}
                </span>
              </div>
            ))}
          </Reveal>
        )}

        <Reveal delayStep={2}>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-amber-200/90">
            {revealed ? <Trophy className="size-3.5" aria-hidden /> : <Clock className="size-3.5" aria-hidden />}
            {revealed ? 'The winners take the stage' : 'One stage. Three spots. Ten chances.'}
          </span>
        </Reveal>
      </div>
    </section>
  );
}

export { FinalRoundCountdown };
