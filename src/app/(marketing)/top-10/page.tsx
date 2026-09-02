import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Calendar,
  Sparkles,
  Crown,
  HeartHandshake,
  Award,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { FinalistsLineup } from '@/features/top10/FinalistsLineup';

export const metadata: Metadata = {
  title: 'Top 10 Finalists',
  description:
    'Meet the Top 10 finalist teams of Kira 2026 Innovation Challenge who have showcased outstanding creativity, innovation, and hard work.',
  alternates: { canonical: '/top-10' },
};

export default function Top10Page() {
  return (
    <div className="container-page flex flex-col gap-12 py-12 md:py-16">
      <section className="mx-auto w-full max-w-5xl">
        <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-b from-surface to-primary/5">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

          <CardContent className="p-6 md:p-10">
            <div className="mb-8 flex flex-col items-center gap-2 text-center">
              <Award className="size-7 text-primary" />
              <h2 className="font-display text-h2">Congratulations, Teams! 🎉</h2>
              <p className="max-w-xl text-body-sm text-muted-foreground">
                You have earned your place among the best. The journey to the finals continues —
                here is our incredible lineup:
              </p>
            </div>

            <FinalistsLineup showPit columns={2} />
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto flex max-w-3xl flex-col items-center text-center gap-6">
        <div className="flex flex-col items-center gap-2">
          <Crown className="size-8 text-amber-500 dark:text-amber-400" />
          <h2 className="font-display text-h3">The Ultimate Showdown Awaits</h2>
        </div>

        <Card className="w-full border-accent-border bg-accent-surface/50">
          <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
            <Calendar className="size-8 text-accent-text" />
            <h3 className="text-h4 font-bold text-accent-text">Finals Date: 08 September 2026</h3>
            <p className="text-body-sm text-muted-foreground max-w-lg">
              All finalists are requested to prepare thoroughly, refine your projects, test every
              feature, and make sure your projects are fully functional and ready for the final
              presentation.
            </p>
          </CardContent>
        </Card>

        <Alert variant="info">
          <HeartHandshake className="size-4" aria-hidden />
          <AlertTitle>To all the teams who couldn&apos;t make it this time</AlertTitle>
          <AlertDescription>
            Don&apos;t be discouraged! Your participation and effort are truly appreciated. Keep
            learning, keep building, and come back stronger. We look forward to seeing even more
            enthusiastic participation in our future events!
          </AlertDescription>
        </Alert>

        <div className="flex flex-col items-center gap-2">
          <Sparkles className="size-5 text-primary" />
          <p className="text-body-lg font-semibold text-foreground">
            Finalists, this is your moment — give it your best!
          </p>
        </div>

        <Button asChild variant="outline" size="sm" className="mt-2">
          <Link href="/project-journey">
            View the timeline
            <ArrowRight aria-hidden />
          </Link>
        </Button>
      </section>
    </div>
  );
}
