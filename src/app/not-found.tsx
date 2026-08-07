import Link from 'next/link';
import { ArrowLeft, Compass } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Logo } from '@/components/layout/logo';

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="container-page flex h-16 items-center">
        <Logo />
      </header>

      <main
        id="main"
        className="container-page flex flex-1 flex-col items-center justify-center gap-6 blueprint-grid py-20 text-center"
      >
        <p className="font-mono text-caption text-accent-text">HTTP 404</p>
        <h1 className="max-w-2xl text-display-xl">This page does not exist</h1>
        <p className="max-w-md text-body-lg text-muted-foreground">
          The link is wrong, or the page moved. The problem statements are the fastest way back to
          something useful.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/problems">
              <Compass aria-hidden />
              Browse the statements
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/">
              <ArrowLeft aria-hidden />
              Back home
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
