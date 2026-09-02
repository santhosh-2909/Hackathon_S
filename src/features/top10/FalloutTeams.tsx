'use client';

import FallingText from './FallingText';

interface FalloutTeam {
  name: string;
  topic: string;
}

/**
 * Interactive hero for the Top 10 finals page. All ten team names live in one
 * single physics area so every chip can drift freely anywhere across the box.
 * Each name is its own framed, draggable chip on a black background —
 * hover/click to fling the names around as they fall and tumble.
 */
export function FalloutTeams({ teams }: { teams: FalloutTeam[] }) {
  const units = teams.map((t) => t.name);

  return (
    <section className="relative h-[30rem] w-full overflow-hidden rounded-[28px] border border-white/10 bg-[#0b1120]">
      {/* Faint indigo/cyan accent glow to tie into the site palette. */}
      <div className="pointer-events-none absolute -left-20 -top-24 size-80 rounded-full bg-indigo-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-16 size-80 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="pointer-events-none absolute inset-x-0 top-4 z-10 flex flex-col items-center gap-1 text-center">
        <p className="overline text-white/50">Kira 2026 · Innovation Challenge</p>
        <h1 className="px-4 font-display text-2xl font-semibold text-white md:text-3xl">
          Meet the Top 10 Finalists
        </h1>
      </div>

      <div className="absolute inset-x-0 bottom-0 top-14 px-4 pb-4">
        <FallingText
          units={units}
          highlightWords={units}
          highlightClass="highlighted"
          trigger="hover"
          backgroundColor="transparent"
          wireframes={false}
          gravity={0.56}
          fontSize="1.4rem"
          mouseConstraintStiffness={0.9}
          className="text-white"
        />
      </div>
    </section>
  );
}
