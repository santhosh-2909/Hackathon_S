import Link from 'next/link';

import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';

/**
 * Wordmark. The glyph is a caret — the shell prompt the brand voice is built
 * around — drawn in SVG rather than shipped as an image so it inherits colour
 * and stays crisp at every density.
 */
function Logo({
  className,
  href = '/',
  showWordmark = true,
}: {
  className?: string;
  href?: string;
  showWordmark?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        'group inline-flex items-center gap-2.5 rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
        className,
      )}
      aria-label={`${siteConfig.name} home`}
    >
      <span className="grid size-7 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground">
        <svg viewBox="0 0 16 16" className="size-4" aria-hidden fill="none">
          <path
            d="M4 4.5 7.5 8 4 11.5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.25 11.5H12.5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      </span>
      {showWordmark ? (
        <span className="text-h6 tracking-tight whitespace-nowrap">{siteConfig.name}</span>
      ) : null}
    </Link>
  );
}

export { Logo };
