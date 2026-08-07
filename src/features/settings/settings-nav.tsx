'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { SETTINGS_NAV } from '@/config/navigation';

/**
 * Section nav. Horizontally scrollable on narrow screens rather than wrapping,
 * so the panel below never gets pushed off the first viewport.
 */
function SettingsNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Settings sections" className="lg:sticky lg:top-24 lg:h-fit">
      <ul className="-mx-1 no-scrollbar flex gap-1 overflow-x-auto px-1 pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
        {SETTINGS_NAV.map((item) => {
          const active = pathname === item.href;
          return (
            <li key={item.href} className="shrink-0 lg:shrink">
              <Link
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex min-h-9 items-center rounded-md px-3 text-body-sm whitespace-nowrap transition-colors',
                  'focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
                  active
                    ? 'bg-muted font-medium text-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export { SettingsNav };
