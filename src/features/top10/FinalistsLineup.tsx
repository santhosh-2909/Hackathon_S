import { FalloutTeams } from './FalloutTeams';
import { FINALIST_TEAMS, leftTeamColumn, rightTeamColumn, type FinalistTeam } from './data';

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

      <div
        className={
          columns === 2
            ? 'grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-8'
            : 'w-full'
        }
      >
        {columns === 2 ? (
          <>
            <ol className="flex flex-col gap-3.5">
              {leftTeamColumn.map((team) => (
                <TeamRow key={team.rank} team={team} />
              ))}
            </ol>
            <ol className="flex flex-col gap-3.5">
              {rightTeamColumn.map((team) => (
                <TeamRow key={team.rank} team={team} />
              ))}
            </ol>
          </>
        ) : (
          <ol className="flex w-full flex-col gap-3.5">
            {FINALIST_TEAMS.map((team) => (
              <TeamRow key={team.rank} team={team} />
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}

function TeamLogo({ team }: { team: FinalistTeam }) {
  const { monogram } = team;
  return (
    <div className="relative flex size-12 shrink-0 items-center justify-center rounded-xl bg-slate-900 shadow ring-1 ring-cyan-400/30 transition-transform duration-300 group-hover:scale-[1.03]">
      <span className="font-display text-lg font-bold tracking-wide text-cyan-300 drop-shadow-sm">
        {monogram}
      </span>
      <span className="pointer-events-none absolute inset-x-3 bottom-1 h-px bg-cyan-400/40" aria-hidden />
    </div>
  );
}

function TeamRow({ team }: { team: FinalistTeam }) {
  return (
    <li className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-4 text-center shadow-2xs transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg">
      <TeamLogo team={team} />
      <div className="flex min-w-0 flex-col items-center gap-1">
        <span className="text-body-lg font-semibold text-foreground">{team.name}</span>
        <span className="line-clamp-3 max-w-full text-center text-xs leading-snug text-muted-foreground">
          {team.topic}
        </span>
      </div>
    </li>
  );
}
