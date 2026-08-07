import Link from 'next/link';

import { siteConfig } from '@/config/site';
import { FOOTER_NAV } from '@/config/navigation';
import { Logo } from '@/components/layout/logo';
import { ThemeToggle } from '@/components/layout/theme-toggle';

function MarketingFooter() {
  return (
    <footer className="border-t border-border bg-surface-sunken">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_repeat(3,1fr)] md:gap-8">
        <div className="flex max-w-xs flex-col gap-4">
          <Logo />
          <p className="text-body-sm text-muted-foreground">
            Direct, engineering-first, and unapologetically practical. Pick one persona and one
            pain, prove it in three conversations, then build the slice that demos.
          </p>
          <p className="rounded-md border border-border bg-surface px-3 py-2 font-mono text-caption text-muted-foreground">
            <span className="text-accent-text">mentor@hackathon</span>:~/workshop ${' '}
            <span className="text-foreground">build. test. ship.</span>
          </p>
        </div>

        {FOOTER_NAV.map((group) => (
          <nav key={group.title} aria-labelledby={`footer-${group.title}`}>
            <h2 id={`footer-${group.title}`} className="text-h6">
              {group.title}
            </h2>
            <ul className="mt-3 flex flex-col gap-2">
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="rounded-xs text-body-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-5 sm:flex-row">
          <p className="text-caption text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name}. Problem statements are reproduced for
            study — verify every code on the live portal.
          </p>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}

export { MarketingFooter };
