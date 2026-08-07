import { DOMAINS } from '@/constants/domains';

const ITEMS = [
  ...DOMAINS.map((d) => d.label),
  'Ministry of AYUSH',
  'NTRO',
  'ISRO / SAC',
  'MSME',
  'Ministry of Corporate Affairs',
  'Government of Gujarat',
];

/**
 * Sourcing strip. Pure CSS animation on a duplicated track — no JS, no layout
 * thrash — and it stops entirely under `prefers-reduced-motion` via the global
 * base rule.
 */
function DomainMarquee() {
  return (
    <section aria-label="Sourced from" className="border-b border-border bg-surface-sunken py-6">
      <p className="container-page mb-4 overline text-subtle-foreground">
        Sourced from official theme-wise sets, 2022–2025
      </p>
      <div className="overflow-hidden mask-fade-x">
        <ul className="flex w-max animate-marquee items-center gap-10 pr-10">
          {[...ITEMS, ...ITEMS].map((item, index) => (
            <li
              key={`${item}-${index}`}
              aria-hidden={index >= ITEMS.length}
              className="text-body-sm whitespace-nowrap text-muted-foreground"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export { DomainMarquee };
