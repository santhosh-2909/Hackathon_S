import Link from 'next/link';
import { ArrowRight, Compass } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { WORKSHOP_DECK } from '@/constants/workshop-deck';
import { Reveal } from '@/components/common/reveal';
import { DeckPreview } from '@/features/marketing/deck-preview';

const SIGNALS = [
  { value: '10', label: 'Researched statements' },
  { value: '5', label: 'Pre-build checks' },
  { value: '3', label: 'Interviews to validate' },
  { value: '80%', label: 'Feature-freeze mark' },
];

/**
 * Hero. Server-rendered — the only client code on first paint is the header.
 *
 * The LCP element remains the headline. The single decorative
 * layer is a hairline grid that fades out well before it reaches the type — it
 * is behind `-z-10` and `aria-hidden`, so it can never intercept a pointer or
 * reach the accessibility tree.
 */
function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Final PPT template banner */}
      <div className="container-page mb-6">
        <div className="flex flex-col gap-4 rounded-xl border border-slate-200/80 bg-white p-4 sm:flex-row sm:items-center sm:justify-between dark:bg-slate-900">
          <div>
            <p className="text-sm font-semibold">Final PPT Template</p>
            <p className="mt-0.5 text-xs text-slate-500">
              Use this final template for your Finals pitch. Do not modify the template — changing
              the template may lead to disqualification.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="h-11 w-full shrink-0 bg-sky-600 text-white hover:bg-sky-700 sm:m-auto sm:h-10 sm:w-auto sm:px-4"
          >
            <a
              href={WORKSHOP_DECK.finalFileHref}
              download
              aria-label="Download Final presentation"
              className="whitespace-normal sm:whitespace-nowrap"
            >
              Download Final_pres.pptx
            </a>
          </Button>
        </div>
      </div>
      <div className="relative container-page grid gap-14 py-20 md:py-24 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-center lg:gap-16 xl:py-28">
        <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
          <Reveal>
            <p className="overline text-indigo-200">The problem-statement workshop</p>
          </Reveal>

          <Reveal delayStep={1}>
            {/* Two-tone: the muted half is the instruction people skip, the ink
                half is the one that decides the project. */}
            <h1 className="max-w-[14ch] font-display text-hero">
              <span className="text-slate-200">Don&rsquo;t guess,</span>{' '}
              <span className="text-white">just ask</span>
            </h1>
          </Reveal>

          <Reveal delayStep={2}>
            <p className="max-w-xl text-body-lg text-balance text-slate-200">
              Most losing projects fail before any code is written. This turns a vague idea into a
              problem statement a judge can verify — in about thirty minutes.
            </p>
          </Reveal>

          <Reveal delayStep={3} className="mt-2 flex flex-col items-center gap-4 lg:items-start">
            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <Button asChild variant="soft" size="lg" className="h-12 px-6 text-body">
                <Link href="/problems">
                  <Compass aria-hidden />
                  Browse the statements
                </Link>
              </Button>
              <Button asChild variant="ghost" size="lg" className="h-12 px-5 text-body text-white hover:bg-white/10">
                <Link href="#the-problem">
                  Read the method
                  <ArrowRight aria-hidden />
                </Link>
              </Button>
            </div>
            <p className="text-caption text-slate-300">
              Ten researched SIH statements, plus guided problem discovery
            </p>
          </Reveal>

          <Reveal delayStep={4} className="w-full">
            <dl className="mt-8 grid w-full max-w-xl grid-cols-2 gap-x-8 gap-y-8 border-t border-white/20 pt-8 sm:grid-cols-4">
              {SIGNALS.map((signal) => (
                <div
                  key={signal.label}
                  className="flex flex-col items-center gap-1.5 lg:items-start"
                >
                  <dt className="sr-only">{signal.label}</dt>
                  <dd className="font-display text-display-lg leading-none text-white">{signal.value}</dd>
                  <p aria-hidden className="text-caption text-slate-300">
                    {signal.label}
                  </p>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delayStep={2} className="w-full">
          <DeckPreview />
        </Reveal>
      </div>
    </section>
  );
}

export { Hero };
