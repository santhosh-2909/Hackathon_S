import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const metadata: Metadata = {
  title: 'The playbook',
  description:
    'How to choose a hackathon problem statement, validate it in thirty minutes, and spend the build window so the demo lands.',
  alternates: { canonical: '/playbook' },
};

const SECTIONS = [
  {
    id: 'choosing',
    title: 'Choosing',
    items: [
      {
        q: 'What makes a problem statement strong?',
        a: 'It names one specific user, one concrete observable pain, in a context you can describe, caused by an obstacle you can point at, with a consequence someone actually feels. If any of those five slots is empty, the statement is not ready.',
      },
      {
        q: 'Why is naming a solution too early a failure?',
        a: '"A parking-map app" forecloses the design space before anyone has checked whether a map is the answer. "People waste time finding parking" leaves every solution on the table — including the one a judge has not seen twenty times.',
      },
      {
        q: 'How do I know the pain is real?',
        a: 'Ask three people in the target group. Zero yeses means pick a new problem. Look for existing workarounds — spreadsheets, WhatsApp groups, paid tools — because someone already spending time or money to avoid a pain has proved it is worth solving.',
      },
    ],
  },
  {
    id: 'building',
    title: 'Building',
    items: [
      {
        q: 'What exactly is the MVP here?',
        a: 'In a hackathon the MVP is the submission. It is the smallest version that delivers the core value and can be demoed live. Anything that does not appear in the demo does not get built.',
      },
      {
        q: 'Why build a vertical slice first?',
        a: 'One complete path — UI to API to database to screen — proves the whole system works end to end. Breadth added before that gives you five half-features and no demo. A working slice is a working demo.',
      },
      {
        q: 'What should the first thirty minutes be?',
        a: 'A spike on the riskiest unknown. Can you actually get that API key? Does the model run on the laptop you brought? A failed spike costs thirty minutes; discovering the same failure at hour twenty costs the project.',
      },
      {
        q: 'When do I stop adding features?',
        a: 'At roughly eighty per cent of the time box. After the freeze: fix, deploy, document, rehearse. The last twenty per cent of polish wins more points than one more half-finished feature.',
      },
    ],
  },
  {
    id: 'stack',
    title: 'Stack',
    items: [
      {
        q: 'How do I pick a stack?',
        a: 'By what the team builds fastest tonight. Familiarity beats better-but-unknown. A stack is front-end, back-end, database, auth, hosting and APIs — decide all six before the first commit so nobody is blocked mid-build.',
      },
      {
        q: 'Should we train a model?',
        a: 'No. Call pre-trained APIs for LLM, vision or speech work. Training is a research-lab activity and it will eat the window you needed for the demo.',
      },
      {
        q: 'What about auth and payments?',
        a: 'Integrate a provider — Firebase, Supabase, Auth0, Stripe. Both are solved problems, and neither earns points for being hand-rolled.',
      },
    ],
  },
];

export default function PlaybookPage() {
  return (
    <div className="container-page flex flex-col gap-12 py-12 md:py-16">
      <header className="flex max-w-3xl flex-col gap-3">
        <p className="overline text-accent-text">The playbook</p>
        <h1 className="font-display text-display-lg">
          Everything the workshop covers, in one page
        </h1>
        <p className="text-body-lg text-muted-foreground">
          No hype, no inspiration. The decisions that separate a project that demos from one that
          explains why it did not.
        </p>
      </header>

      <div className="grid gap-10 lg:grid-cols-[1fr_16rem] lg:gap-16">
        <div className="flex flex-col gap-10">
          {SECTIONS.map((section) => (
            <section key={section.id} id={section.id} className="flex scroll-mt-24 flex-col gap-4">
              <h2 className="text-h2">{section.title}</h2>
              <Card>
                <CardContent className="px-5 py-1">
                  <Accordion type="single" collapsible>
                    {section.items.map((item, index) => (
                      <AccordionItem key={item.q} value={`${section.id}-${index}`}>
                        <AccordionTrigger>{item.q}</AccordionTrigger>
                        <AccordionContent>{item.a}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </section>
          ))}

          <Alert variant="info">
            <AlertTitle>On the directory entries</AlertTitle>
            <AlertDescription>
              Expected-solution text in the directory is informed guidance reconstructed from each
              statement&rsquo;s official title, theme and organisation, corroborated against public
              team submissions — not copy-pasted portal text. Verify codes and dataset links on the
              live portal before a team commits.
            </AlertDescription>
          </Alert>
        </div>

        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <Card>
            <CardHeader>
              <CardTitle>On this page</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <nav aria-label="Playbook sections">
                <ul className="flex flex-col gap-2">
                  {SECTIONS.map((section) => (
                    <li key={section.id}>
                      <Link
                        href={`#${section.id}`}
                        className="rounded-xs text-body-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {section.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <Button asChild variant="outline" size="sm" className="mt-2">
                <Link href="/problems">
                  Open the statements
                  <ArrowRight aria-hidden />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
