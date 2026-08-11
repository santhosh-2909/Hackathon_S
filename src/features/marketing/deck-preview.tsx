import Link from 'next/link';
import { ArrowUpRight, Download, FileText, Layers, Presentation, Timeline } from 'lucide-react';

import { WORKSHOP_DECK, WORKSHOP_PARTS } from '@/constants/workshop-deck';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

/**
 * Hero-side deck panel.
 *
 * Highlights the workshop deck and finals pitch download without turning the
 * hero into a menu. The stacked cards behind the panel are decoration only —
 * `aria-hidden`, and behind the live content.
 */
function DeckPreview() {
  const parts = WORKSHOP_PARTS.map((part) => part.title);

  return (
    <div className="relative w-full">
      <div
        aria-hidden
        className="absolute inset-x-4 -top-3 h-full rounded-2xl border border-border bg-surface/60"
      />
      <div
        aria-hidden
        className="absolute inset-x-2 -top-1.5 h-full rounded-2xl border border-border bg-surface/80"
      />

      <div className="relative flex flex-col gap-5 rounded-2xl border border-border bg-surface p-6 shadow-e3 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <p className="overline text-accent-text">{WORKSHOP_DECK.eyebrow}</p>
            <h2 className="font-display text-h2 leading-tight">{WORKSHOP_DECK.title}</h2>
          </div>
          <div className="grid size-10 shrink-0 place-items-center rounded-lg border border-accent-soft-border bg-accent-soft text-accent-soft-foreground">
            <Presentation className="size-5" aria-hidden />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-muted-foreground">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-500 border border-slate-200">
            Workshop deck
          </span>
          <span className="flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700 border border-blue-100">
            <Timeline aria-hidden />
            Workshop · Finals
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-1.5">
            <Badge variant="outline" size="sm">
              {WORKSHOP_DECK.slideCount} slides
            </Badge>
            <Badge variant="outline" size="sm">
              <Layers aria-hidden />
              {WORKSHOP_DECK.moduleCount} modules
            </Badge>
            <Badge variant="neutral" size="sm">
              .pptx · {WORKSHOP_DECK.fileSizeMb} MB
            </Badge>
          </div>
          <p className="text-caption text-muted-foreground">
            The workshop deck plus finals pitch support, all available as original
            PowerPoint downloads.
          </p>
        </div>

        <ol className="flex flex-col gap-2 border-t border-border pt-4">
          {parts.map((title, index) => (
            <li key={title} className="flex items-baseline gap-3 text-body-sm">
              <span className="font-mono text-[0.6875rem] text-subtle-foreground">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="text-muted-foreground">{title}</span>
            </li>
          ))}
        </ol>

        <div className="flex flex-wrap gap-2">
          <Button asChild variant="soft" size="md">
            <Link href="/workshop">
              View the deck
              <ArrowUpRight aria-hidden />
            </Link>
          </Button>
          <Button asChild variant="outline" size="md">
            <a href={WORKSHOP_DECK.fileHref} download>
              <Download aria-hidden />
              Download workshop deck
            </a>
          </Button>
          <Button asChild variant="outline" size="md">
            <a href={WORKSHOP_DECK.finalFileHref} download>
              <Download aria-hidden />
              Download final pitch deck
            </a>
          </Button>
        </div>

        <p className="flex flex-wrap items-center gap-2 border-t border-border pt-4 text-caption text-muted-foreground">
          <FileText className="size-3.5 shrink-0" aria-hidden />
          Downloads include the technical workshop deck and the final pitch deck.
        </p>
      </div>
    </div>
  );
}

export { DeckPreview };
