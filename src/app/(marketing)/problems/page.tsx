import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowRight, SearchX } from 'lucide-react';

import { getCatalogueCounts, getDomainCounts, listProblems } from '@/services/problems';
import { DOMAIN_IDS, type DomainId } from '@/types/problem';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { EmptyState } from '@/components/common/empty-state';
import { Skeleton, SkeletonRegion } from '@/components/ui/skeleton';
import { ProblemCard } from '@/features/problems/components/problem-card';
import { ProblemFilters } from '@/features/problems/components/problem-filters';
import { ProblemPagination } from '@/features/problems/components/problem-pagination';

export const metadata: Metadata = {
  title: 'Problem statements',
  description:
    'Ten researched SIH problem statements across Healthcare, AI/ML, Cybersecurity, Spacetech and Edutech — filtered for real-world impact, medium difficulty and weekend feasibility — plus a student innovation idea.',
  alternates: { canonical: '/problems' },
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const PER_PAGE = 6;

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function parseDomain(value: string | undefined): DomainId | 'all' {
  return value && (DOMAIN_IDS as readonly string[]).includes(value) ? (value as DomainId) : 'all';
}

export default async function ProblemsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const counts = await getDomainCounts();
  const catalogue = await getCatalogueCounts();
  const total = counts.reduce((sum, entry) => sum + entry.count, 0);

  return (
    <div className="container-page flex flex-col gap-10 py-12 md:py-16">
      <header className="flex max-w-3xl flex-col gap-3">
        <p className="overline text-accent-text">Problem statements</p>
        <h1 className="font-display text-display-lg">Problem statements worth your weekend</h1>
        <p className="text-body-lg text-muted-foreground">
          Compiled for third-year, first-time teams. Every entry passed the same filter: a real
          problem, medium difficulty, and buildable as a working prototype in the time box.{' '}
          {catalogue.official} are researched SIH statements — verify their PS numbers and dataset
          links on the live portal before locking a choice.{' '}
          {catalogue.student === 1 ? 'The last is a' : `${catalogue.student} are`} student
          innovation
          {catalogue.student === 1 ? ' idea' : ' ideas'}, marked as such and carrying no portal
          code.
        </p>
      </header>

      {/* The shape every entry below is written in, stated once before the list.
          It is the yardstick for reading them — and for writing your own — so it
          belongs above the grid rather than on a page you have to go find. */}
      <Card>
        <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:p-6">
          <div className="flex min-w-0 flex-col gap-2">
            <p className="overline text-muted-foreground">The shape of a good one</p>
            <p className="font-mono text-body-sm leading-relaxed">
              <span className="text-accent-text">[specific user]</span> struggles to{' '}
              <span className="text-accent-text">[do a task]</span> when{' '}
              <span className="text-accent-text">[context]</span>, because{' '}
              <span className="text-accent-text">[obstacle]</span>, which leads to{' '}
              <span className="text-accent-text">[negative consequence]</span>.
            </p>
          </div>
          <Button asChild variant="outline" size="sm" className="shrink-0">
            <Link href="/problem-statement">
              The five checks
              <ArrowRight aria-hidden />
            </Link>
          </Button>
        </CardContent>
      </Card>

      <ProblemFilters counts={counts} total={total} />

      {/* Keyed on the query so a filter change remounts the boundary and the
          skeleton shows instead of a stale list. */}
      <Suspense key={JSON.stringify(params)} fallback={<ResultsSkeleton />}>
        <Results params={params} />
      </Suspense>
    </div>
  );
}

async function Results({ params }: { params: Record<string, string | string[] | undefined> }) {
  const q = first(params.q) ?? '';
  const domain = parseDomain(first(params.domain));
  const sortParam = first(params.sort);
  const sort = (['relevance', 'year-desc', 'effort-asc', 'title-asc'] as const).includes(
    sortParam as never,
  )
    ? (sortParam as 'relevance' | 'year-desc' | 'effort-asc' | 'title-asc')
    : 'relevance';
  const page = Math.max(1, Number(first(params.page) ?? 1) || 1);

  const result = await listProblems({ q, domain, sort, page, perPage: PER_PAGE });

  const baseParams = new URLSearchParams();
  if (q) baseParams.set('q', q);
  if (domain !== 'all') baseParams.set('domain', domain);
  if (sort !== 'relevance') baseParams.set('sort', sort);

  if (result.total === 0) {
    return (
      <EmptyState
        variant="filtered"
        icon={<SearchX aria-hidden />}
        title="No statement matches those filters"
        description="Try a broader domain, or search for a ministry, a PS code, or a technology like 'CNN' or 'NLP'."
        actions={
          <Button asChild variant="outline">
            <Link href="/problems">Reset filters</Link>
          </Button>
        }
      />
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <p aria-live="polite" className="text-caption text-muted-foreground">
        Showing {result.items.length} of {result.total}{' '}
        {result.total === 1 ? 'statement' : 'statements'}
      </p>

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {result.items.map((problem, index) => (
          <li key={problem.slug} className="flex">
            <ProblemCard problem={problem} className="flex-1" priority={index < 3} />
          </li>
        ))}
      </ul>

      <ProblemPagination
        page={result.page}
        totalPages={result.totalPages}
        baseQuery={baseParams.toString()}
      />
    </div>
  );
}

function ResultsSkeleton() {
  return (
    <SkeletonRegion label="Loading results" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }, (_, index) => (
        <div key={index} className="overflow-hidden rounded-xl border border-border">
          <Skeleton className="aspect-16/9 rounded-none" />
          <div className="flex flex-col gap-3 p-5">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      ))}
    </SkeletonRegion>
  );
}
