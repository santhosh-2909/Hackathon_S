import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { getFeaturedProblems } from '@/services/problems';
import { Section } from '@/components/common/section';
import { Reveal } from '@/components/common/reveal';
import { Button } from '@/components/ui/button';
import { ProblemCard } from '@/features/problems/components/problem-card';

/** Async server component — the data never reaches the client as JSON. */
async function DirectoryPreview() {
  const problems = await getFeaturedProblems(3);

  return (
    <Section
      eyebrow="Problem statements"
      heading="Statements that survived the filter"
      description="Researched across Healthcare, AI/ML, Cybersecurity, Spacetech and Edutech from SIH 2022–2025. Every entry is a real-world problem of medium difficulty that a first-time team can prototype inside the window."
      actions={
        <Button asChild variant="outline">
          <Link href="/problems">
            See all
            <ArrowRight aria-hidden />
          </Link>
        </Button>
      }
    >
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {problems.map((problem, index) => (
          <li key={problem.slug} className="flex">
            <Reveal delayStep={index} className="flex flex-1">
              <ProblemCard problem={problem} className="flex-1" />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export { DirectoryPreview };
