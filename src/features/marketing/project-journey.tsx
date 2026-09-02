'use client';

import * as React from 'react';
import { RoadmapBackground } from '@/components/journey/RoadmapBackground';
import { HeroSection } from '@/components/journey/HeroSection';
import { Timeline } from '@/components/journey/Timeline';
import { Top10Fab } from '@/components/journey/Top10Fab';

export function ProjectJourney() {
  return (
    <section className="relative overflow-hidden py-12 md:py-20 isolate">
      {/* SaaS Background (Hairline Grid + Subtle Gradient Wash) */}
      <RoadmapBackground />

      <div className="relative z-10">
        {/* Hero Section */}
        <HeroSection />

        {/* Master Linear/Stripe Style Timeline Roadmap */}
        <Timeline />
      </div>

      {/* Floating Top 10 Finalists launcher */}
      <Top10Fab />
    </section>
  );
}
