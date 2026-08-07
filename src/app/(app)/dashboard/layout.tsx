import { getCurrentUser } from '@/services/workspace';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { AppTopbar } from '@/components/layout/app-topbar';
import { CommandPaletteMount } from '@/components/layout/command-palette-mount';

const NOTIFICATIONS = [
  {
    id: 'n1',
    title: 'Review notes on Homoglyph Watch',
    body: 'Raghav Menon left three comments on the submission.',
    at: '2 Aug 2026, 21:04',
  },
  {
    id: 'n2',
    title: 'Validation target reached',
    body: 'Sentiment analysis of e-consultation comments now has 3 interviews.',
    at: '3 Aug 2026, 10:12',
  },
  {
    id: 'n3',
    title: 'Invitation pending',
    body: 'priya@kira.dev has not accepted yet.',
    at: '2 Aug 2026, 12:30',
  },
];

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  return (
    <div className="flex min-h-dvh bg-canvas">
      <AppSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppTopbar user={user} notifications={NOTIFICATIONS} />
        <main id="main" className="flex-1 px-4 py-6 sm:px-6 sm:py-8">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">{children}</div>
        </main>
      </div>
      <CommandPaletteMount />
    </div>
  );
}
