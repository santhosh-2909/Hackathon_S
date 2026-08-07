'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';

import type { CurrentUser } from '@/types/workspace';
import { Button } from '@/components/ui/button';
import { Input, Textarea } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const profileSchema = z.object({
  name: z.string().min(2, 'Enter your full name').max(80, 'That is too long'),
  handle: z
    .string()
    .min(3, 'At least 3 characters')
    .max(24, 'At most 24 characters')
    .regex(/^[a-z0-9_-]+$/, 'Lowercase letters, numbers, hyphen and underscore only'),
  bio: z.string().max(240, 'Keep it under 240 characters'),
});

type ProfileValues = z.infer<typeof profileSchema>;

function ProfileForm({ user }: { user: CurrentUser }) {
  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name,
      handle: user.handle,
      bio: 'Full-stack, demo owner. Believes the vertical slice is the only honest progress metric.',
    },
    mode: 'onTouched',
  });

  const { isSubmitting, isDirty } = form.formState;

  async function onSubmit(values: ProfileValues) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    form.reset(values);
    toast.success('Profile updated');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>How you appear to the rest of the workspace.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input autoComplete="name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="handle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Handle</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>Used in mentions and activity entries.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short bio</FormLabel>
                  <FormControl>
                    <Textarea rows={3} {...field} />
                  </FormControl>
                  <FormDescription>{field.value.length}/240 characters.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="justify-end border-t border-border pt-5">
            <Button type="submit" disabled={isSubmitting || !isDirty}>
              {isSubmitting ? <Loader2 className="animate-spin" aria-hidden /> : null}
              Save changes
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}

export { ProfileForm };
