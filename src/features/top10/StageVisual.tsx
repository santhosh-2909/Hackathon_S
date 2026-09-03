'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import { Reveal } from '@/components/common/reveal';

/**
 * A winner-announcement stage with a single anonymous, back-lit finalist
 * silhouette. The figure is never identifiable (no face, no details) — it is
 * deliberately a shadow waiting to be filled. Spotlight from above, stage
 * floor, soft fog, and a pulsing question mark drive the tension.
 */
function StageVisual() {
  const reduced = useReducedMotion();

  return (
    <section className="border border-border bg-[#070a14] text-surface-inverse-foreground">
      <div className="container-page flex flex-col items-center gap-6 py-14 text-center md:py-20">
        <Reveal className="flex flex-col items-center gap-2">
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-white/50">
            ─── On the Stage ───
          </span>
          <h2 className="font-display text-h2 font-semibold text-white">
            Who will be standing here?
          </h2>
          <p className="max-w-md text-body-sm text-white/60">
            One silhouette. Three podium spots. Ten teams.
            <br />
            Only the judges know who rises.
          </p>
        </Reveal>

        {/* the stage */}
        <Reveal delayStep={1} className="w-full max-w-3xl">
          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-b from-[#101631] via-[#0a0e1f] to-black shadow-e4">
            {/* spotlight from above */}
            <div
              className="pointer-events-none absolute left-1/2 top-0 h-full w-[60%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(246,201,60,0.28),transparent_62%)]"
              aria-hidden
            />

            <div className="relative flex aspect-[16/9] min-h-[260px] items-end justify-center p-6 sm:min-h-[300px]">
              {/* anonymous silhouette (head + shoulders), backlit */}
              <svg
                viewBox="0 0 200 160"
                className="relative z-10 h-[62%] max-h-[230px] w-auto drop-shadow-[0_-6px_24px_rgba(246,201,60,0.35)]"
                aria-hidden
              >
                <defs>
                  <linearGradient id="silhouette-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#0b1020" />
                    <stop offset="0.5" stopColor="#111830" />
                    <stop offset="1" stopColor="#05070d" />
                  </linearGradient>
                  <radialGradient id="halo" cx="0.5" cy="0.4" r="0.6">
                    <stop offset="0" stopColor="rgba(246,201,60,0.55)" />
                    <stop offset="1" stopColor="transparent" />
                  </radialGradient>
                </defs>
                {/* backlight halo behind the figure */}
                <ellipse cx="100" cy="70" rx="86" ry="66" fill="url(#halo)" />
                <path
                  d="M100 8c22 0 40 17 40 38 0 20-18 38-40 38S60 66 60 46c0-21 18-38 40-38Z"
                  fill="url(#silhouette-fill)"
                />
                <path
                  d="M32 160c3-34 18-52 40-58 10 10 24 15 28 15s18-5 28-15c22 6 37 24 40 58H32Z"
                  fill="url(#silhouette-fill)"
                />
              </svg>

              {/* pulsing question mark */}
              {!reduced && (
                <motion.div
                  className="absolute left-1/2 top-4 z-20 -translate-x-1/2 text-amber-300"
                  aria-hidden
                  animate={{ opacity: [0.55, 1, 0.55], scale: [1, 1.06, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <HelpCircle className="size-9 drop-shadow-[0_0_14px_rgba(246,201,60,0.7)] sm:size-11" />
                </motion.div>
              )}

              {/* stage floor */}
              <div className="absolute inset-x-0 bottom-0 z-0 h-10 bg-gradient-to-t from-black/80 to-transparent" aria-hidden />
            </div>

            {/* fog / glow sweep */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-[linear-gradient(to_top,rgba(167,139,250,0.12),transparent)]"
              aria-hidden
            />

            <div className="relative border-t border-white/10 bg-black/40 px-6 py-4 text-center">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/70">
                Revealed on September 8 · Winners TBA
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export { StageVisual };
