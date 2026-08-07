import { AlertTriangle, Quote } from 'lucide-react';

import { cn } from '@/lib/utils';
import type { DeckSlide } from '@/types/deck';
import { DECK_SLIDES } from '@/constants/deck-template';

/**
 * One slide, drawn at a locked 16:9 so what is on screen is what lands in
 * PowerPoint. Type scales with the container rather than the viewport
 * (`cqw` units against a container query) so the same component renders
 * correctly as a full-bleed slide and as the small hero thumbnail.
 */
function SlideCanvas({
  slide,
  variant = 'full',
  className,
}: {
  slide: DeckSlide;
  variant?: 'full' | 'thumb';
  className?: string;
}) {
  const thumb = variant === 'thumb';

  return (
    <article
      className={cn(
        '@container relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-surface',
        className,
      )}
      aria-label={`Slide ${slide.number} of ${DECK_SLIDES.length}: ${slide.label}`}
    >
      <div className="flex h-full flex-col gap-[2cqw] p-[4.5cqw]">
        <header className="flex items-baseline justify-between gap-4">
          <p className="overline text-[1.5cqw] text-accent-text">{slide.label}</p>
          <p className="font-mono text-[1.4cqw] text-subtle-foreground">
            {String(slide.number).padStart(2, '0')} / {String(DECK_SLIDES.length).padStart(2, '0')}
          </p>
        </header>

        <h3 className="font-display text-[4.6cqw] leading-[1.08] text-foreground">{slide.title}</h3>

        {!thumb ? (
          <p className="text-[1.85cqw] leading-snug text-muted-foreground">{slide.purpose}</p>
        ) : null}

        <ul className="mt-[0.5cqw] flex flex-col gap-[1.4cqw]">
          {slide.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-[1.6cqw] text-[2.1cqw] leading-snug">
              <span
                aria-hidden
                className="mt-[0.85cqw] size-[0.7cqw] shrink-0 rounded-full bg-accent"
              />
              <span className="text-foreground">{bullet}</span>
            </li>
          ))}
        </ul>

        {!thumb && slide.example ? (
          <p className="mt-auto flex gap-[1.6cqw] rounded-[1cqw] bg-surface-sunken p-[2.2cqw] text-[1.75cqw] leading-snug text-muted-foreground">
            <Quote
              className="mt-[0.3cqw] size-[2cqw] shrink-0 text-subtle-foreground"
              aria-hidden
            />
            <span>
              <span className="font-medium text-foreground">Filled in: </span>
              {slide.example}
            </span>
          </p>
        ) : null}
      </div>
    </article>
  );
}

/** The pitfall lives beside the slide, never on it — it is guidance, not content. */
function SlidePitfall({ slide, className }: { slide: DeckSlide; className?: string }) {
  return (
    <div
      className={cn(
        'flex gap-3 rounded-lg border border-warning-border bg-warning-surface p-4',
        className,
      )}
    >
      <AlertTriangle className="mt-0.5 size-4 shrink-0 text-warning-foreground" aria-hidden />
      <p className="text-body-sm">
        <span className="font-medium">What kills this slide: </span>
        <span className="text-muted-foreground">{slide.pitfall}</span>
      </p>
    </div>
  );
}

export { SlideCanvas, SlidePitfall };
