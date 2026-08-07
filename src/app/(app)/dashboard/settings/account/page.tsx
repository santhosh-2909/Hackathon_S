import type { Metadata } from 'next';
import { Laptop, Smartphone } from 'lucide-react';

import { getCurrentUser } from '@/services/workspace';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Account settings',
  description: 'Email, password and active sessions.',
};

const SESSIONS = [
  {
    id: 's1',
    device: 'Chrome · Windows',
    location: 'Chennai, IN',
    lastSeen: 'Active now',
    current: true,
    icon: Laptop,
  },
  {
    id: 's2',
    device: 'Safari · iPhone',
    location: 'Chennai, IN',
    lastSeen: 'Yesterday, 22:10',
    current: false,
    icon: Smartphone,
  },
];

export default async function AccountSettingsPage() {
  const user = await getCurrentUser();

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Email</CardTitle>
          <CardDescription>Used for sign-in and every workspace notification.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2">
          <Label htmlFor="account-email">Email address</Label>
          <Input id="account-email" type="email" defaultValue={user.email} autoComplete="email" />
        </CardContent>
        <CardFooter className="justify-end border-t border-border pt-5">
          <Button>Update email</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active sessions</CardTitle>
          <CardDescription>Signing out a session revokes its token immediately.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col">
          {SESSIONS.map((session, index) => (
            <div key={session.id}>
              <div className="flex items-center gap-3 py-3 first:pt-0">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-border bg-surface-sunken text-muted-foreground">
                  <session.icon className="size-4" aria-hidden />
                </span>
                <div className="flex min-w-0 flex-col">
                  <span className="flex items-center gap-2 text-body-sm font-medium">
                    {session.device}
                    {session.current ? (
                      <Badge variant="success" size="sm">
                        This device
                      </Badge>
                    ) : null}
                  </span>
                  <span className="text-caption text-muted-foreground">
                    {session.location} · {session.lastSeen}
                  </span>
                </div>
                {!session.current ? (
                  <Button variant="ghost" size="sm" className="ml-auto">
                    Sign out
                  </Button>
                ) : null}
              </div>
              {index < SESSIONS.length - 1 ? <Separator /> : null}
            </div>
          ))}
        </CardContent>
      </Card>

      <Alert variant="danger">
        <AlertTitle>Delete workspace</AlertTitle>
        <AlertDescription className="flex flex-col items-start gap-3">
          <span>
            Deleting removes every tracked statement, validation note and submission for{' '}
            <strong className="text-foreground">{user.team}</strong>. This cannot be undone.
          </span>
          <Button variant="danger" size="sm">
            Delete workspace
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  );
}
