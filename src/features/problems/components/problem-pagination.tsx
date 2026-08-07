import { paginationRange } from '@/lib/utils';
import {
  Pagination,
  PaginationContent,
  PaginationEdge,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';

interface ProblemPaginationProps {
  page: number;
  totalPages: number;
  /** Current query string without `page`, e.g. `q=flood&domain=spacetech`. */
  baseQuery: string;
}

/**
 * Server-rendered pager: every control is a real link, so it works before
 * hydration and middle-click / open-in-new-tab behave normally.
 */
function ProblemPagination({ page, totalPages, baseQuery }: ProblemPaginationProps) {
  if (totalPages <= 1) return null;

  const href = (target: number) => {
    const params = new URLSearchParams(baseQuery);
    if (target > 1) params.set('page', String(target));
    const qs = params.toString();
    return qs ? `/problems?${qs}` : '/problems';
  };

  return (
    <Pagination className="justify-between sm:justify-center">
      <PaginationContent>
        <PaginationItem>
          <PaginationEdge direction="previous" href={href(page - 1)} disabled={page <= 1} />
        </PaginationItem>

        {paginationRange(page, totalPages).map((entry, index) => (
          <PaginationItem key={`${entry}-${index}`} className="hidden sm:block">
            {entry === '…' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href={href(entry)}
                isActive={entry === page}
                aria-label={`Page ${entry}`}
              >
                {entry}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem className="sm:hidden">
          <span className="px-2 text-caption text-muted-foreground">
            Page {page} of {totalPages}
          </span>
        </PaginationItem>

        <PaginationItem>
          <PaginationEdge direction="next" href={href(page + 1)} disabled={page >= totalPages} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export { ProblemPagination };
