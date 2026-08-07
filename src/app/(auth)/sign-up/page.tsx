import type { Metadata } from 'next';

import { SignUpForm } from '@/features/auth/components/sign-up-form';

export const metadata: Metadata = {
  title: 'Create a workspace',
  description: 'Create a Kira Learning workspace for your hackathon team.',
  robots: { index: false, follow: false },
};

export default function SignUpPage() {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-h1">Create a workspace</h1>
        <p className="text-body-sm text-muted-foreground">
          One workspace per team. Track statements, log validation interviews, and keep submissions
          in one place.
        </p>
      </header>

      <SignUpForm />
    </div>
  );
}
