import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Clock, Download, Presentation } from 'lucide-react';

import { DECK_META, DECK_SLIDES } from '@/constants/deck-template';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DeckViewer } from '@/features/deck/components/deck-viewer';

export const metadata: Metadata = {
  title: 'Pitch deck template',
  description:
    'A seven-slide hackathon pitch template: name the pain, prove it is real, show the magic moment, demo the slice, account for the build. Download as PowerPoint.',
  alternates: { canonical: '/deck' },
};

export default function DeckPage() {
  const budget = DECK_SLIDES.reduce((sum, slide) => sum + slide.seconds, 0);

  return (
    <div className="container-page flex flex-col gap-10 py-10 md:py-14">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Pitch deck template</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <header className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-10">
        <div className="flex max-w-2xl flex-col gap-3">
          <p className="overline text-accent-text">Pitch template</p>
          <h1 className="font-display text-display-lg">{DECK_META.title}</h1>
          <p className="text-body-lg text-muted-foreground">{DECK_META.subtitle}</p>
          <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-accent-text">
            <Presentation className="size-4" aria-hidden />
            <span>Round 1 · Round 2 · Finals</span>
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <Badge variant="outline">
              <Presentation aria-hidden />
              {DECK_SLIDES.length} slides
            </Badge>
            <Badge variant="outline">
              <Clock aria-hidden />
              {Math.round(budget / 60)} min budgeted
            </Badge>
            <Badge variant="neutral">.pptx · 16:9</Badge>
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <Button asChild variant="soft" size="lg">
            {/* A route handler, not a client route — `download` plus a plain
                anchor keeps it working with JS disabled. */}
            <a href="/deck/download" download>
              <Download aria-hidden />
              Download .pptx
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/problems">
              Pick a statement
              <ArrowRight aria-hidden />
            </Link>
          </Button>
        </div>
      </header>

      <DeckViewer />

      <section aria-labelledby="timing-budget" className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 id="timing-budget" className="text-h3">
            Timing budget
          </h2>
          <p className="text-body-sm text-muted-foreground">
            Five minutes, allocated before you rehearse. The demo gets almost a third of it because
            it is the only slide that proves anything.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-surface">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead scope="col">Slide</TableHead>
                <TableHead scope="col" className="hidden sm:table-cell">
                  Has to prove
                </TableHead>
                <TableHead scope="col" className="text-right">
                  Seconds
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {DECK_SLIDES.map((slide) => (
                <TableRow key={slide.number}>
                  <TableCell className="font-medium whitespace-nowrap">
                    <span className="font-mono text-[0.6875rem] text-subtle-foreground">
                      {String(slide.number).padStart(2, '0')}
                    </span>{' '}
                    {slide.label}
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground sm:table-cell">
                    {slide.purpose}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">{slide.seconds}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>Total</TableCell>
                <TableCell className="hidden sm:table-cell" />
                <TableCell className="text-right tabular-nums">{budget}s</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </section>

      <Alert variant="info">
        <AlertTitle>Square brackets are slots, not copy</AlertTitle>
        <AlertDescription>
          Every <code className="font-mono text-caption">[bracketed]</code> phrase is a blank for
          your project. The &ldquo;filled in&rdquo; line under each slide is a worked example from
          the workshop — replace it, do not present it. Speaker notes in the downloaded file carry
          the timing budget and the failure mode for each slide.
        </AlertDescription>
      </Alert>
    </div>
  );
}
