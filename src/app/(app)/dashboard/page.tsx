import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowRight, Plus } from 'lucide-react';

import { compactNumber, formatDateTime, percent } from '@/lib/format';
import { getDomainCounts } from '@/services/problems';
import {
  getActivity,
  getCurrentUser,
  getDashboardSummary,
  getTrackedProblems,
  getValidationMetrics,
} from '@/services/workspace';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Skeleton, SkeletonRegion } from '@/components/ui/skeleton';
import { PageHeader } from '@/components/common/page-header';
import { StatTile } from '@/components/charts/stat-tile';
import { TrendChart } from '@/components/charts/trend-chart';
import { BarChart } from '@/components/charts/bar-chart';
import { TrackStatusBadge } from '@/features/dashboard/status-badge';

export const metadata: Metadata = {
  title: 'Overview',
  description: 'Validation progress across every statement your team is tracking.',
};

export default async function DashboardPage() {
  const [user, summary] = await Promise.all([getCurrentUser(), getDashboardSummary()]);

  return (
    <>
      <PageHeader
        title={`Good to see you, ${user.name.split(' ')[0]}`}
        description={`${user.team} · every tracked statement, and how close each one is to a decision.`}
        actions={
          <>
            <Button asChild variant="outline">
              <Link href="/problems">Browse statements</Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard/library">
                <Plus aria-hidden />
                Track a statement
              </Link>
            </Button>
          </>
        }
      />

      <section aria-label="Key numbers" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile
          label="Tracked statements"
          value={compactNumber(summary.tracked)}
          delta={{ value: '+2', direction: 'up', period: 'vs last week' }}
          trend={[3, 4, 4, 5, 5, 6, 7, 7]}
        />
        <StatTile
          label="In validation"
          value={compactNumber(summary.validating)}
          hint="Interviews still being logged"
          trend={[1, 1, 2, 2, 3, 2, 2, 2]}
        />
        <StatTile
          label="Interviews logged"
          value={compactNumber(summary.interviewsLogged)}
          delta={{ value: '+5', direction: 'up', period: 'vs last week' }}
          trend={[2, 5, 4, 9, 7, 12, 10, 15]}
        />
        <StatTile
          label="Cleared all five checks"
          value={percent(summary.readyRatio)}
          delta={{ value: '+14%', direction: 'up', period: 'vs last week' }}
        />
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <Card>
          <CardContent className="p-5">
            <Suspense fallback={<ChartSkeleton />}>
              <ValidationTrend />
            </Suspense>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <Suspense fallback={<ChartSkeleton />}>
              <DomainSpread />
            </Suspense>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <Suspense fallback={<ListSkeleton rows={4} />}>
          <TrackingList />
        </Suspense>
        <Suspense fallback={<ListSkeleton rows={5} />}>
          <ActivityFeed />
        </Suspense>
      </div>
    </>
  );
}

async function ValidationTrend() {
  const data = await getValidationMetrics();
  return (
    <TrendChart
      title="Validation activity"
      subtitle="User interviews and de-risking spikes, by ISO week"
      data={data.map((point) => ({ ...point }))}
      series={[
        { key: 'interviews', label: 'Interviews', color: 'var(--chart-1)' },
        { key: 'spikes', label: 'Spikes', color: 'var(--chart-2)' },
      ]}
    />
  );
}

async function DomainSpread() {
  const counts = await getDomainCounts();
  return (
    <BarChart
      title="Directory by domain"
      subtitle="Statements available to track"
      valueLabel="Statements"
      data={counts.map((entry) => ({ label: entry.label, value: entry.count }))}
    />
  );
}

async function TrackingList() {
  const tracked = await getTrackedProblems();
  const active = tracked.filter((item) => item.status !== 'dropped').slice(0, 5);

  return (
    <Card>
      <CardHeader className="grid-cols-[1fr_auto] items-center">
        <CardTitle>Closest to a decision</CardTitle>
        <Button asChild variant="ghost" size="sm">
          <Link href="/dashboard/library">
            All
            <ArrowRight aria-hidden />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col">
        {active.map((item, index) => (
          <div key={item.id} className="flex flex-col gap-2 py-3.5 first:pt-0">
            <div className="flex items-start justify-between gap-3">
              <Link
                href={`/problems/${item.problemSlug}`}
                className="rounded-xs text-body-sm font-medium transition-colors hover:text-accent-text focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                {item.title}
              </Link>
              <TrackStatusBadge status={item.status} />
            </div>
            <div className="flex items-center gap-3">
              <Progress
                value={(item.checksPassed / 5) * 100}
                tone={item.checksPassed === 5 ? 'success' : 'accent'}
                aria-label={`${item.checksPassed} of 5 checks cleared`}
                className="max-w-40"
              />
              <span className="text-caption text-muted-foreground">
                {item.checksPassed}/5 checks · {item.validationInterviews} interviews
              </span>
            </div>
            {index < active.length - 1 ? <Separator className="mt-3.5" /> : null}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

async function ActivityFeed() {
  const events = await getActivity(6);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="flex flex-col gap-4">
          {events.map((event) => (
            <li key={event.id} className="flex gap-3">
              <span
                aria-hidden
                className="mt-1.5 size-1.5 shrink-0 rounded-full bg-border-strong"
              />
              <div className="flex flex-col gap-0.5">
                <p className="text-body-sm">
                  <strong className="font-medium">{event.actor}</strong> {event.action}{' '}
                  <span className="text-muted-foreground">{event.target}</span>
                </p>
                <time dateTime={event.at} className="text-caption text-subtle-foreground">
                  {formatDateTime(event.at)}
                </time>
              </div>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}

function ChartSkeleton() {
  return (
    <SkeletonRegion label="Loading chart" className="flex flex-col gap-4">
      <Skeleton className="h-5 w-40" />
      <Skeleton className="h-60 w-full" />
    </SkeletonRegion>
  );
}

function ListSkeleton({ rows }: { rows: number }) {
  return (
    <SkeletonRegion label="Loading list">
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-44" />
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {Array.from({ length: rows }, (_, index) => (
            <div key={index} className="flex flex-col gap-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </CardContent>
      </Card>
    </SkeletonRegion>
  );
}
