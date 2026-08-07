import type { Metadata } from 'next';
import Link from 'next/link';
import { Code2, ExternalLink, FilePlus2, Inbox } from 'lucide-react';

import { formatDate } from '@/lib/format';
import { getSubmissions } from '@/services/workspace';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { EmptyState } from '@/components/common/empty-state';
import { PageHeader } from '@/components/common/page-header';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { SubmissionStageBadge } from '@/features/dashboard/status-badge';

export const metadata: Metadata = {
  title: 'Submissions',
  description: 'Drafts, review status and shipped submissions.',
};

export default async function SubmissionsPage() {
  const submissions = await getSubmissions();

  return (
    <>
      <PageHeader
        title="Submissions"
        description="One submission per statement. The MVP is the submission — if it is not in the demo, it does not belong here."
        breadcrumb={
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Overview</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Submissions</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        }
        actions={
          <Button>
            <FilePlus2 aria-hidden />
            New submission
          </Button>
        }
      />

      {submissions.length === 0 ? (
        <EmptyState
          icon={<Inbox aria-hidden />}
          title="No submissions yet"
          description="A submission opens once a statement clears all five checks. Start with the library."
          actions={
            <Button asChild>
              <Link href="/dashboard/library">Open the library</Link>
            </Button>
          }
        />
      ) : (
        <ul className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {submissions.map((submission) => (
            <li key={submission.id} className="flex">
              <Card className="flex-1">
                <CardContent className="flex flex-1 flex-col gap-4 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-h5">{submission.title}</h2>
                    <SubmissionStageBadge stage={submission.stage} />
                  </div>

                  <dl className="flex flex-col gap-1.5 text-caption">
                    <div className="flex gap-2">
                      <dt className="w-20 shrink-0 text-muted-foreground">Statement</dt>
                      <dd>
                        <Link
                          href={`/problems/${submission.problemSlug}`}
                          className="rounded-xs underline underline-offset-4 transition-colors hover:text-accent-text"
                        >
                          View statement
                        </Link>
                      </dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="w-20 shrink-0 text-muted-foreground">Submitted</dt>
                      <dd>
                        {submission.submittedAt ? (
                          <time dateTime={submission.submittedAt}>
                            {formatDate(submission.submittedAt)}
                          </time>
                        ) : (
                          <span className="text-muted-foreground">Not yet</span>
                        )}
                      </dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="w-20 shrink-0 text-muted-foreground">Reviewer</dt>
                      <dd>
                        {submission.reviewer ?? (
                          <span className="text-muted-foreground">Unassigned</span>
                        )}
                      </dd>
                    </div>
                  </dl>

                  <Separator className="mt-auto" />

                  <div className="flex flex-wrap gap-2">
                    {submission.repoUrl ? (
                      <Button asChild variant="outline" size="sm">
                        <a href={submission.repoUrl} target="_blank" rel="noreferrer noopener">
                          <Code2 aria-hidden />
                          Repo
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      </Button>
                    ) : null}
                    {submission.demoUrl ? (
                      <Button asChild variant="outline" size="sm">
                        <a href={submission.demoUrl} target="_blank" rel="noreferrer noopener">
                          <ExternalLink aria-hidden />
                          Demo
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      </Button>
                    ) : null}
                    {!submission.repoUrl && !submission.demoUrl ? (
                      <p className="text-caption text-muted-foreground">
                        No links yet — add a repo and a deployed demo before the freeze.
                      </p>
                    ) : null}
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
