import { CalendarDays, Trophy } from 'lucide-react';

function FinalsDateHighlight() {
  return (
    <section className="border border-border bg-surface-inverse text-surface-inverse-foreground">
      <div className="container-page flex flex-col items-center gap-4 py-8 text-center md:flex-row md:justify-between md:gap-6 md:py-10 md:text-left">
        <div className="flex flex-col items-center gap-2 md:flex-row md:items-center md:gap-4">
          <span className="grid size-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-md">
            <Trophy className="size-6" aria-hidden="true" />
          </span>
          <div className="flex flex-col items-center gap-0.5 md:items-start">
            <span className="font-mono text-caption uppercase tracking-wider text-accent-on-inverse">
              Grand Finale · All teams invited
            </span>
            <p className="text-body-lg font-semibold">
              Finals date:{' '}
              <span className="inline-block rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-3 py-0.5 font-display text-base text-black shadow-sm sm:text-lg">
                <CalendarDays
                  className="mb-0.5 mr-1 inline size-4"
                  aria-hidden="true"
                />
                08 September 2026
              </span>
            </p>
          </div>
        </div>
        <p className="max-w-xs text-sm opacity-80">
          Lock the date — the winning pitches go live on stage at the Grand Finale.
        </p>
      </div>
    </section>
  );
}

export { FinalsDateHighlight };
