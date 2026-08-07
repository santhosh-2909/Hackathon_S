'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowUpDown, ExternalLink, LibraryBig, MoreHorizontal, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
import { formatDate } from '@/lib/format';
import { DOMAIN_BY_ID } from '@/constants/domains';
import type { TrackedProblem, TrackStatus } from '@/types/workspace';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { EmptyState } from '@/components/common/empty-state';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TrackStatusBadge } from '@/features/dashboard/status-badge';

type SortKey = 'title' | 'checks' | 'updated';

const STATUSES: (TrackStatus | 'all')[] = [
  'all',
  'exploring',
  'validating',
  'building',
  'shipped',
  'dropped',
];

/**
 * Client-side table. The dataset is small and fully loaded, so sorting and
 * filtering happen in memory — no round trip, no loading state, no flash.
 */
function LibraryTable({ rows }: { rows: TrackedProblem[] }) {
  const [query, setQuery] = React.useState('');
  const [status, setStatus] = React.useState<TrackStatus | 'all'>('all');
  const [sort, setSort] = React.useState<{ key: SortKey; dir: 'asc' | 'desc' }>({
    key: 'updated',
    dir: 'desc',
  });

  const filtered = React.useMemo(() => {
    const needle = query.trim().toLowerCase();
    const next = rows.filter((row) => {
      if (status !== 'all' && row.status !== status) return false;
      if (!needle) return true;
      return `${row.title} ${row.code ?? ''} ${row.owner}`.toLowerCase().includes(needle);
    });

    const direction = sort.dir === 'asc' ? 1 : -1;
    return next.sort((a, b) => {
      if (sort.key === 'title') return a.title.localeCompare(b.title) * direction;
      if (sort.key === 'checks') return (a.checksPassed - b.checksPassed) * direction;
      return (Date.parse(a.updatedAt) - Date.parse(b.updatedAt)) * direction;
    });
  }, [rows, query, status, sort]);

  const toggleSort = (key: SortKey) =>
    setSort((prev) =>
      prev.key === key ? { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' },
    );

  const sortState = (key: SortKey) =>
    sort.key === key ? (sort.dir === 'asc' ? 'ascending' : 'descending') : 'none';

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <Label htmlFor="library-search" className="sr-only">
            Filter tracked statements
          </Label>
          <Input
            id="library-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Filter by title, code or owner…"
          />
        </div>
        <div className="w-44">
          <Label htmlFor="library-status" className="sr-only">
            Status
          </Label>
          <Select value={status} onValueChange={(value) => setStatus(value as TrackStatus | 'all')}>
            <SelectTrigger id="library-status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STATUSES.map((value) => (
                <SelectItem key={value} value={value}>
                  {value === 'all' ? 'All statuses' : value[0]?.toUpperCase() + value.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          variant="filtered"
          icon={<LibraryBig aria-hidden />}
          title="Nothing matches those filters"
          description="Clear the search or pick a different status to see the rest of the library."
          actions={
            <Button
              variant="outline"
              onClick={() => {
                setQuery('');
                setStatus('all');
              }}
            >
              Clear filters
            </Button>
          }
        />
      ) : (
        <div className="rounded-xl border border-border bg-surface">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead scope="col" aria-sort={sortState('title')}>
                  <SortButton onClick={() => toggleSort('title')}>Statement</SortButton>
                </TableHead>
                <TableHead scope="col" className="hidden md:table-cell">
                  Domain
                </TableHead>
                <TableHead scope="col">Status</TableHead>
                <TableHead scope="col" aria-sort={sortState('checks')}>
                  <SortButton onClick={() => toggleSort('checks')}>Checks</SortButton>
                </TableHead>
                <TableHead scope="col" className="hidden lg:table-cell">
                  Owner
                </TableHead>
                <TableHead
                  scope="col"
                  aria-sort={sortState('updated')}
                  className="hidden sm:table-cell"
                >
                  <SortButton onClick={() => toggleSort('updated')}>Updated</SortButton>
                </TableHead>
                <TableHead scope="col">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="max-w-[22rem]">
                    <Link
                      href={`/problems/${row.problemSlug}`}
                      className="rounded-xs font-medium transition-colors hover:text-accent-text focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                    >
                      {row.title}
                    </Link>
                    {row.code ? (
                      <span className="mt-0.5 block font-mono text-[0.6875rem] text-subtle-foreground">
                        {row.code}
                      </span>
                    ) : null}
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground md:table-cell">
                    {DOMAIN_BY_ID[row.domain].label}
                  </TableCell>
                  <TableCell>
                    <TrackStatusBadge status={row.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={(row.checksPassed / 5) * 100}
                        tone={row.checksPassed === 5 ? 'success' : 'accent'}
                        className="w-14"
                        aria-label={`${row.checksPassed} of 5 checks cleared`}
                      />
                      <span className="text-caption text-muted-foreground tabular-nums">
                        {row.checksPassed}/5
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground lg:table-cell">
                    {row.owner}
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground sm:table-cell">
                    <time dateTime={row.updatedAt}>{formatDate(row.updatedAt)}</time>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          aria-label={`Actions for ${row.title}`}
                        >
                          <MoreHorizontal aria-hidden />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/problems/${row.problemSlug}`}>
                            <ExternalLink aria-hidden />
                            Open statement
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          variant="danger"
                          onSelect={() =>
                            toast('Removed from library', {
                              description: row.title,
                              action: {
                                label: 'Undo',
                                onClick: () => toast.success('Restored'),
                              },
                            })
                          }
                        >
                          <Trash2 aria-hidden />
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <p aria-live="polite" className="text-caption text-muted-foreground">
        {filtered.length} of {rows.length} tracked
      </p>
    </div>
  );
}

function SortButton({ children, className, ...props }: React.ComponentProps<'button'>) {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex items-center gap-1 rounded-xs font-medium transition-colors hover:text-foreground',
        'focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
        className,
      )}
      {...props}
    >
      {children}
      <ArrowUpDown className="size-3" aria-hidden />
    </button>
  );
}

export { LibraryTable };
