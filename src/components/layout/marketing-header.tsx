'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Menu, Presentation, Search } from 'lucide-react';

import { cn } from '@/lib/utils';
import { MARKETING_NAV } from '@/config/navigation';
import { useUiStore } from '@/stores/ui-store';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
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
 * Client-side only because it reacts to scroll and owns the mobile sheet; the
 * links themselves are static and rendered on the server as part of the tree.
 */
function MarketingHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const toggleCommand = useUiStore((state) => state.toggleCommand);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Delegated: any anchor activated inside the drawer dismisses it.
  const handleNavigate = (event: React.MouseEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest('a')) setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 px-4 pt-4 sm:px-6">
      {/* Floating pill rather than a full-bleed bar: the header reads as an
          object sitting on the page instead of a band cutting across it. It
          gains a surface and a shadow once the page scrolls under it. */}
      <div
        className={cn(
          'mx-auto flex h-[68px] max-w-7xl items-center gap-4 rounded-[22px] border border-slate-200/80 px-4 shadow-md backdrop-blur-xl sm:px-5 dark:border-slate-800',
          'transition-[background-color,border-color,box-shadow] duration-200 ease-in-out',
          scrolled
            ? 'bg-white/90 dark:bg-slate-900/90 shadow-lg'
            : 'bg-white/75 dark:bg-slate-900/75',
        )}
      >
        <Logo className="shrink-0" />

        <nav aria-label="Primary" className="hidden min-w-0 flex-1 xl:block">
          <ul className="flex items-center justify-center gap-1">
            {MARKETING_NAV.map((item) => {
              const active = isRouteActive(item.href, pathname);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'relative inline-flex h-9 items-center rounded-xl px-3 text-sm font-medium whitespace-nowrap transition-all duration-200',
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

        <div className="ml-auto flex items-center gap-2">
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

          <span aria-hidden className="mx-1 hidden h-6 w-px bg-slate-200 dark:bg-slate-800 xl:block" />

          {/* Desktop CTA removed as requested. Mobile menu still contains links. */}

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="xl:hidden" aria-label="Open menu">
                <Menu aria-hidden />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(20rem,85vw)]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              {/* Every link closes the sheet on activation. Doing it here rather
                  than in a pathname effect keeps it out of the render loop and
                  also covers same-page anchors, which do not change pathname. */}
              <SheetBody className="flex flex-col gap-1" onClick={handleNavigate}>
                <nav aria-label="Mobile">
                  <ul className="flex flex-col gap-1">
                    {MARKETING_NAV.map((item) => {
                      const active = isRouteActive(item.href, pathname);
                      return (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            aria-current={active ? 'page' : undefined}
                            className={cn(
                              'flex min-h-11 items-center rounded-md px-3 text-body-sm transition-colors hover:bg-muted',
                              active && 'bg-muted font-medium',
                            )}
                          >
                            {item.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
                <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
                  <Button asChild variant="soft" size="lg">
                    <Link href="/problems">
                      <Compass aria-hidden />
                      Browse statements
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/workshop">
                      <Presentation aria-hidden />
                      Workshop deck
                    </Link>
                  </Button>
                </div>
              </SheetBody>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export { MarketingHeader };
