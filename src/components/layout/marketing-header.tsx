'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Search, X } from 'lucide-react';

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
 *
 * On desktop the navigation renders inline in the floating pill. Below `lg`
 * it collapses into a hamburger that opens a full-screen mobile drawer with
 * vertical, large touch targets — desktop is never squeezed into a phone.
 */
function MarketingHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const toggleCommand = useUiStore((state) => state.toggleCommand);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Lock background scroll while the mobile drawer is open. */
  React.useEffect(() => {
    if (menuOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [menuOpen]);

  /* Close on Escape. */
  React.useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const navLinks = MARKETING_NAV.map((item) => {
    const active = isRouteActive(item.href, pathname);
    return (
      <li key={item.href}>
        <Link
          href={item.href}
          aria-current={active ? 'page' : undefined}
          className={cn(
            'relative inline-flex min-h-9 items-center rounded-xl whitespace-nowrap px-2 text-[13px] font-medium transition-all duration-200 sm:px-3 sm:text-sm',
            active
              ? 'bg-accent-surface text-accent-text font-semibold'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white',
          )}
        >
          {item.label}
          {active && <span className="absolute right-3 bottom-0 left-3 h-0.5 rounded-full bg-accent" />}
        </Link>
      </li>
    );
  });

  return (
    <header className="sticky top-0 z-40 px-4 pt-4 sm:px-6">
      {/* Floating pill rather than a full-bleed bar: the header reads as an
          object sitting on the page instead of a band cutting across it. It
          gains a surface and a shadow once the page scrolls under it. */}
      <div
        className={cn(
          'mx-auto flex min-h-[68px] max-w-7xl items-center gap-x-4 gap-y-2 rounded-[22px] border border-slate-200/80 px-4 py-3 shadow-md backdrop-blur-xl sm:px-5 dark:border-slate-800',
          'transition-[background-color,border-color,box-shadow] duration-200 ease-in-out',
          scrolled
            ? 'bg-white/90 shadow-lg dark:bg-slate-900/90'
            : 'bg-white/75 dark:bg-slate-900/75',
        )}
      >
        <Logo className="shrink-0" />

        <nav aria-label="Primary" className="ml-auto hidden min-w-0 lg:block">
          <ul className="flex items-center justify-center gap-x-0.5 gap-y-1 sm:gap-1">{navLinks}</ul>
        </nav>

        <div className="ml-auto flex flex-shrink-0 items-center gap-1 lg:ml-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCommand}
            aria-label="Search"
            className="hidden rounded-xl text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 sm:inline-flex"
          >
            <Search aria-hidden />
          </Button>

          <ThemeToggle />

          {/* Hamburger — only below the desktop nav breakpoint. */}
          <Button
            variant="ghost"
            size="icon"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="grid size-11 place-items-center rounded-xl text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 lg:hidden"
          >
            <Menu aria-hidden />
          </Button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      <div
        id="mobile-menu"
        className={cn(
          'fixed inset-0 z-50 lg:hidden',
          menuOpen ? 'pointer-events-auto' : 'pointer-events-none',
        )}
        aria-hidden={!menuOpen}
      >
        {/* Backdrop — clicking it closes the drawer. */}
        <div
          className={cn(
            'absolute inset-0 bg-slate-950/40 backdrop-blur-sm transition-opacity duration-300',
            menuOpen ? 'opacity-100' : 'opacity-0',
          )}
          onClick={() => setMenuOpen(false)}
        />

        {/* Panel */}
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className={cn(
            'absolute inset-y-0 right-0 flex w-full max-w-xs flex-col bg-surface shadow-e4 transition-transform duration-300 ease-[var(--ease-emphasized)]',
            menuOpen ? 'translate-x-0' : 'translate-x-full',
          )}
        >
          <div className="flex items-center justify-between border-b border-border p-4 pr-5">
            <Logo />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMenuOpen(false)}
              aria-label="Close navigation menu"
              className="grid size-11 place-items-center rounded-xl text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <X aria-hidden />
            </Button>
          </div>

          <nav aria-label="Mobile" className="overflow-y-auto p-3">
            <ul className="flex flex-col gap-1">
              {MARKETING_NAV.map((item) => {
                const active = isRouteActive(item.href, pathname);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'flex min-h-12 w-full items-center rounded-xl px-4 py-3 text-body font-medium transition-colors',
                        active
                          ? 'bg-accent-surface text-accent-text font-semibold'
                          : 'text-foreground hover:bg-muted',
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export { MarketingHeader };
