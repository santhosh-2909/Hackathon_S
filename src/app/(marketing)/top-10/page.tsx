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
import { Top10Hero } from '@/features/top10/Top10Hero';

export const metadata: Metadata = {
  title: 'Top 10 Finalists',
  description:
    'Meet the Top 10 finalist teams of Kira 2026 Innovation Challenge who have showcased outstanding creativity, innovation, and hard work.',
  alternates: { canonical: '/top-10' },
};

interface FinalistTeam {
  rank: number;
  name: string;
  topic: string;
  monogram: string;
  /** Solid brand accent used for the monogram and ring. */
  accent: string;
  /** Deep shade that anchors the badge — keeps the mark restrained and professional. */
  base: string;
}

const FINALIST_TEAMS: FinalistTeam[] = [
  {
    rank: 1,
    name: 'A Clear',
    topic: 'An AI-Powered Smart Waste Transformation System',
    monogram: 'AC',
    accent: 'text-indigo-300',
    base: 'bg-indigo-950',
  },
  {
    rank: 2,
    name: 'Rescue Bite',
    topic: 'AI-driven real time food rescue network',
    monogram: 'RB',
    accent: 'text-teal-300',
    base: 'bg-teal-950',
  },
  {
    rank: 3,
    name: 'Byte Me',
    topic: 'An AI Powered Public Project Intelligence',
    monogram: 'BM',
    accent: 'text-violet-300',
    base: 'bg-violet-950',
  },
  {
    rank: 4,
    name: 'Crisis CRUSHERS',
    topic: 'App-based crop and plant disease identification',
    monogram: 'CC',
    accent: 'text-rose-300',
    base: 'bg-rose-950',
  },
  {
    rank: 5,
    name: 'Alpha Squad',
    topic: 'Small business ops agent',
    monogram: 'AS',
    accent: 'text-fuchsia-300',
    base: 'bg-fuchsia-950',
  },
  {
    rank: 6,
    name: 'Jarvis Unit',
    topic: 'LifeFlow Finder',
    monogram: 'JU',
    accent: 'text-cyan-300',
    base: 'bg-cyan-950',
  },
  {
    rank: 7,
    name: 'Quadrix',
    topic: 'AI-Powered Unified Citizen Service & Opportunity Platform',
    monogram: 'QX',
    accent: 'text-purple-300',
    base: 'bg-purple-950',
  },
  {
    rank: 8,
    name: 'Squad Crew',
    topic: 'Topic to be confirmed',
    monogram: 'SC',
    accent: 'text-lime-300',
    base: 'bg-lime-950',
  },
  {
    rank: 9,
    name: 'Tech Orbit',
    topic: 'AI urban flood prediction and evacuation system',
    monogram: 'TO',
    accent: 'text-amber-300',
    base: 'bg-amber-950',
  },
  {
    rank: 10,
    name: 'StarkX',
    topic: 'PrepFresherAI — AI-powered career & Interview coach',
    monogram: 'SX',
    accent: 'text-slate-200',
    base: 'bg-slate-900',
  },
];

const leftColumn = FINALIST_TEAMS.slice(0, 5);
const rightColumn = FINALIST_TEAMS.slice(5);

function TeamLogo({ team }: { team: FinalistTeam }) {
  return (
    <div
      className={`relative flex size-16 shrink-0 items-center justify-center rounded-2xl ${team.base} shadow-lg ring-1 ring-white/15 transition-transform duration-300 group-hover:scale-[1.03]`}
    >
      <span
        className={`font-display text-xl font-bold tracking-wide drop-shadow-sm ${team.accent}`}
      >
        {team.monogram}
      </span>
      <span
        className={`pointer-events-none absolute inset-x-4 bottom-1.5 h-px opacity-60 ${team.accent}`}
        aria-hidden
      />
    </div>
  );
}

function TeamCard({ team }: { team: FinalistTeam }) {
  return (
    <li className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-6 text-center shadow-2xs transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg">
      <TeamLogo team={team} />

      <div className="flex min-w-0 flex-col items-center gap-1">
        <span className="text-body-lg font-semibold text-foreground">{team.name}</span>
        <span className="line-clamp-2 max-w-[16rem] text-center text-xs leading-snug text-muted-foreground">
          {team.topic}
        </span>
      </div>
    </li>
  );
}

export default function Top10Page() {
  return (
    <div className="container-page flex flex-col gap-12 py-12 md:py-16">
      <Top10Hero />

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

            <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-8">
              <ol className="flex flex-col gap-3.5">
                {leftColumn.map((team) => (
                  <TeamCard key={team.rank} team={team} />
                ))}
              </ol>
              <ol className="flex flex-col gap-3.5">
                {rightColumn.map((team) => (
                  <TeamCard key={team.rank} team={team} />
                ))}
              </ol>
            </div>
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
