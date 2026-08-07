import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Download, Layers, Presentation } from 'lucide-react';

import { WORKSHOP_DECK, WORKSHOP_PARTS } from '@/constants/workshop-deck';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export const metadata: Metadata = {
  title: 'Technical workshop deck',
  description:
    'The Technical Hackathon Playbook — a 72-slide mentor workshop across 18 modules: foundations, problem statements, ideation, MVP scoping, stack selection, AI integration, testing, security, deployment and judging.',
  alternates: { canonical: '/workshop' },
};

export default function WorkshopPage() {
  return (
    <div className="container-page flex flex-col gap-10 py-10 md:py-14">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Workshop deck</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <header className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-10">
        <div className="flex max-w-2xl flex-col gap-3">
          <p className="overline text-accent-text">{WORKSHOP_DECK.eyebrow}</p>
          <h1 className="font-display text-display-lg">{WORKSHOP_DECK.title}</h1>
          <p className="text-body-lg text-muted-foreground">
            The full mentor track, start to finish — {WORKSHOP_DECK.moduleCount} modules across{' '}
            {WORKSHOP_DECK.partCount} parts, ending where it started:{' '}
            <em>{WORKSHOP_DECK.closingLine}</em>
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <Badge variant="outline">
              <Presentation aria-hidden />
              {WORKSHOP_DECK.slideCount} slides
            </Badge>
            <Badge variant="outline">
              <Layers aria-hidden />
              {WORKSHOP_DECK.moduleCount} modules
            </Badge>
            <Badge variant="neutral">.pptx · {WORKSHOP_DECK.fileSizeMb} MB · 16:9</Badge>
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <Button asChild variant="soft" size="lg">
            <a href={WORKSHOP_DECK.fileHref} download>
              <Download aria-hidden />
              Download the deck
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href={WORKSHOP_DECK.finalFileHref} download>
              <Download aria-hidden />
              Download Finals pitch
            </a>
          </Button>
        </div>
      </header>

      <Alert variant="info">
        <AlertTitle>Slides open in PowerPoint, Keynote or Google Slides</AlertTitle>
        <AlertDescription>
          The deck is image-heavy, so it is offered as the original file rather than re-rendered in
          the browser — nothing is lost in translation that way. The outline below is extracted from
          the file itself, so it always matches what you download.
        </AlertDescription>
      </Alert>

      <div className="flex flex-col gap-10">
        {WORKSHOP_PARTS.map((part) => (
          <section key={part.number} className="flex flex-col gap-4">
            <div className="flex items-baseline gap-3">
              <span className="font-display text-h2 leading-none text-accent-text">
                {part.number}
              </span>
              <div className="flex flex-col">
                <p className="overline text-subtle-foreground">
                  Part {part.number} of {WORKSHOP_DECK.partCount}
                </p>
                <h2 className="text-h3">{part.title}</h2>
              </div>
            </div>

            <ul className="grid gap-4 md:grid-cols-2">
              {part.modules.map((module) => (
                <li key={module.code} className="flex">
                  <Card className="flex-1">
                    <CardContent className="flex flex-col gap-3 p-5">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-h5">
                          <span className="font-mono text-caption text-subtle-foreground">
                            {module.code}
                          </span>{' '}
                          {module.title}
                        </h3>
                        <Badge variant="neutral" size="sm" className="shrink-0 font-mono">
                          {module.slides[0]}–{module.slides[1]}
                        </Badge>
                      </div>
                      <ul className="flex flex-col gap-1.5">
                        {module.topics.map((topic) => (
                          <li
                            key={topic}
                            className="flex gap-2.5 text-body-sm text-muted-foreground"
                          >
                            <span
                              aria-hidden
                              className="mt-2 size-1 shrink-0 rounded-full bg-accent"
                            />
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
