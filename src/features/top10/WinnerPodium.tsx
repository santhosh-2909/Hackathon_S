'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { HelpCircle, Trophy } from 'lucide-react';
import { Reveal } from '@/components/common/reveal';

const PODIUM = [
  {
    place: 2,
    emoji: '🥈',
    title: 'Mystery',
    order: 2,
    height: 'h-28 sm:h-32',
    pedestal: 'from-slate-300 to-slate-500 text-white',
    glow: 'bg-slate-300/40',
  },
  {
    place: 1,
    emoji: '🥇',
    title: 'Mystery',
    order: 1,
    height: 'h-40 sm:h-48',
    pedestal: 'from-amber-300 to-amber-600 text-white',
    glow: 'bg-amber-300/40',
  },
  {
    place: 3,
    emoji: '🥉',
    title: 'Mystery',
    order: 3,
    height: 'h-24 sm:h-28',
    pedestal: 'from-amber-600 to-amber-900 text-white',
    glow: 'bg-amber-700/40',
  },
] as const;

/**
 * The award-ceremony podium. Gold stands tallest in the centre, silver and
 * bronze flank it. Every spotlight is empty: only a glowing "?" marks the spot
 * a winner will occupy. Identities stay hidden until September 8.
 */
function WinnerPodium() {
  const reduced = useReducedMotion();

  return (
    <section className="border border-border bg-surface-inverse text-surface-inverse-foreground">
      <div className="container-page flex flex-col items-center gap-8 py-16 text-center md:py-20">
        <Reveal className="flex flex-col items-center gap-2">
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-white/50">
            ─── The Podium ───
          </span>
          <h2 className="font-display text-h2 font-semibold text-white">
            The Winner&apos;s Podium
          </h2>
          <p className="max-w-md text-body-sm text-white/60">
            Three spots. Three silhouettes. Nobody has claimed them yet.
          </p>
        </Reveal>

        <Reveal delayStep={1} className="w-full max-w-3xl">
          <div className="flex items-end justify-center gap-1 sm:gap-4">
            {PODIUM.map((p) => (
              <div key={p.place} className="flex flex-col items-center gap-2">
                {/* figure / ? standing on the pedestal */}
                <div className="grid place-items-center">
                  {reduced ? (
                    <div className="grid size-12 place-items-center rounded-full border border-white/20 bg-white/10 text-amber-300">
                      <HelpCircle className="size-6" aria-hidden />
                    </div>
                  ) : (
                    <motion.div
                      className="grid size-12 place-items-center rounded-full border border-white/20 bg-white/10 text-amber-300"
                      aria-hidden
                      animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.08, 1] }}
                      transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <HelpCircle className="size-6 drop-shadow-[0_0_10px_rgba(252,211,77,0.7)]" />
                    </motion.div>
                  )}
                  <span className="mt-1 text-2xl drop-shadow" aria-hidden>
                    {p.emoji}
                  </span>
                </div>

                {/* pedestal */}
                <div className="flex flex-col items-center">
                  <div
                    className={`relative w-20 overflow-hidden rounded-t-2xl bg-gradient-to-b sm:w-32 ${p.pedestal} ${p.height} flex flex-col items-center justify-start pt-3`}
                  >
                    <span
                      className="pointer-events-none absolute -top-8 left-1/2 h-16 w-16 -translate-x-1/2 rounded-full blur-2xl"
                      style={{ background: p.glow === 'bg-amber-700/40' ? undefined : undefined }}
                      aria-hidden
                    />
                    <span className="relative text-xs font-bold uppercase tracking-widest">
                      {p.title}
                    </span>
                  </div>
                  {/* base block */}
                  <div className="h-6 w-24 rounded-b-2xl bg-black/60 sm:w-36" aria-hidden />
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delayStep={2} className="flex flex-col items-center gap-1 text-center">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-amber-200/90">
            <Trophy className="size-3.5" aria-hidden />
            The winners are revealed on September 8
          </span>
          <p className="max-w-sm text-xs text-white/50">
            Until then, every name stays a question mark.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export { WinnerPodium };
