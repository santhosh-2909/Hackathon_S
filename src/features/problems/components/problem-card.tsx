import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Clock, Lightbulb } from 'lucide-react';

import { cn } from '@/lib/utils';
import type { ProblemStatement } from '@/types/problem';
import { DATASET_LABELS, DIFFICULTY_LABELS, DOMAIN_BY_ID } from '@/constants/domains';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

const DIFFICULTY_VARIANT = {
  approachable: 'success',
  medium: 'warning',
  stretch: 'danger',
} as const;

interface ProblemCardProps {
  problem: ProblemStatement;
  className?: string;
  /** Renders the domain artwork. Off in dense list contexts. */
  withImage?: boolean;
  priority?: boolean;
}

/**
 * Directory card. The whole card is one link — the title carries the accessible
 * name via a stretched pseudo-element, so there is exactly one tab stop per card
 * rather than one per interactive-looking element.
 */
function ProblemCard({ problem, className, withImage = true, priority = false }: ProblemCardProps) {
  const domain = DOMAIN_BY_ID[problem.domain];

  return (
    <Card
      className={cn(
        'group relative overflow-hidden transition-[border-color,box-shadow,transform] duration-200 ease-[var(--ease-standard)]',
        'hover:-translate-y-0.5 hover:border-border-strong hover:shadow-e3',
        'focus-within:border-border-strong focus-within:shadow-e3',
        className,
      )}
    >
      {withImage ? (
        <div className="relative aspect-16/9 overflow-hidden border-b border-border bg-surface-sunken">
          <Image
            src={problem.image}
            alt=""
            fill
            priority={priority}
            sizes="(min-width: 64rem) 24rem, (min-width: 37.5rem) 45vw, 100vw"
            className="object-cover transition-transform duration-500 ease-[var(--ease-standard)] group-hover:scale-[1.03]"
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-1.5">
          {/* A student idea has no portal code, so the slot that normally shows
              one says what it is instead — the marking cannot be missed by
              anyone scanning the grid. */}
          {problem.origin === 'student-innovation' ? (
            <Badge variant="accent" size="sm">
              <Lightbulb aria-hidden />
              Student idea
            </Badge>
          ) : (
            <Badge variant="outline" size="sm" className="font-mono">
              {problem.code ?? `${problem.year} · code TBC`}
            </Badge>
          )}
          <Badge variant="neutral" size="sm">
            {domain.label}
          </Badge>
          <Badge variant={DIFFICULTY_VARIANT[problem.difficulty]} size="sm">
            {DIFFICULTY_LABELS[problem.difficulty]}
          </Badge>
        </div>

        <h3 className="text-h5">
          <Link
            href={`/problems/${problem.slug}`}
            className="rounded-xs after:absolute after:inset-0 after:content-[''] focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            {problem.title}
          </Link>
        </h3>

        <p className="line-clamp-3 text-body-sm text-muted-foreground">{problem.summary}</p>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-3">
          <span className="flex items-center gap-3 text-caption text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3.5" aria-hidden />
              <span className="sr-only">Vertical slice estimate: </span>~{problem.sliceHours}h slice
            </span>
            <span aria-hidden>·</span>
            <span>{DATASET_LABELS[problem.dataset]}</span>
          </span>
          <ArrowUpRight
            className="size-4 shrink-0 text-subtle-foreground transition-colors group-hover:text-accent-text"
            aria-hidden
          />
        </div>
      </div>
    </Card>
  );
}

export { ProblemCard };
