import type { Metadata } from 'next';
import Link from 'next/link';
import { Clock, Mail, Users } from 'lucide-react';

import { initials } from '@/lib/utils';
import { formatDateTime } from '@/lib/format';
import { getActivity, getCurrentUser, getTrackedProblems } from '@/services/workspace';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { PageHeader } from '@/components/common/page-header';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { TrackStatusBadge } from '@/features/dashboard/status-badge';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'Your workspace profile and recent contributions.',
};

export default async function ProfilePage() {
  const [user, tracked, activity] = await Promise.all([
    getCurrentUser(),
    getTrackedProblems(),
    getActivity(5),
  ]);

  const owned = tracked.filter((item) => item.owner === user.name);
  const mine = activity.filter((event) => event.actor === user.name);

  return (
    <>
      <PageHeader
        title="Profile"
        breadcrumb={
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Overview</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Profile</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        }
        actions={
          <Button asChild variant="outline">
            <Link href="/dashboard/settings">Edit profile</Link>
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[20rem_1fr]">
        <Card className="h-fit">
          <CardContent className="flex flex-col items-start gap-4 p-6">
            <Avatar className="size-16">
              <AvatarFallback className="text-h4">{initials(user.name)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <h2 className="text-h3">{user.name}</h2>
              <p className="font-mono text-caption text-muted-foreground">@{user.handle}</p>
            </div>
            <Badge variant="accent">{user.role}</Badge>

            <dl className="mt-2 flex w-full flex-col gap-2.5 border-t border-border pt-4 text-body-sm">
              <div className="flex items-center gap-2">
                <dt className="sr-only">Email</dt>
                <Mail className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                <dd className="truncate">{user.email}</dd>
              </div>
              <div className="flex items-center gap-2">
                <dt className="sr-only">Team</dt>
                <Users className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                <dd>{user.team}</dd>
              </div>
              <div className="flex items-center gap-2">
                <dt className="sr-only">Timezone</dt>
                <Clock className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                <dd>{user.timezone}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Statements you own ({owned.length})</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {owned.map((item) => (
                <div key={item.id} className="flex flex-col gap-2">
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
                      className="max-w-32"
                      aria-label={`${item.checksPassed} of 5 checks cleared`}
                    />
                    <span className="text-caption text-muted-foreground">
                      {item.checksPassed}/5 checks
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your recent activity</CardTitle>
            </CardHeader>
            <CardContent>
              {mine.length === 0 ? (
                <p className="text-body-sm text-muted-foreground">
                  Nothing logged in the last week.
                </p>
              ) : (
                <ol className="flex flex-col gap-4">
                  {mine.map((event) => (
                    <li key={event.id} className="flex flex-col gap-0.5">
                      <p className="text-body-sm">
                        {event.action} <span className="text-muted-foreground">{event.target}</span>
                      </p>
                      <time dateTime={event.at} className="text-caption text-subtle-foreground">
                        {formatDateTime(event.at)}
                      </time>
                    </li>
                  ))}
                </ol>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
