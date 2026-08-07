import Link from 'next/link';
import Image from 'next/image';

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
      <span className="grid size-7 shrink-0 place-items-center rounded-md bg-transparent text-primary-foreground">
        <Image
          src="/imagery/kira-logo.svg"
          alt={siteConfig.name}
          width={40}
          height={40}
          className="rounded-md object-contain"
        />
      </span>
      {showWordmark ? (
        <span className="text-h6 tracking-tight whitespace-nowrap">{siteConfig.name}</span>
      ) : null}
    </Link>
  );
}

export { Logo };
