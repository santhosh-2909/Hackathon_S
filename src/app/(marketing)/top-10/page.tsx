import type { Metadata } from 'next';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  Calendar,
  Sparkles,
  PartyPopper,
  Crown,
  HeartHandshake,
  Award,
  Shield,
  Stethoscope,
  Cpu,
  Siren,
  Rocket,
  Bot,
  Layers,
  Users,
  Orbit,
  Zap,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const metadata: Metadata = {
  title: 'Top 10 Finalists',
  description:
    'Meet the Top 10 finalist teams of Kira 2026 Innovation Challenge who have showcased outstanding creativity, innovation, and hard work.',
  alternates: { canonical: '/top-10' },
};

interface FinalistTeam {
  rank: number;
  name: string;
  glyph: LucideIcon;
  monogram: string;
  gradient: string;
  accent: string;
}

const FINALIST_TEAMS: FinalistTeam[] = [
  {
    rank: 1,
    name: 'A Clear',
    glyph: Shield,
    monogram: 'AC',
    gradient: 'from-sky-500 via-blue-500 to-indigo-600',
    accent: 'group-hover:from-sky-400 group-hover:to-indigo-500',
  },
  {
    rank: 2,
    name: 'Rescue Bite',
    glyph: Stethoscope,
    monogram: 'RB',
    gradient: 'from-emerald-500 via-teal-500 to-cyan-600',
    accent: 'group-hover:from-emerald-400 group-hover:to-cyan-500',
  },
  {
    rank: 3,
    name: 'Byte Me',
    glyph: Cpu,
    monogram: 'BM',
    gradient: 'from-fuchsia-500 via-purple-500 to-violet-600',
    accent: 'group-hover:from-fuchsia-400 group-hover:to-violet-500',
  },
  {
    rank: 4,
    name: 'Crisis CRUSHERS',
    glyph: Siren,
    monogram: 'CC',
    gradient: 'from-amber-500 via-orange-500 to-red-500',
    accent: 'group-hover:from-amber-400 group-hover:to-red-500',
  },
  {
    rank: 5,
    name: 'Alpha Squad',
    glyph: Users,
    monogram: 'AS',
    gradient: 'from-rose-500 via-pink-500 to-fuchsia-600',
    accent: 'group-hover:from-rose-400 group-hover:to-fuchsia-500',
  },
  {
    rank: 6,
    name: 'Jarvis Unit',
    glyph: Bot,
    monogram: 'JU',
    gradient: 'from-cyan-400 via-sky-500 to-blue-600',
    accent: 'group-hover:from-cyan-300 group-hover:to-blue-500',
  },
  {
    rank: 7,
    name: 'Quadrix',
    glyph: Layers,
    monogram: 'QX',
    gradient: 'from-violet-500 via-purple-500 to-indigo-600',
    accent: 'group-hover:from-violet-400 group-hover:to-indigo-500',
  },
  {
    rank: 8,
    name: 'Squad Crew',
    glyph: Rocket,
    monogram: 'SC',
    gradient: 'from-lime-500 via-green-500 to-emerald-600',
    accent: 'group-hover:from-lime-400 group-hover:to-emerald-500',
  },
  {
    rank: 9,
    name: 'Tech Orbit',
    glyph: Orbit,
    monogram: 'TO',
    gradient: 'from-red-500 via-orange-500 to-amber-600',
    accent: 'group-hover:from-red-400 group-hover:to-amber-500',
  },
  {
    rank: 10,
    name: 'StarkX',
    glyph: Zap,
    monogram: 'SX',
    gradient: 'from-slate-600 via-slate-700 to-gray-800',
    accent: 'group-hover:from-slate-500 group-hover:to-gray-700',
  },
];

const leftColumn = FINALIST_TEAMS.slice(0, 5);
const rightColumn = FINALIST_TEAMS.slice(5);

function TeamLogo({ team }: { team: FinalistTeam }) {
  const Glyph = team.glyph;
  return (
    <div
      className={`flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${team.gradient} ${team.accent} shadow-lg transition-transform duration-300`}
    >
      <div className="flex flex-col items-center justify-center leading-none">
        <Glyph className="size-4 text-white/90" strokeWidth={2.2} />
        <span className="mt-0.5 text-[10px] font-extrabold tracking-wide text-white">
          {team.monogram}
        </span>
      </div>
    </div>
  );
}

function TeamCard({ team }: { team: FinalistTeam }) {
  return (
    <li className="group flex items-center gap-4 rounded-2xl border border-border bg-surface px-4 py-4 shadow-2xs transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg">
      <TeamLogo team={team} />

      <div className="flex min-w-0 flex-col items-center gap-0.5">
        <span className="truncate text-body-lg font-semibold text-foreground">{team.name}</span>
        <span className="text-xs font-medium text-muted-foreground">Finalist Team</span>
      </div>
    </li>
  );
}

export default function Top10Page() {
  return (
    <div className="container-page flex flex-col gap-12 py-12 md:py-16">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center gap-4">
        <Badge variant="accent" size="md">
          <PartyPopper className="size-3.5" />
          Announcement
        </Badge>
        <h1 className="font-display text-display-lg">Top 10 Finalists!</h1>
        <p className="text-body-lg text-muted-foreground max-w-2xl">
          These 10 amazing teams have showcased outstanding{' '}
          <span className="font-semibold text-foreground">creativity, innovation,</span> and hard
          work to reach this stage!
        </p>
      </div>

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
