import { Section } from '@/components/common/section';
import { Reveal } from '@/components/common/reveal';
import { Badge } from '@/components/ui/badge';

const STEPS = [
  {
    tag: 'Core principle',
    title: 'MVP — the smallest version that ships',
    body: 'The smallest version that delivers the core value and can be demoed. In a hackathon the MVP is the submission, so strip everything that does not serve the demo.',
  },
  {
    tag: 'Focus',
    title: 'Magic moment',
    body: 'The one "oh, that\'s useful" interaction. Everything else is cut. If a judge cannot feel it in the first thirty seconds, it does not exist.',
  },
  {
    tag: 'Architecture',
    title: 'Vertical slice',
    body: 'One complete path — UI to API to database to screen — built end to end before adding breadth. A working slice is a working demo.',
  },
  {
    tag: 'Risk',
    title: 'De-risk first',
    body: 'Spike the riskiest unknown in fifteen to thirty minutes before committing the team. A failed spike costs thirty minutes, not twenty hours.',
  },
  {
    tag: 'Discipline',
    title: 'Feature freeze at ~80% of time',
    body: 'After the freeze: only fix, deploy, document and rehearse. The last twenty per cent of polish wins more points than one more half-finished feature.',
  },
];

/**
 * Vertical stepper. The connecting rule is drawn with a border on the list item
 * rather than an absolutely-positioned element, so it cannot desynchronise from
 * the content height at any breakpoint.
 */
function ApproachTimeline() {
  return (
    <Section
      id="the-approach"
      eyebrow="Approach"
      heading="From zero to demo in one weekend"
      description="Every minute is allocated before the first commit. This is how winning teams spend them."
      className="border-y border-border bg-surface-sunken"
    >
      <ol className="grid gap-0 lg:grid-cols-2 lg:gap-x-16">
        {STEPS.map((step, index) => (
          <li key={step.title} className="lg:contents">
            <Reveal
              delayStep={index}
              className="relative flex gap-5 border-l border-border pb-8 pl-6 last:pb-0 lg:border-l-0 lg:pl-0"
            >
              <span
                aria-hidden
                className="absolute top-1 -left-[0.4375rem] size-3.5 rounded-full border-2 border-canvas bg-accent lg:hidden"
              />
              <span
                aria-hidden
                className="hidden size-9 shrink-0 place-items-center rounded-lg border border-border bg-surface font-mono text-caption text-muted-foreground lg:grid"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="flex flex-col gap-1.5 pb-2">
                <Badge variant="neutral" size="sm" className="w-fit">
                  {step.tag}
                </Badge>
                <h3 className="text-h4">{step.title}</h3>
                <p className="text-body-sm text-muted-foreground">{step.body}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export { ApproachTimeline };
