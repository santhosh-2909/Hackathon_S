import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

function CtaBand() {
  return (
    <section className="border-t border-border bg-surface-inverse text-surface-inverse-foreground">
      <div className="container-page flex flex-col items-start gap-6 py-14 md:flex-row md:items-center md:justify-between md:py-16">
        <div className="flex max-w-xl flex-col gap-2">
          <p className="font-mono text-caption text-accent-on-inverse">$ stop planning</p>
          <h2 className="font-display text-display-lg">Start the spike.</h2>
          <p className="text-body-lg opacity-70">
            Pick a statement, run the five checks, talk to three people. Thirty minutes decides
            whether the next twenty hours are worth spending.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" variant="accent">
            <Link href="/build-your-own">
              Build your own idea
              <ArrowRight aria-hidden />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/20 bg-transparent text-inherit hover:bg-white/10 hover:text-inherit"
          >
            <Link href="/problems">Browse statements</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export { CtaBand };
