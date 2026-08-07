import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { Logo } from '@/components/layout/logo';
import { ThemeToggle } from '@/components/layout/theme-toggle';

/**
 * Split auth shell. The right panel is decorative and hidden below `lg` rather
 * than stacked, so the form is the first and only thing on a phone.
 */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <div className="flex flex-col">
        <header className="flex items-center justify-between gap-4 px-6 py-5 sm:px-10">
          <Logo />
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <Link
              href="/"
              className="inline-flex h-9 items-center gap-1.5 rounded-md px-3 text-body-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              <ArrowLeft className="size-4" aria-hidden />
              Back
            </Link>
          </div>
        </header>

        <main id="main" className="flex flex-1 items-center justify-center px-6 py-10 sm:px-10">
          <div className="w-full max-w-sm">{children}</div>
        </main>

        <footer className="px-6 py-6 sm:px-10">
          <p className="text-caption text-muted-foreground">
            Demo workspace — authentication is not wired to a backend.
          </p>
        </footer>
      </div>

      <aside
        aria-hidden
        className="relative hidden overflow-hidden border-l border-border bg-surface-inverse text-surface-inverse-foreground lg:block"
      >
        <div className="absolute inset-0 blueprint-grid opacity-[0.07]" />
        <div className="relative flex h-full flex-col justify-end gap-6 p-12">
          <p className="font-mono text-caption text-accent-on-inverse">
            mentor@hackathon:~/workshop $
          </p>
          <blockquote className="max-w-md text-display-lg">
            One persona. One pain. Three interviews. Then build.
          </blockquote>
          <p className="max-w-md text-body-sm opacity-70">
            The problem you choose is the highest-leverage decision of the whole build. Everything
            downstream is execution.
          </p>
        </div>
      </aside>
    </div>
  );
}
