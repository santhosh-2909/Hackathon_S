'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Award, Sparkles } from 'lucide-react';

import { FalloutTeams } from './FalloutTeams';
import { FINALIST_TEAMS, type FinalistTeam } from './data';

/**
 * Premium "Innovation Finalist Cards" showcase.
 *
 * - `columns={1}` renders the compact single-column list used inside the
 *   floating cup popup (pit + cards only, no extra section chrome).
 * - `columns={2}` renders the full on-page showcase: the physics pit, a
 *   styled section header, the 2-column responsive card grid, and a suspense
 *   transition toward the Final Round / mystery Top 3.
 */
export function FinalistsLineup({
  showPit = true,
  columns = 1,
}: {
  showPit?: boolean;
  columns?: 1 | 2;
}) {
  return (
    <div className="flex flex-col gap-8">
      {showPit && <FalloutTeams teams={FINALIST_TEAMS} />}

      {columns === 2 ? (
        <Showcase />
      ) : (
        <ol className="flex w-full flex-col gap-3.5">
          {FINALIST_TEAMS.map((team, idx) => (
            <FinalistCard key={team.rank} team={team} index={idx} columns={1} />
          ))}
        </ol>
      )}
    </div>
  );
}

/** Full on-page showcase: header, subtle background, card grid, transition. */
function Showcase() {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-border bg-surface p-4 sm:p-6 lg:p-8">
      {/* subtle blueprint grid + soft radial glow */}
      <div
        className="blueprint-grid pointer-events-none absolute inset-0 opacity-[0.28] [mask-image:radial-gradient(ellipse_at_top,black,transparent_78%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.10),transparent_65%)] blur-2xl"
        aria-hidden
      />

      <div className="relative flex flex-col gap-8">
        <SectionHeader />

        <ol className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          {FINALIST_TEAMS.map((team, idx) => (
            <FinalistCard key={team.rank} team={team} index={idx} columns={2} />
          ))}
        </ol>

        <FinalRoundTransition />
      </div>
    </div>
  );
}

function SectionHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-64px' }}
      transition={{ duration: 0.42, ease: 'easeOut' }}
      className="flex flex-col items-center gap-2 text-center"
    >
      <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-border bg-accent-surface px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent-text">
        <Award className="size-3.5" aria-hidden />
        KIRA 2026 · Innovation Challenge
      </span>
      <h2 className="font-display text-h2 font-semibold text-foreground">
        Top 10 Finalists
      </h2>
      <p className="max-w-md text-body-sm text-muted-foreground">
        10 teams. One final round. Three winners.
      </p>
    </motion.div>
  );
}

/** Premium team identity badge — initials in a glowing, gradient tile. */
function TeamLogo({ team }: { team: FinalistTeam }) {
  const { monogram } = team;
  return (
    <div className="relative">
      {/* soft halo behind the badge */}
      <div
        className="absolute inset-0 -z-10 translate-y-1 rounded-2xl bg-cyan-400/0 blur-lg transition-colors duration-300 group-hover:bg-cyan-400/25"
        aria-hidden
      />
      <div className="relative grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 shadow-lg ring-1 ring-cyan-400/30 transition-all duration-300 group-hover:scale-[1.04] group-hover:ring-cyan-300/60">
        <span className="pointer-events-none absolute inset-0 rounded-2xl bg-[linear-gradient(180deg,rgba(255,255,255,0.14),transparent_45%)]" aria-hidden />
        <span className="font-display text-xl font-bold tracking-wide text-cyan-300 drop-shadow-sm">
          {monogram}
        </span>
        <span className="pointer-events-none absolute inset-x-3 bottom-1 h-px bg-cyan-400/50" aria-hidden />
      </div>
    </div>
  );
}

/**
 * One premium Innovation Finalist Card. Renders as a `motion.li` (scroll-in +
 * hover) when animated; as a plain `li` for the compact list or when the user
 * prefers reduced motion.
 */
function FinalistCard({
  team,
  index,
  columns,
}: {
  team: FinalistTeam;
  index: number;
  columns: 1 | 2;
}) {
  const reduced = useReducedMotion();
  const number = String(team.rank).padStart(2, '0');

  const inner = (
    <>
      {/* thin gradient hairline across the top */}
      <span
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
        aria-hidden
      />

      <div className="flex items-start justify-between text-xs">
        <span className="font-mono font-semibold tracking-widest text-muted-foreground">
          #{number}
        </span>
        <span className="uppercase tracking-[0.25em] text-muted-foreground/70">Finalist</span>
      </div>

      <div className="flex justify-center">
        <TeamLogo team={team} />
      </div>

      <div className="flex min-w-0 flex-col items-center gap-1.5 text-center">
        <h3 className="font-display text-h3 font-semibold text-foreground">{team.name}</h3>
        <p className="max-w-full text-body-sm leading-relaxed text-muted-foreground">
          {team.topic}
        </p>
      </div>

      {/* divider + generic, accurate tags */}
      <div className="mt-auto flex flex-col gap-3">
        <span className="h-px w-full bg-border" aria-hidden />
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="rounded-full border border-border bg-muted px-2.5 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-wider text-muted-foreground">
            KIRA 2026
          </span>
          <span className="rounded-full border border-accent-border bg-accent-surface px-2.5 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-wider text-accent-text">
            Finalist
          </span>
        </div>
      </div>

      {/* hover hint (decorative — no fake detail page) */}
      <span className="pointer-events-none absolute bottom-3 right-3 grid size-7 translate-y-2 place-items-center rounded-full border border-border bg-surface text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <ArrowRight className="size-3.5" aria-hidden />
      </span>
    </>
  );

  const className =
    'group relative flex h-full min-h-[19rem] flex-col gap-4 overflow-hidden rounded-3xl border border-border bg-surface p-6 shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg';

  if (columns === 1 || reduced) {
    return <li className={className}>{inner}</li>;
  }

  return (
    <motion.li
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-48px' }}
      transition={{ duration: 0.42, ease: 'easeOut', delay: (index % 4) * 0.05 }}
      className={className}
    >
      {inner}
    </motion.li>
  );
}

/** Suspense bridge from the Top 10 to the Final Round / mystery Top 3. */
function FinalRoundTransition() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-64px' }}
      transition={{ duration: 0.42, ease: 'easeOut' }}
      className="flex flex-col items-center gap-3 border-t border-border pt-8 text-center"
    >
      <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        <span>10 Finalists</span>
        <ArrowRight className="size-4 text-muted-foreground/60" aria-hidden />
        <span>Final Round</span>
        <ArrowRight className="size-4 text-muted-foreground/60" aria-hidden />
        <span className="text-amber-600 dark:text-amber-400">September 8</span>
        <ArrowRight className="size-4 text-muted-foreground/60" aria-hidden />
        <span>Top 3</span>
        <ArrowRight className="size-4 text-muted-foreground/60" aria-hidden />
        <span className="text-amber-600 dark:text-amber-400">
          🥇 ?&nbsp; 🥈 ?&nbsp; 🥉 ?
        </span>
      </div>
      <p className="flex items-center gap-1.5 font-display text-h4 font-semibold text-foreground">
        <Sparkles className="size-4 text-primary" aria-hidden />
        Who will rise to the top?
      </p>
    </motion.div>
  );
}
