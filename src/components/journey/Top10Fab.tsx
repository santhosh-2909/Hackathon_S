'use client';

import * as React from 'react';
import Link from 'next/link';
import { Trophy, ArrowRight, Medal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const FINALIST_TEAMS = [
  'A Clear',
  'Rescue Bite',
  'Byte Me',
  'Crisis CRUSHERS',
  'Alpha Squad',
  'Jarvis Unit',
  'Quadrix',
  'Squad Crew',
  'Tech Orbit',
  'StarkX',
];

/**
 * Floating "Top 10 Finalists" launcher on the journey page. A click opens a side
 * popup listing the ten selected teams and links through to the full /top-10 page.
 */
function Top10Fab() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            type="button"
            aria-label="View Top 10 Finalists"
            className={[
              'fixed bottom-6 right-6 z-30 hidden size-14 place-items-center rounded-full sm:grid',
              'border border-amber-300/60 bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-e3',
              'transition-[transform,box-shadow] duration-150 ease-[var(--ease-standard)]',
              'hover:scale-105 hover:shadow-e4 active:translate-y-px',
              'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none',
            ].join(' ')}
          >
            <Trophy className="size-5" aria-hidden />
          </button>
        </SheetTrigger>

        <SheetContent side="right" className="w-[min(22rem,90vw)]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Trophy className="size-5 text-amber-500 dark:text-amber-400" aria-hidden />
              Top 10 Finalists
            </SheetTitle>
            <SheetDescription>
              The ten teams advancing to the Grand Finale.
            </SheetDescription>
          </SheetHeader>

          <SheetBody className="flex flex-col gap-3">
            <ol className="flex flex-col gap-2">
              {FINALIST_TEAMS.map((name, index) => {
                const rank = index + 1;
                const isTop3 = rank <= 3;
                return (
                  <li
                    key={name}
                    className={[
                      'flex items-center gap-3 rounded-xl border px-3 py-2.5',
                      isTop3
                        ? 'border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/40'
                        : 'border-border bg-surface',
                    ].join(' ')}
                  >
                    <span
                      className={[
                        'flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold',
                        isTop3
                          ? 'bg-amber-400 text-white'
                          : 'bg-primary/10 text-primary',
                      ].join(' ')}
                    >
                      {rank}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-body-sm font-medium text-foreground">
                      {name}
                    </span>
                    {isTop3 && (
                      <Medal
                        className="size-4 shrink-0 text-amber-500 dark:text-amber-400"
                        aria-hidden
                      />
                    )}
                  </li>
                );
              })}
            </ol>

            <Button asChild variant="soft" className="mt-2 w-full">
              <Link href="/top-10" onClick={() => setOpen(false)}>
                View full list
                <ArrowRight aria-hidden />
              </Link>
            </Button>
          </SheetBody>
        </SheetContent>
      </Sheet>
    </>
  );
}

export { Top10Fab };
