import { Suspense } from 'react';

import { siteConfig } from '@/config/site';
import { Hero } from '@/features/marketing/hero';
import { HyperspeedBackground } from '@/features/hyperspeed/HyperspeedBackground';
import { ProjectJourney } from '@/features/marketing/project-journey';
import { DomainMarquee } from '@/features/marketing/domain-marquee';
import { ProblemFramework } from '@/features/marketing/problem-framework';
import { ApproachTimeline } from '@/features/marketing/approach-timeline';
import { StackGuide } from '@/features/marketing/stack-guide';
import { DirectoryPreview } from '@/features/marketing/directory-preview';
import { CtaBand } from '@/features/marketing/cta-band';
import { FinalsDateHighlight } from '@/features/marketing/finals-date-highlight';
import { DirectoryPreviewSkeleton } from '@/features/marketing/directory-preview-skeleton';
import { FinalistsSheet } from '@/features/top10/FinalistsSheet';

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.url}/problems?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // Serialised from a literal we control — no user input reaches this string.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="relative isolate overflow-hidden rounded-[28px] border border-border shadow-lg">
        <HyperspeedBackground />
        <Hero />
      </section>
      <FinalsDateHighlight />
      <ProjectJourney />
      <DomainMarquee />
      <ProblemFramework />
      <ApproachTimeline />
      <StackGuide />
      {/* Streams in after the static bands so the directory never blocks first paint. */}
      <Suspense fallback={<DirectoryPreviewSkeleton />}>
        <DirectoryPreview />
      </Suspense>
      <CtaBand />
      <FinalistsSheet />
    </>
  );
}
