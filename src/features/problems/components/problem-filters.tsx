'use client';

import * as React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { DOMAINS } from '@/constants/domains';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ProblemFiltersProps {
  counts: { id: string; label: string; count: number }[];
  total: number;
}

const SORTS = [
  { value: 'relevance', label: 'Curated order' },
  { value: 'year-desc', label: 'Newest first' },
  { value: 'effort-asc', label: 'Fastest slice' },
  { value: 'title-asc', label: 'A–Z' },
];

/**
 * Filters write to the URL rather than to component state, so a filtered view is
 * shareable, bookmarkable and survives a refresh — and the server component
 * below re-renders from the query string alone.
 */
function ProblemFilters({ counts, total }: ProblemFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeDomain = searchParams.get('domain') ?? 'all';
  const activeSort = searchParams.get('sort') ?? 'relevance';
  const activeQuery = searchParams.get('q') ?? '';

  const [query, setQuery] = React.useState(activeQuery);
  const [syncedQuery, setSyncedQuery] = React.useState(activeQuery);
  const [isPending, startTransition] = React.useTransition();

  // Keep the field in sync when the URL changes from elsewhere — back button, a
  // "clear filters" press, a command-palette jump. Adjusting during render is
  // the supported pattern for deriving state from a changed prop; an effect here
  // would render once with the stale value first.
  if (activeQuery !== syncedQuery) {
    setSyncedQuery(activeQuery);
    setQuery(activeQuery);
  }

  const commit = React.useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(updates)) {
        if (value === null || value === '' || value === 'all') params.delete(key);
        else params.set(key, value);
      }
      // Any filter change invalidates the current page offset.
      params.delete('page');
      const qs = params.toString();
      startTransition(() => router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false }));
    },
    [pathname, router, searchParams],
  );

  // Debounce keystrokes so typing does not push one history entry per character.
  React.useEffect(() => {
    if (query === activeQuery) return;
    const timer = setTimeout(() => commit({ q: query }), 300);
    return () => clearTimeout(timer);
  }, [query, activeQuery, commit]);

  const hasFilters = activeDomain !== 'all' || activeSort !== 'relevance' || activeQuery !== '';

  return (
    <div className="flex flex-col gap-4" data-pending={isPending || undefined}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <Label htmlFor="problem-search" className="sr-only">
            Search problem statements
          </Label>
          <div className="relative">
            <Search
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-subtle-foreground"
              aria-hidden
            />
            <Input
              id="problem-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by title, ministry, PS code or stack…"
              className="h-10 pl-9"
            />
          </div>
        </div>

        <div className="flex items-end gap-3">
          <div className="w-44">
            <Label htmlFor="problem-sort" className="sr-only">
              Sort
            </Label>
            <Select value={activeSort} onValueChange={(value) => commit({ sort: value })}>
              <SelectTrigger id="problem-sort" className="h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SORTS.map((sort) => (
                  <SelectItem key={sort.value} value={sort.value}>
                    {sort.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {hasFilters ? (
            <Button
              variant="ghost"
              size="md"
              className="h-10"
              onClick={() => commit({ q: null, domain: null, sort: null })}
            >
              <X aria-hidden />
              Clear
            </Button>
          ) : null}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <FilterChip
          label="All domains"
          count={total}
          active={activeDomain === 'all'}
          onSelect={() => commit({ domain: null })}
        />
        {DOMAINS.map((domain) => (
          <FilterChip
            key={domain.id}
            label={domain.label}
            count={counts.find((c) => c.id === domain.id)?.count ?? 0}
            active={activeDomain === domain.id}
            onSelect={() => commit({ domain: domain.id })}
          />
        ))}
      </div>
    </div>
  );
}

function FilterChip({
  label,
  count,
  active,
  onSelect,
}: {
  label: string;
  count: number;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={cn(
        'inline-flex h-8 items-center gap-2 rounded-full border px-3 text-body-sm',
        'transition-colors duration-150 ease-[var(--ease-standard)]',
        'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none',
        active
          ? 'border-transparent bg-primary text-primary-foreground'
          : 'border-border bg-surface text-muted-foreground hover:border-border-strong hover:text-foreground',
      )}
    >
      {label}
      <span
        className={cn(
          'font-mono text-[0.6875rem]',
          active ? 'opacity-70' : 'text-subtle-foreground',
        )}
      >
        {count}
      </span>
    </button>
  );
}

export { ProblemFilters };
