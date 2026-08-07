import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  Database,
  Building2,
  CalendarDays,
  Layers,
  Lightbulb,
} from 'lucide-react';

import { siteConfig } from '@/config/site';
import { getAllProblemSlugs, getProblem, getProblemNeighbours } from '@/services/problems';
import { DATASET_LABELS, DIFFICULTY_LABELS, DOMAIN_BY_ID } from '@/constants/domains';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

type Params = Promise<{ slug: string }>;

/** Every statement is known at build time, so all ten prerender as static HTML. */
export async function generateStaticParams() {
  const slugs = await getAllProblemSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const problem = await getProblem(slug);
  if (!problem) return { title: 'Statement not found' };

  const title = problem.code ? `${problem.code} — ${problem.title}` : problem.title;

  return {
    title,
    description: problem.summary,
    alternates: { canonical: `/problems/${problem.slug}` },
    openGraph: {
      type: 'article',
      title,
      description: problem.summary,
      url: `${siteConfig.url}/problems/${problem.slug}`,
      images: [{ url: problem.image, width: 1200, height: 630, alt: problem.title }],
    },
  };
}

export default async function ProblemDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const problem = await getProblem(slug);
  if (!problem) notFound();

  const { previous, next } = await getProblemNeighbours(slug);
  const domain = DOMAIN_BY_ID[problem.domain];
  const isStudentIdea = problem.origin === 'student-innovation';

  const facts = [
    { icon: Building2, label: 'Organisation', value: problem.organization },
    { icon: Layers, label: 'Official theme', value: problem.theme },
    { icon: CalendarDays, label: 'Edition', value: `SIH ${problem.year} · ${problem.category}` },
    { icon: Database, label: 'Dataset', value: DATASET_LABELS[problem.dataset] },
  ];

  return (
    <article className="container-page flex flex-col gap-10 py-8 md:py-12">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/problems">Problem statements</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="line-clamp-1">{problem.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <header className="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:items-start lg:gap-12">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {isStudentIdea ? (
              <Badge variant="accent">
                <Lightbulb aria-hidden />
                Student innovation idea
              </Badge>
            ) : (
              <Badge variant="outline" className="font-mono">
                {problem.code ?? 'PS code unconfirmed'}
              </Badge>
            )}
            <Badge variant="neutral">{domain.label}</Badge>
            <Badge variant="accent">{DIFFICULTY_LABELS[problem.difficulty]}</Badge>
          </div>
          <h1 className="font-display text-display-lg">{problem.title}</h1>
          <p className="text-body-lg text-muted-foreground">{problem.summary}</p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild>
              <Link href="/sign-up">Track this statement</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={`/problems?domain=${problem.domain}`}>
                More in {domain.label}
                <ArrowRight aria-hidden />
              </Link>
            </Button>
          </div>
        </div>

        <div className="relative aspect-4/3 overflow-hidden rounded-xl border border-border bg-surface-sunken">
          <Image
            src={problem.image}
            alt=""
            fill
            priority
            sizes="(min-width: 64rem) 32rem, 100vw"
            className="object-cover"
          />
        </div>
      </header>

      {isStudentIdea ? (
        <Alert variant="warning" icon={<Lightbulb aria-hidden />}>
          <AlertTitle>Student innovation idea — not an official problem statement</AlertTitle>
          <AlertDescription>
            This entry was written by a student, not published by SIH or any ministry. It carries no
            portal code and cannot be submitted against an official theme. It is here as a worked
            example of the method applied to an original idea — suitable for a college hackathon or
            an innovation competition.
          </AlertDescription>
        </Alert>
      ) : null}

      <dl className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {facts.map((fact) => (
          <div key={fact.label} className="flex flex-col gap-1 bg-surface p-4">
            <dt className="flex items-center gap-1.5 text-caption text-muted-foreground">
              <fact.icon className="size-3.5" aria-hidden />
              {fact.label}
            </dt>
            <dd className="text-body-sm font-medium">{fact.value}</dd>
          </div>
        ))}
      </dl>

      <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-12">
        <div className="flex flex-col gap-8">
          <Prose title="Background">{problem.background}</Prose>
          <Prose title="Problem statement">{problem.statement}</Prose>
          <Prose title={isStudentIdea ? 'Proposed solution' : 'Expected solution'}>
            {problem.expectedSolution}
          </Prose>

          {/* Sections that only student-innovation entries carry. Each renders
              only when present, so the ten official statements are unaffected. */}
          {problem.keyFeatures ? (
            <BulletProse title="Key features" items={problem.keyFeatures} />
          ) : null}
          {problem.expectedImpact ? (
            <Prose title="Expected impact">{problem.expectedImpact}</Prose>
          ) : null}
          {problem.innovationScope ? (
            <Prose title="Innovation scope">{problem.innovationScope}</Prose>
          ) : null}
          {problem.deliverables ? (
            <BulletProse title="Deliverables" items={problem.deliverables} />
          ) : null}

          <Prose title="Why it fits a first-time team">{problem.whyItFits}</Prose>
        </div>

        <aside className="flex flex-col gap-5">
          <Card>
            <CardHeader>
              <CardTitle>Dataset</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <Badge
                variant={problem.dataset === 'provided' ? 'success' : 'neutral'}
                className="w-fit"
              >
                {DATASET_LABELS[problem.dataset]}
              </Badge>
              <p className="text-body-sm text-muted-foreground">{problem.datasetNote}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>A stack that ships tonight</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <ul className="flex flex-wrap gap-1.5">
                {problem.stack.map((tool) => (
                  <li key={tool}>
                    <Badge variant="outline" size="sm" className="font-mono">
                      {tool}
                    </Badge>
                  </li>
                ))}
              </ul>
              <Separator />
              <p className="text-caption text-muted-foreground">
                Estimated vertical slice:{' '}
                <strong className="text-foreground">~{problem.sliceHours} hours</strong> for one
                complete path from UI to data and back.
              </p>
            </CardContent>
          </Card>

          <Alert variant="warning">
            <AlertTitle>Verify before you commit</AlertTitle>
            <AlertDescription>
              {isStudentIdea ? (
                <>
                  There is no portal entry to check this against — it is a student idea, so the
                  scope, the impact figures and the feasibility are claims to test, not facts to
                  cite. Validate the pain with three people in the target group before building, and
                  confirm your event actually accepts open innovation submissions.
                </>
              ) : (
                <>
                  Expected-solution text is informed guidance reconstructed from the official title,
                  theme and organisation — not verbatim portal text. SIH re-numbers and edits
                  statements between announcement and submission, so confirm the code and dataset on
                  the live portal.
                </>
              )}
            </AlertDescription>
          </Alert>
        </aside>
      </div>

      <nav
        aria-label="Adjacent statements"
        className="grid gap-3 border-t border-border pt-8 sm:grid-cols-2"
      >
        {previous ? (
          <Link
            href={`/problems/${previous.slug}`}
            className="group flex flex-col gap-1 rounded-lg border border-border p-4 transition-colors hover:border-border-strong focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <span className="flex items-center gap-1.5 text-caption text-muted-foreground">
              <ArrowLeft className="size-3.5" aria-hidden />
              Previous
            </span>
            <span className="text-body-sm font-medium group-hover:text-accent">
              {previous.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/problems/${next.slug}`}
            className="group flex flex-col items-end gap-1 rounded-lg border border-border p-4 text-right transition-colors hover:border-border-strong focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none sm:col-start-2"
          >
            <span className="flex items-center gap-1.5 text-caption text-muted-foreground">
              Next
              <ArrowRight className="size-3.5" aria-hidden />
            </span>
            <span className="text-body-sm font-medium group-hover:text-accent">{next.title}</span>
          </Link>
        ) : null}
      </nav>
    </article>
  );
}

function Prose({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-h3">{title}</h2>
      <p className="text-body text-muted-foreground">{children}</p>
    </section>
  );
}

/** Same section shell as `Prose`, for the list-shaped sections. */
function BulletProse({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-h3">{title}</h2>
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-body text-muted-foreground">
            <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
