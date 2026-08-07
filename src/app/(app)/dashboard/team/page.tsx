import type { Metadata } from 'next';
import { MailCheck } from 'lucide-react';

import { formatDate } from '@/lib/format';
import { initials } from '@/lib/utils';
import { getTeamMembers } from '@/services/workspace';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { PageHeader } from '@/components/common/page-header';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { InviteDialog } from '@/features/dashboard/invite-dialog';

export const metadata: Metadata = {
  title: 'Team',
  description: 'Members, roles and pending invitations for your workspace.',
};

const ROLE_VARIANT = {
  owner: 'accent',
  maintainer: 'info',
  member: 'neutral',
  mentor: 'outline',
} as const;

export default async function TeamPage() {
  const members = await getTeamMembers();
  const pending = members.filter((member) => member.status === 'invited');

  return (
    <>
      <PageHeader
        title="Team"
        description="Five people is the practical ceiling for a hackathon team. Past that, coordination costs more than the extra hands return."
        breadcrumb={
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Overview</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Team</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        }
        actions={<InviteDialog />}
      />

      {pending.length > 0 ? (
        <p className="flex items-center gap-2 rounded-lg border border-info-border bg-info-surface px-4 py-2.5 text-body-sm">
          <MailCheck className="size-4 shrink-0 text-info-foreground" aria-hidden />
          {pending.length} invitation{pending.length === 1 ? '' : 's'} still pending.
        </p>
      ) : null}

      <div className="rounded-xl border border-border bg-surface">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead scope="col">Member</TableHead>
              <TableHead scope="col" className="hidden md:table-cell">
                Focus
              </TableHead>
              <TableHead scope="col">Role</TableHead>
              <TableHead scope="col" className="hidden sm:table-cell">
                Joined
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="size-8">
                      <AvatarFallback>{initials(member.name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium">{member.name}</span>
                      <span className="text-caption text-muted-foreground">{member.email}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden text-muted-foreground md:table-cell">
                  {member.focus}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <Badge variant={ROLE_VARIANT[member.role]} size="sm">
                      {member.role}
                    </Badge>
                    {member.status === 'invited' ? (
                      <Badge variant="warning" size="sm">
                        Invited
                      </Badge>
                    ) : null}
                  </div>
                </TableCell>
                <TableCell className="hidden text-muted-foreground sm:table-cell">
                  <time dateTime={member.joinedAt}>{formatDate(member.joinedAt)}</time>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
