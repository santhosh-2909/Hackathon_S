import { Trophy, Sparkles } from 'lucide-react';
import { Reveal } from '@/components/common/reveal';

/**
 * Announcement hero for the Final Round. The date — SEPTEMBER 8 — is the visual
 * focal point of the whole page: a glowing, premium treatment that stands out
 * from every other timeline date. Winners are never named here.
 */
function FinalRoundHero() {
  return (
    <section className="relative isolate overflow-hidden border border-border bg-surface-inverse text-surface-inverse-foreground">
      {/* soft ambient glows behind the date */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.35),transparent_60%)] blur-2xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.25),transparent_60%)] blur-2xl"
        aria-hidden
      />

      <div className="container-page flex flex-col items-center gap-6 py-16 text-center md:py-20">
        <Reveal>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/40 bg-amber-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-amber-200">
            <Trophy className="size-3.5" aria-hidden />
            The Moment of Truth
          </span>
        </Reveal>

        <Reveal delayStep={1} className="flex flex-col items-center gap-2">
          <span className="font-mono text-xs uppercase tracking-[0.5em] text-white/50">
            ───── The Final Round ─────
          </span>
          <h2 className="font-display text-display-2xl font-semibold text-white">
            FINAL ROUND
          </h2>
        </Reveal>

        <Reveal delayStep={2}>
          <div className="relative inline-flex flex-col items-center gap-1 rounded-2xl border border-violet-300/30 bg-white/5 px-6 py-4 shadow-e4 sm:px-10 sm:py-6">
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-violet-200">
              September
            </span>
            <span className="bg-gradient-to-b from-white via-violet-100 to-violet-300 bg-clip-text font-display text-[4rem] leading-none text-transparent drop-shadow-[0_0_18px_rgba(167,139,250,0.6)] sm:text-[6rem]">
              8
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-white/50">
              2026
            </span>
          </div>
        </Reveal>

        <Reveal delayStep={3} className="flex max-w-xl flex-col items-center gap-3">
          <p className="text-body-lg text-white/85">
            &ldquo;Who will rise to the top?&rdquo;
          </p>
          <p className="text-body-sm text-white/60">
            Only <span className="font-semibold text-amber-300">3</span> will become the winners.
            See you on September 8.
          </p>
        </Reveal>

        <Reveal delayStep={4}>
          <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.3em] text-amber-200/90">
            <Sparkles className="size-3.5" aria-hidden />
            The final round decides everything
          </span>
        </Reveal>
      </div>
    </section>
  );
}

export { FinalRoundHero };
