import { Cpu, KeyRound, Scale } from 'lucide-react';

import { Section } from '@/components/common/section';
import { Reveal } from '@/components/common/reveal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const ROWS = [
  {
    knows: 'JavaScript',
    frontend: 'React / Next.js',
    backend: 'Next.js API routes or Express',
    data: 'Supabase → Vercel',
  },
  {
    knows: 'Python',
    frontend: 'HTML + JS, or React',
    backend: 'FastAPI / Flask',
    data: 'SQLite or Supabase → Render',
  },
  {
    knows: 'Little coding',
    frontend: 'No-code + HTML',
    backend: 'Firebase (BaaS)',
    data: 'Firebase end to end',
  },
];

const RULES = [
  {
    icon: Cpu,
    title: 'AI',
    body: 'Call pre-trained APIs — LLM, vision, speech. Never train a model. Your hackathon is not a research lab.',
  },
  {
    icon: KeyRound,
    title: 'Auth and payments',
    body: 'Integrate a provider: Firebase, Supabase, Auth0, Stripe. Do not build it. Auth is a solved problem.',
  },
  {
    icon: Scale,
    title: 'By judging emphasis',
    body: 'AI novelty → budget the integration. UX → invest in front-end with a BaaS behind it. Technical depth → showcase one hard component and keep the rest minimal.',
  },
];

function StackGuide() {
  return (
    <Section
      id="the-stack"
      eyebrow="Stack"
      heading="Choose what the team builds fastest tonight"
      description="A stack is front-end, back-end, database, auth, hosting and APIs. Familiarity beats better-but-unknown, every time."
    >
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <Card>
            <CardHeader>
              <CardTitle>Defaults by team skill</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>
                  Pick the row that matches what the team already knows — not the row that sounds
                  most impressive.
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead scope="col">Team knows…</TableHead>
                    <TableHead scope="col">Front-end</TableHead>
                    <TableHead scope="col">Back-end</TableHead>
                    <TableHead scope="col">Data + deploy</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ROWS.map((row) => (
                    <TableRow key={row.knows}>
                      <TableHead scope="row" className="text-body-sm font-medium text-foreground">
                        {row.knows}
                      </TableHead>
                      <TableCell>{row.frontend}</TableCell>
                      <TableCell>{row.backend}</TableCell>
                      <TableCell>{row.data}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Reveal>

        <div className="flex flex-col gap-4">
          {RULES.map((rule, index) => (
            <Reveal key={rule.title} delayStep={index + 1}>
              <Card className="h-full">
                <CardContent className="flex gap-4 p-5">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-border bg-surface-sunken text-muted-foreground">
                    <rule.icon className="size-4" aria-hidden />
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-h5">{rule.title}</h3>
                    <p className="text-body-sm text-muted-foreground">{rule.body}</p>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

export { StackGuide };
