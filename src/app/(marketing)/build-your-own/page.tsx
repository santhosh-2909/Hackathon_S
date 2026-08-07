import type { Metadata } from 'next';
import { HeroSection } from '@/features/build-your-own/hero-section';
import { DiscoveryGuide } from '@/features/build-your-own/discovery-guide';
import { ValidationChecklist } from '@/features/build-your-own/validation-checklist';
import { InspirationDomains } from '@/features/build-your-own/inspiration-domains';
import { FrameworkEditor } from '@/features/build-your-own/framework-editor';
import { ResearchTips } from '@/features/build-your-own/research-tips';
import { SubmissionChecklist } from '@/features/build-your-own/submission-checklist';

export const metadata: Metadata = {
  title: 'Build Your Own Problem Statement',
  description:
    'Identify a real-world challenge around you, validate it with users, and turn it into a hackathon-ready problem statement.',
};

export default function BuildYourOwnPage() {
  return (
    <div className="relative overflow-hidden py-12 md:py-16 bg-white dark:bg-slate-950">
      {/* Background Grid & Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] [background-size:40px_40px] opacity-40 dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] dark:opacity-30" />
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-b from-blue-500/5 via-cyan-500/3 to-transparent blur-3xl" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Hero Section */}
        <HeroSection />

        {/* Section 1: Problem Discovery */}
        <DiscoveryGuide />

        {/* Section 2: Validation Checklist */}
        <ValidationChecklist />

        {/* Section 3: Inspiration Domains */}
        <InspirationDomains />

        {/* Section 4: Problem Statement Framework */}
        <FrameworkEditor />

        {/* Section 5: Research Tips */}
        <ResearchTips />

        {/* Section 6: Submission Checklist */}
        <SubmissionChecklist />
      </div>
    </div>
  );
}
