'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search } from 'lucide-react';

import { cn } from '@/lib/utils';
import { MARKETING_NAV } from '@/config/navigation';
import { useUiStore } from '@/stores/ui-store';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/layout/logo';
import { ThemeToggle } from '@/components/layout/theme-toggle';

/** In-page anchors are never "current" — only real routes are. */
function isRouteActive(href: string, pathname: string) {
  if (href.includes('#')) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Sticky marketing header.
 *
 * Client-side only because it reacts to scroll; the links themselves are
 * static and rendered on the server as part of the tree.
 */
function MarketingHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const toggleCommand = useUiStore((state) => state.toggleCommand);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 px-4 pt-4 sm:px-6">
      {/* Floating pill rather than a full-bleed bar: the header reads as an
          object sitting on the page instead of a band cutting across it. It
          gains a surface and a shadow once the page scrolls under it. */}
      <div
        className={cn(
          'mx-auto flex h-auto min-h-[68px] max-w-7xl flex-wrap items-center gap-x-4 gap-y-2 rounded-[22px] border border-slate-200/80 px-4 py-3 shadow-md backdrop-blur-xl sm:px-5 dark:border-slate-800',
          'transition-[background-color,border-color,box-shadow] duration-200 ease-in-out',
          scrolled
            ? 'bg-white/90 dark:bg-slate-900/90 shadow-lg'
            : 'bg-white/75 dark:bg-slate-900/75',
        )}
      >
        <Logo className="shrink-0" />

        <nav aria-label="Primary" className="block min-w-0 flex-1">
          <ul className="flex flex-wrap items-center justify-center gap-x-0.5 gap-y-1 sm:gap-1">
            {MARKETING_NAV.map((item) => {
              const active = isRouteActive(item.href, pathname);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'relative inline-flex h-9 items-center rounded-xl whitespace-nowrap transition-all duration-200 sm:px-3 px-2 text-[13px] sm:text-sm font-medium',
                      active
                        ? 'bg-accent-surface text-accent-text font-semibold'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white',
                    )}
                  >
                    {item.label}
                    {active && (
                      <span className="absolute right-3 bottom-0 left-3 h-0.5 rounded-full bg-accent" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex flex-shrink-0 items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCommand}
            aria-label="Search"
            className="hidden text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl sm:inline-flex"
          >
            <Search aria-hidden />
          </Button>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export { MarketingHeader };
