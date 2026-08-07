import type { Metadata } from 'next';
import Link from 'next/link';
import { Plus } from 'lucide-react';

import { getTrackedProblems } from '@/services/workspace';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/common/page-header';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { LibraryTable } from '@/features/dashboard/library-table';

export const metadata: Metadata = {
  title: 'Library',
  description: 'Problem statements your team is tracking, and how far each one has been validated.',
};

export default async function LibraryPage() {
  const rows = await getTrackedProblems();

  return (
    <>
      <PageHeader
        title="Library"
        description="Everything the team is tracking. A statement leaves this list when it ships or gets dropped — not when it gets hard."
        breadcrumb={
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Overview</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Library</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        }
        actions={
          <Button asChild>
            <Link href="/problems">
              <Plus aria-hidden />
              Track a statement
            </Link>
          </Button>
        }
      />

      <LibraryTable rows={rows} />
    </>
  );
}
