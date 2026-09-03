'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { HelpCircle, Medal } from 'lucide-react';
import { Reveal } from '@/components/common/reveal';

const MEDALS = [
  { place: 1, emoji: '🥇', label: 'Champion', ring: 'border-amber-300/40' },
  { place: 2, emoji: '🥈', label: 'Runner-up', ring: 'border-slate-300/40' },
  { place: 3, emoji: '🥉', label: 'Second runner-up', ring: 'border-amber-700/40' },
] as const;

/**
 * The Top 3 winners section. Identities are deliberately hidden: three
 * MYSTERY WINNER cards with a pulsing question mark, plus a short reveal-flow
 * strip (Top 10 → Final Round → Top 3 → Revealed). No real names appear.
 */
function MysteryTop3() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden border border-border bg-surface">
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.12),transparent_65%)] blur-2xl"
        aria-hidden
      />

      <div className="container-page flex flex-col items-center gap-10 py-16 text-center md:py-20">
        <Reveal className="flex flex-col items-center gap-2">
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-accent-text">
            ─── The Reveal ───
          </span>
          <h2 className="font-display text-h2 font-semibold text-foreground">
            🏆 Top 3 Winners
          </h2>
          <p className="max-w-md text-body-sm text-muted-foreground">
            Three finalists will rise. Only three will claim the podium.
            <br />
            <span className="font-semibold text-foreground">Who will they be?</span> Find out on
            September 8.
          </p>
        </Reveal>

        {/* reveal flow */}
        <Reveal delayStep={1} className="flex w-full max-w-2xl flex-wrap items-center justify-center gap-2 sm:gap-3">
          {['Top 10 Finalists', 'Final Round · Sep 8', 'Top 3', '???', 'Revealed'].map(
            (step, i, arr) => (
              <div key={step} className="flex items-center gap-2 sm:gap-3">
                <span
                  className={
                    i === arr.length - 1
                      ? 'rounded-full border border-amber-300/40 bg-amber-300/10 px-3 py-1 text-xs font-semibold text-amber-700 dark:text-amber-300'
                      : 'rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold text-muted-foreground'
                  }
                >
                  {step}
                </span>
                {i < arr.length - 1 && (
                  <span className="text-muted-foreground/60" aria-hidden>
                    →
                  </span>
                )}
              </div>
            ),
          )}
        </Reveal>

        {/* mystery cards */}
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
          {MEDALS.map((m, idx) => (
            <Reveal key={m.place} delayStep={idx + 1}>
              <div
                className={`flex flex-col items-center gap-3 rounded-3xl border ${m.ring} bg-gradient-to-b from-surface to-accent-surface/40 p-6 shadow-e4 transition-transform duration-300 hover:-translate-y-1`}
              >
                <span className="text-4xl drop-shadow" aria-hidden>
                  {m.emoji}
                </span>

                <div className="relative grid size-20 place-items-center rounded-2xl border border-border bg-[#0b1120] text-amber-300 shadow-inner">
                  {reduced ? (
                    <HelpCircle className="size-9" aria-hidden />
                  ) : (
                    <motion.div
                      aria-hidden
                      animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.05, 1] }}
                      transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                      className="flex items-center justify-center"
                    >
                      <HelpCircle className="size-9 drop-shadow-[0_0_10px_rgba(252,211,77,0.6)]" />
                    </motion.div>
                  )}
                </div>

                <div className="flex flex-col items-center gap-1">
                  <span className="font-display text-h4 font-semibold text-foreground">
                    Mystery Winner
                  </span>
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {m.label} · To Be Revealed
                  </span>
                </div>

                <span className="inline-flex items-center gap-1 rounded-full border border-border bg-surface px-2.5 py-0.5 text-[0.6875rem] font-semibold text-accent-text">
                  <Medal className="size-3" aria-hidden />
                  Revealed on Sept 8
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delayStep={2} className="max-w-lg text-body-sm text-muted-foreground">
          Nobody knows who will win yet — the final round decides everything.
        </Reveal>
      </div>
    </section>
  );
}

export { MysteryTop3 };
