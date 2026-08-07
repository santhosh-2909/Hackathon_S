import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Compass } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { FrameworkCards } from '@/features/problem-statement/components/framework-cards';

export const metadata: Metadata = {
  title: 'Problem statement',
  description:
    'How to write a hackathon problem statement that describes pain rather than a solution: the five-slot template, worked strong and weak examples, and the five checks to run before you build.',
  alternates: { canonical: '/problem-statement' },
};

const SLOTS = [
  { label: 'Specific user', hint: 'One persona, not “everyone”' },
  { label: 'Do a task', hint: 'The thing they are trying to get done' },
  { label: 'Context', hint: 'When and where the pain shows up' },
  { label: 'Obstacle', hint: 'What actually blocks them' },
  { label: 'Negative consequence', hint: 'What it costs when they fail' },
];

export default function ProblemStatementPage() {
  return (
    <div className="container-page flex flex-col gap-12 py-10 md:py-14">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Problem statement</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* The template is the first thing on the page — it is the artefact the
          whole product exists to produce, so nothing precedes it. */}
      <header className="flex flex-col gap-6">
        <div className="flex max-w-3xl flex-col gap-3">
          <p className="overline text-accent-text">The workshop</p>
          <h1 className="font-display text-display-lg">
            A problem statement describes pain — not a solution
          </h1>
          <p className="text-body-lg text-muted-foreground">
            &ldquo;People waste time finding parking&rdquo; is a problem. &ldquo;A parking-map
            app&rdquo; is already a solution. One names something you can verify; the other assumes
            the answer before anyone has checked.
          </p>
        </div>

        <Card>
          <CardContent className="flex flex-col gap-5 p-6 sm:p-8">
            <p className="overline text-muted-foreground">The template</p>
            <p className="font-mono text-body leading-loose">
              <span className="text-accent-text">[specific user]</span> struggles to{' '}
              <span className="text-accent-text">[do a task]</span> when{' '}
              <span className="text-accent-text">[context]</span>, because{' '}
              <span className="text-accent-text">[obstacle]</span>, which leads to{' '}
              <span className="text-accent-text">[negative consequence]</span>.
            </p>

            <dl className="grid gap-x-6 gap-y-4 border-t border-border pt-5 sm:grid-cols-2 lg:grid-cols-5">
              {SLOTS.map((slot, index) => (
                <div key={slot.label} className="flex flex-col gap-1">
                  <dt className="flex items-baseline gap-2 text-body-sm font-medium">
                    <span className="font-mono text-[0.6875rem] text-subtle-foreground">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {slot.label}
                  </dt>
                  <dd className="text-caption text-muted-foreground">{slot.hint}</dd>
                </div>
              ))}
            </dl>

            <p className="text-body-sm text-muted-foreground">
              Fill all five. If one slot is empty, the statement is not ready — and no amount of
              building will fix that.
            </p>
          </CardContent>
        </Card>
      </header>

      <FrameworkCards />

      <section className="flex flex-col items-start gap-4 rounded-xl border border-border bg-surface-sunken p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="flex max-w-xl flex-col gap-1.5">
          <h2 className="text-h3">Now pick one worth solving</h2>
          <p className="text-body-sm text-muted-foreground">
            Ten researched SIH statements plus a student innovation idea, filtered for real-world
            impact and weekend feasibility — each already written as pain rather than as a solution.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <Button asChild variant="soft" size="lg">
            <Link href="/problems">
              <Compass aria-hidden />
              Browse the statements
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/playbook">
              The playbook
              <ArrowRight aria-hidden />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
