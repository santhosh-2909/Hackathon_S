'use client';

import * as React from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const CHANNELS = [
  {
    id: 'review',
    label: 'Review notes',
    help: 'A mentor comments on one of your submissions.',
    default: true,
  },
  {
    id: 'validation',
    label: 'Validation milestones',
    help: 'A tracked statement reaches three interviews or clears all five checks.',
    default: true,
  },
  {
    id: 'team',
    label: 'Team changes',
    help: 'Someone joins, leaves, or an invitation expires.',
    default: true,
  },
  {
    id: 'digest',
    label: 'Weekly digest',
    help: 'One email on Monday summarising the week.',
    default: false,
  },
  {
    id: 'product',
    label: 'Product updates',
    help: 'New directory entries and workshop material.',
    default: false,
  },
];

function NotificationsForm() {
  const [values, setValues] = React.useState<Record<string, boolean>>(() =>
    Object.fromEntries(CHANNELS.map((channel) => [channel.id, channel.default])),
  );
  const [saving, setSaving] = React.useState(false);

  async function save() {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setSaving(false);
    toast.success('Notification preferences saved');
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email notifications</CardTitle>
        <CardDescription>
          Account and security emails are always sent and cannot be turned off.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col">
        {CHANNELS.map((channel, index) => (
          <div key={channel.id}>
            <div className="flex items-start justify-between gap-4 py-3 first:pt-0">
              <div className="flex flex-col gap-0.5">
                <Label htmlFor={`notify-${channel.id}`}>{channel.label}</Label>
                <p className="text-caption text-muted-foreground">{channel.help}</p>
              </div>
              <Switch
                id={`notify-${channel.id}`}
                checked={values[channel.id] ?? false}
                onCheckedChange={(checked) =>
                  setValues((prev) => ({ ...prev, [channel.id]: checked }))
                }
              />
            </div>
            {index < CHANNELS.length - 1 ? <Separator /> : null}
          </div>
        ))}
      </CardContent>
      <CardFooter className="justify-end border-t border-border pt-5">
        <Button onClick={save} disabled={saving}>
          {saving ? 'Saving…' : 'Save preferences'}
        </Button>
      </CardFooter>
    </Card>
  );
}

export { NotificationsForm };
