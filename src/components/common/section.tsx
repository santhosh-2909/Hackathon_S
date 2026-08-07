import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * Marketing section scaffold. Every band on a marketing page follows the same
 * template — eyebrow, heading, one supporting line, content — so the vertical
 * rhythm and heading hierarchy stay identical across the site.
 */
interface SectionProps extends React.ComponentProps<'section'> {
  eyebrow?: string;
  heading?: React.ReactNode;
  description?: React.ReactNode;
  /** Heading level for the section title. Defaults to `h2`. */
  as?: 'h2' | 'h3';
  align?: 'start' | 'center';
  headerClassName?: string;
  actions?: React.ReactNode;
}

function Section({
  eyebrow,
  heading,
  description,
  as: Heading = 'h2',
  align = 'start',
  className,
  headerClassName,
  actions,
  children,
  ...props
}: SectionProps) {
  const labelId = React.useId();
  const hasHeader = Boolean(eyebrow || heading || description);

  return (
    <section
      className={cn('section-y', className)}
      aria-labelledby={heading ? labelId : undefined}
      {...props}
    >
      <div className="container-page">
        {hasHeader ? (
          <div
            className={cn(
              'flex flex-col gap-3',
              align === 'center' && 'items-center text-center',
              actions && 'md:flex-row md:items-end md:justify-between md:gap-8',
              headerClassName,
            )}
          >
            <div
              className={cn(
                'flex max-w-2xl flex-col gap-3',
                align === 'center' && 'items-center text-center',
              )}
            >
              {eyebrow ? <p className="overline text-accent-text">{eyebrow}</p> : null}
              {heading ? (
                <Heading id={labelId} className="font-display text-display-lg">
                  {heading}
                </Heading>
              ) : null}
              {description ? (
                <p className="text-body-lg text-muted-foreground">{description}</p>
              ) : null}
            </div>
            {actions ? <div className="flex shrink-0 items-center gap-3">{actions}</div> : null}
          </div>
        ) : null}
        {children ? <div className={cn(hasHeader && 'mt-10 md:mt-14')}>{children}</div> : null}
      </div>
    </section>
  );
}

export { Section };
