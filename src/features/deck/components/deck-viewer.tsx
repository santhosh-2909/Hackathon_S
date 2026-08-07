'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';

import { clamp, cn } from '@/lib/utils';
import { DECK_SLIDES } from '@/constants/deck-template';
import { Button } from '@/components/ui/button';
import { SlideCanvas, SlidePitfall } from '@/features/deck/components/slide-canvas';

/**
 * Slide viewer with a thumbnail rail.
 *
 * The rail is a real tablist: arrow keys move between slides, Home/End jump to
 * the ends, and only the active tab is in the tab order — the roving-tabindex
 * pattern, so a keyboard user tabs past seven thumbnails in one keystroke
 * instead of seven.
 */
function DeckViewer() {
  const [index, setIndex] = React.useState(0);
  const tabsRef = React.useRef<(HTMLButtonElement | null)[]>([]);
  const active = DECK_SLIDES[index] ?? DECK_SLIDES[0]!;

  const go = React.useCallback((next: number) => {
    const bounded = clamp(next, 0, DECK_SLIDES.length - 1);
    setIndex(bounded);
    tabsRef.current[bounded]?.focus();
  }, []);

  const onRailKeyDown = (event: React.KeyboardEvent) => {
    const keys: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowDown: index + 1,
      ArrowLeft: index - 1,
      ArrowUp: index - 1,
      Home: 0,
      End: DECK_SLIDES.length - 1,
    };
    const next = keys[event.key];
    if (next === undefined) return;
    event.preventDefault();
    go(next);
  };

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <SlideCanvas slide={active} className="shadow-e3" />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="flex items-center gap-1.5 text-caption text-muted-foreground">
            <Clock className="size-3.5" aria-hidden />
            Budget {active.seconds}s on this slide
          </p>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => go(index - 1)}
              disabled={index === 0}
              aria-label="Previous slide"
            >
              <ChevronLeft aria-hidden />
              Previous
            </Button>
            <span
              aria-live="polite"
              className="px-1 text-caption text-muted-foreground tabular-nums"
            >
              {index + 1} / {DECK_SLIDES.length}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => go(index + 1)}
              disabled={index === DECK_SLIDES.length - 1}
              aria-label="Next slide"
            >
              Next
              <ChevronRight aria-hidden />
            </Button>
          </div>
        </div>

        <SlidePitfall slide={active} />
      </div>

      <div
        role="tablist"
        aria-label="Slides"
        aria-orientation="vertical"
        onKeyDown={onRailKeyDown}
        className="no-scrollbar flex gap-3 overflow-x-auto lg:w-56 lg:shrink-0 lg:flex-col lg:overflow-visible"
      >
        {DECK_SLIDES.map((slide, i) => {
          const selected = i === index;
          return (
            <button
              key={slide.number}
              ref={(node) => {
                tabsRef.current[i] = node;
              }}
              type="button"
              role="tab"
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => setIndex(i)}
              className={cn(
                'flex w-40 shrink-0 flex-col gap-1 rounded-lg border p-2 text-left transition-colors lg:w-full',
                'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none',
                selected
                  ? 'border-accent-soft-border bg-accent-surface'
                  : 'border-border bg-surface hover:border-border-strong',
              )}
            >
              <span className="flex items-baseline gap-1.5">
                <span className="font-mono text-[0.6875rem] text-subtle-foreground">
                  {String(slide.number).padStart(2, '0')}
                </span>
                <span
                  className={cn(
                    'truncate text-caption font-medium',
                    selected ? 'text-accent-text' : 'text-foreground',
                  )}
                >
                  {slide.label}
                </span>
              </span>
              <span className="line-clamp-2 text-[0.6875rem] leading-snug text-muted-foreground">
                {slide.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export { DeckViewer };
