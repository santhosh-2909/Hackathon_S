import { MarketingHeader } from '@/components/layout/marketing-header';
import { MarketingFooter } from '@/components/layout/marketing-footer';
import { CommandPaletteMount } from '@/components/layout/command-palette-mount';
import { CommandFab } from '@/components/layout/command-fab';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <MarketingHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <MarketingFooter />
      <CommandPaletteMount />
      <CommandFab />
    </div>
  );
}
