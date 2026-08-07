import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Section } from '@/components/common/section';
import { Button } from '@/components/ui/button';
import { FrameworkCards } from '@/features/problem-statement/components/framework-cards';

/**
 * Landing-page section. The same cards live at `/problem-statement`, which is
 * where the nav sends people — this is the scroll-through version for readers
 * working down the page, and it links onward rather than repeating the detail.
 */
function ProblemFramework() {
  return (
    <Section
      id="the-problem"
      eyebrow="Problem statement"
      heading="A problem statement describes pain — not a solution"
      description={
        <>
          &ldquo;People waste time finding parking&rdquo; is a problem. &ldquo;A parking-map
          app&rdquo; is already a solution. One names something you can verify; the other assumes
          the answer before anyone has checked.
        </>
      }
      actions={
        <Button asChild variant="outline">
          <Link href="/problem-statement">
            Open the full guide
            <ArrowRight aria-hidden />
          </Link>
        </Button>
      }
    >
      <FrameworkCards />
    </Section>
  );
}

export { ProblemFramework };
