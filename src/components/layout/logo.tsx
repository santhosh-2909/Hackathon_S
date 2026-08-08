import Link from 'next/link';
import Image from 'next/image';

import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';

/** Branded home link used by the marketing header and workspace shell. */
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
        'inline-flex items-center rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
        className,
      )}
      aria-label={`${siteConfig.name} home`}
    >
      <span className={cn('block shrink-0', showWordmark ? 'h-11 w-[7.5rem]' : 'size-10')}>
        <Image
          src="/imagery/kira-logo-wide.png"
          alt=""
          width={1024}
          height={600}
          priority
          className="h-full w-full object-contain"
        />
      </span>
    </Link>
  );
}

export { Logo };
