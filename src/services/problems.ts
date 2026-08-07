import 'server-only';

import { PROBLEM_STATEMENTS } from '@/constants/problem-statements';
import { DOMAINS } from '@/constants/domains';
import type { DomainId, ProblemStatement } from '@/types/problem';

export interface ProblemQuery {
  q?: string;
  domain?: DomainId | 'all';
  sort?: 'relevance' | 'year-desc' | 'effort-asc' | 'title-asc';
  page?: number;
  perPage?: number;
}

export interface ProblemPage {
  items: ProblemStatement[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

/**
 * The whole catalogue is a static constant today. Every read goes through this
 * module so swapping in a database or CMS later touches one file — route
 * components never import the constant directly.
 */
export async function listProblems(query: ProblemQuery = {}): Promise<ProblemPage> {
  const { q = '', domain = 'all', sort = 'relevance', page = 1, perPage = 6 } = query;

  const needle = q.trim().toLowerCase();

  let items = PROBLEM_STATEMENTS.filter((problem) => {
    if (domain !== 'all' && problem.domain !== domain) return false;
    if (!needle) return true;
    return [
      problem.title,
      problem.summary,
      problem.organization,
      problem.theme,
      problem.code ?? '',
      ...problem.stack,
    ]
      .join(' ')
      .toLowerCase()
      .includes(needle);
  });

  items = sortProblems(items, sort);

  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * perPage;

  return {
    items: items.slice(start, start + perPage),
    total,
    page: safePage,
    perPage,
    totalPages,
  };
}

function sortProblems(items: ProblemStatement[], sort: NonNullable<ProblemQuery['sort']>) {
  const copy = [...items];
  switch (sort) {
    case 'year-desc':
      return copy.sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
    case 'effort-asc':
      return copy.sort((a, b) => a.sliceHours - b.sliceHours || a.title.localeCompare(b.title));
    case 'title-asc':
      return copy.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return copy;
  }
}

export async function getProblem(slug: string): Promise<ProblemStatement | undefined> {
  return PROBLEM_STATEMENTS.find((problem) => problem.slug === slug);
}

export async function getAllProblemSlugs(): Promise<string[]> {
  return PROBLEM_STATEMENTS.map((problem) => problem.slug);
}

export async function getFeaturedProblems(count = 3): Promise<ProblemStatement[]> {
  return PROBLEM_STATEMENTS.slice(0, count);
}

/**
 * Catalogue totals, split by origin.
 *
 * Copy reads these rather than hardcoding "ten" — the count went stale the
 * moment an eleventh entry was appended, in five places at once.
 */
export async function getCatalogueCounts() {
  const student = PROBLEM_STATEMENTS.filter((p) => p.origin === 'student-innovation').length;
  return {
    total: PROBLEM_STATEMENTS.length,
    official: PROBLEM_STATEMENTS.length - student,
    student,
  };
}

/** Counts per domain, used by the filter bar and the dashboard bar chart. */
export async function getDomainCounts(): Promise<{ id: DomainId; label: string; count: number }[]> {
  return DOMAINS.map((domain) => ({
    id: domain.id,
    label: domain.label,
    count: PROBLEM_STATEMENTS.filter((problem) => problem.domain === domain.id).length,
  }));
}

/** Adjacent statements for the prev/next pager on a detail page. */
export async function getProblemNeighbours(slug: string) {
  const index = PROBLEM_STATEMENTS.findIndex((problem) => problem.slug === slug);
  if (index === -1) return { previous: undefined, next: undefined };
  return {
    previous: index > 0 ? PROBLEM_STATEMENTS[index - 1] : undefined,
    next: index < PROBLEM_STATEMENTS.length - 1 ? PROBLEM_STATEMENTS[index + 1] : undefined,
  };
}
