'use client';

import { useRouter } from 'next/navigation';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
import { signUpSchema, type SignUpValues } from '@/features/auth/schemas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { PasswordField } from '@/features/auth/components/password-field';

const RULES = [
  { label: 'At least 10 characters', test: (v: string) => v.length >= 10 },
  { label: 'Upper and lowercase', test: (v: string) => /[a-z]/.test(v) && /[A-Z]/.test(v) },
  { label: 'A number', test: (v: string) => /[0-9]/.test(v) },
];

function SignUpForm() {
  const router = useRouter();
  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: '', email: '', password: '', confirm: '', terms: false },
    mode: 'onTouched',
  });

  // `useWatch` subscribes to one field; `form.watch()` returns a fresh function
  // each render, which defeats memoisation.
  const password = useWatch({ control: form.control, name: 'password' });
  const { isSubmitting } = form.formState;

  async function onSubmit(values: SignUpValues) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    toast.success('Workspace created', { description: `Signed in as ${values.name}.` });
    router.push('/dashboard');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full name</FormLabel>
              <FormControl>
                <Input autoComplete="name" placeholder="Aarthi Raman" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" autoComplete="email" placeholder="you@college.edu" {...field} />
              </FormControl>
              <FormDescription>Use your college address if your event requires it.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordField autoComplete="new-password" {...field} />
              </FormControl>
              {/* Live requirement checklist — progressive feedback beats a wall
                  of red after submit. */}
              <ul className="mt-1 flex flex-col gap-1">
                {RULES.map((rule) => {
                  const met = rule.test(password ?? '');
                  return (
                    <li
                      key={rule.label}
                      className={cn(
                        'flex items-center gap-1.5 text-caption',
                        met ? 'text-success-foreground' : 'text-muted-foreground',
                      )}
                    >
                      <Check
                        className={cn('size-3.5', met ? 'opacity-100' : 'opacity-30')}
                        aria-hidden
                      />
                      {rule.label}
                      <span className="sr-only">{met ? ' — met' : ' — not yet met'}</span>
                    </li>
                  );
                })}
              </ul>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <PasswordField autoComplete="new-password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem className="flex-row items-start gap-2.5">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="mt-0.5"
                />
              </FormControl>
              <div className="flex flex-col gap-1">
                <FormLabel className="font-normal text-muted-foreground">
                  I agree to the terms and the code of conduct
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="animate-spin" aria-hidden /> : null}
          {isSubmitting ? 'Creating workspace…' : 'Create workspace'}
        </Button>
      </form>
    </Form>
  );
}

export { SignUpForm };
