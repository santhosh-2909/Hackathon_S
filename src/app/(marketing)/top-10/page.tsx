import type { Metadata } from 'next';
import Link from 'next/link';
import { Users, ArrowRight, HeartHandshake, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Reveal } from '@/components/common/reveal';
import { FinalistsLineup } from '@/features/top10/FinalistsLineup';
import { FinalRoundHero } from '@/features/top10/FinalRoundHero';
import { StageVisual } from '@/features/top10/StageVisual';
import { MysteryTop3 } from '@/features/top10/MysteryTop3';
import { WinnerPodium } from '@/features/top10/WinnerPodium';
import { FinalRoundCountdown } from '@/features/top10/FinalRoundCountdown';

export const metadata: Metadata = {
  title: 'Top 10 Finalists — Final Round',
  description:
    'The Top 10 finalist teams of Kira 2026 have earned their place. The Final Round is September 8 — only 3 will claim the podium. Winners stay hidden until the reveal.',
  alternates: { canonical: '/top-10' },
};

export default function Top10Page() {
  return (
    <div className="flex flex-col gap-12 md:gap-16">
      {/* 1 · FINAL ROUND — the Sept 8 focal point */}
      <FinalRoundHero />

      {/* 2 · the 10 teams that remain */}
      <section className="container-page flex flex-col gap-8 py-2">
        <Reveal className="mx-auto flex w-full max-w-5xl flex-col items-center gap-2 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-border bg-accent-surface px-3 py-1 text-xs font-semibold text-accent-text">
            <Users className="size-3.5" aria-hidden />
            10 teams remain
          </span>
          <h2 className="font-display text-h2 font-semibold text-foreground">
            Congratulations, Finalists! 🎉
          </h2>
          <p className="max-w-xl text-body-sm text-muted-foreground">
            You have earned your place among the best. But the winner is still unknown — only three
            will rise on September 8.
          </p>
        </Reveal>

        <Reveal delayStep={1} className="mx-auto w-full max-w-5xl">
          <div className="rounded-[28px] border border-border bg-surface p-4 shadow-e4 sm:p-6">
            <FinalistsLineup showPit columns={2} />
          </div>
        </Reveal>
      </section>

      {/* 3 · stage with the unknown finalist */}
      <StageVisual />

      {/* 4 · the Top 3 mystery winners */}
      <MysteryTop3 />

      {/* 5 · the winner's podium */}
      <WinnerPodium />

      {/* 6 · live countdown to the reveal */}
      <FinalRoundCountdown />

      {/* closing note + timeline */}
      <section className="container-page flex flex-col items-center gap-8 pb-16">
        <Alert variant="info" className="max-w-2xl">
          <HeartHandshake className="size-4" aria-hidden />
          <AlertTitle>To all the teams who couldn&apos;t make it this time</AlertTitle>
          <AlertDescription>
            Don&apos;t be discouraged! Your participation and effort are truly appreciated. Keep
            learning, keep building, and come back stronger next year.
          </AlertDescription>
        </Alert>

        <div className="flex flex-col items-center gap-2 text-center">
          <Sparkles className="size-5 text-primary" aria-hidden />
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-muted-foreground">
            The final round decides everything
          </p>
          <p className="font-display text-h4 font-semibold text-foreground">
            See you on September 8.
          </p>
        </div>

        <Button asChild variant="outline" size="sm">
          <Link href="/project-journey">
            View the full timeline
            <ArrowRight aria-hidden />
          </Link>
        </Button>
      </section>
    </div>
  );
}
