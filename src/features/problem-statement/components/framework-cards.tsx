import { Check, X } from 'lucide-react';

import { Reveal } from '@/components/common/reveal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

/**
 * The worked examples and the five checks.
 *
 * Shared by the landing-page section and the dedicated `/problem-statement`
 * page so the two can never disagree about what the checks are. Only the
 * surrounding heading changes between the two — hence no `<h1>`/`<h2>` here.
 */

export const CHECKS = [
  { name: 'User', good: 'One specific persona', poor: '"Everyone" or undefined' },
  { name: 'Pain', good: 'Concrete, observable', poor: 'Vague, abstract' },
  { name: 'Scope', good: 'Solvable in the time box', poor: 'Needs months or institutions' },
  { name: 'Evidence', good: 'A real observation', poor: 'Assumed or imagined' },
  { name: 'Framing', good: 'Describes the pain', poor: 'Names a solution too early' },
] as const;

function FrameworkCards() {
  return (
    <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr]">
      <Reveal className="flex">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Strong and weak, side by side</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <figure className="rounded-lg border border-success-border bg-success-surface p-4">
              <figcaption className="flex items-center gap-2 text-caption font-medium text-success-foreground">
                <Check className="size-4" aria-hidden />
                Strong
              </figcaption>
              <blockquote className="mt-2 text-body-sm">
                Night-shift nurses struggle to log patient vitals when moving between rooms, because
                systems require a desktop — leading to delayed, error-prone records.
              </blockquote>
            </figure>

            <figure className="rounded-lg border border-danger-border bg-danger-surface p-4">
              <figcaption className="flex items-center gap-2 text-caption font-medium text-danger-foreground">
                <X className="size-4" aria-hidden />
                Weak
              </figcaption>
              <blockquote className="mt-2 text-body-sm">Hospitals need better software.</blockquote>
              <p className="mt-2 text-caption text-muted-foreground">
                No user, no concrete pain, unbuildable in a weekend.
              </p>
            </figure>

            <div className="rounded-lg border border-border bg-surface-sunken p-4">
              <p className="text-h6">Proof it is real</p>
              <p className="mt-1.5 text-body-sm text-muted-foreground">
                Ask three target users. Zero yeses means pick a new problem. Existing workarounds —
                people already paying time or money to avoid the pain — are proof it is worth
                solving.
              </p>
            </div>
          </CardContent>
        </Card>
      </Reveal>

      <Reveal delayStep={1} className="flex">
        <Card className="flex-1">
          <CardHeader className="gap-2">
            <Badge variant="accent" className="w-fit">
              Five checks before you build
            </Badge>
            <CardTitle>Run every candidate through all five</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="flex flex-col">
              {CHECKS.map((check, index) => (
                <div
                  key={check.name}
                  className="grid grid-cols-[5.5rem_1fr] items-start gap-x-4 gap-y-1 border-t border-border py-3.5 first:border-t-0 first:pt-0"
                >
                  <dt className="flex items-baseline gap-2 text-body-sm font-medium">
                    <span className="font-mono text-[0.6875rem] text-subtle-foreground">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {check.name}
                  </dt>
                  <dd className="flex flex-col gap-1">
                    <span className="flex items-start gap-2 text-body-sm">
                      <Check
                        className="mt-0.5 size-3.5 shrink-0 text-success-foreground"
                        aria-hidden
                      />
                      <span className="sr-only">Good:</span>
                      {check.good}
                    </span>
                    <span className="flex items-start gap-2 text-body-sm text-muted-foreground">
                      <X className="mt-0.5 size-3.5 shrink-0 text-danger-foreground" aria-hidden />
                      <span className="sr-only">Poor:</span>
                      {check.poor}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </CardContent>
        </Card>
      </Reveal>
    </div>
  );
}

export { FrameworkCards };
