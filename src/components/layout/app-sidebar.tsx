'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';

import { cn } from '@/lib/utils';
import { APP_NAV, APP_SECONDARY_NAV, type NavItem } from '@/config/navigation';
import { useUiStore } from '@/stores/ui-store';
import { Logo } from '@/components/layout/logo';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

/**
 * Desktop sidebar. Collapsing swaps labels for tooltips rather than hiding the
 * nav entirely, so the destination set stays reachable at any width.
 */
function AppSidebar() {
  const collapsed = useUiStore((state) => state.sidebarCollapsed);
  const toggle = useUiStore((state) => state.toggleSidebar);

  return (
    <aside
      data-collapsed={collapsed}
      className={cn(
        'hidden shrink-0 flex-col border-r border-border bg-surface transition-[width] duration-200 ease-[var(--ease-standard)] lg:flex',
        collapsed ? 'w-16' : 'w-60',
      )}
    >
      <div
        className={cn(
          'flex h-16 items-center border-b border-border px-3',
          collapsed && 'justify-center',
        )}
      >
        <Logo showWordmark={!collapsed} />
      </div>

      <nav aria-label="Workspace" className="flex flex-1 flex-col gap-1 p-3">
        {APP_NAV.map((item) => (
          <SidebarLink key={item.href} item={item} collapsed={collapsed} />
        ))}

        <div className="mt-auto flex flex-col gap-1 border-t border-border pt-3">
          {APP_SECONDARY_NAV.map((item) => (
            <SidebarLink key={item.href} item={item} collapsed={collapsed} />
          ))}
          <Button
            variant="ghost"
            size={collapsed ? 'icon' : 'md'}
            onClick={toggle}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className={cn('mt-1', !collapsed && 'justify-start')}
          >
            {collapsed ? <PanelLeftOpen aria-hidden /> : <PanelLeftClose aria-hidden />}
            {!collapsed ? <span>Collapse</span> : null}
          </Button>
        </div>
      </nav>
    </aside>
  );
}

function SidebarLink({ item, collapsed }: { item: NavItem; collapsed: boolean }) {
  const pathname = usePathname();
  // `/dashboard` must not stay active on `/dashboard/library`.
  const active =
    item.href === '/dashboard' ? pathname === item.href : pathname.startsWith(item.href);
  const Icon = item.icon;

  const link = (
    <Link
      href={item.href}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'flex h-9 items-center gap-2.5 rounded-md px-2.5 text-body-sm transition-colors',
        'focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
        collapsed && 'justify-center px-0',
        active
          ? 'bg-muted font-medium text-foreground'
          : 'text-muted-foreground hover:bg-muted hover:text-foreground',
      )}
    >
      {Icon ? <Icon className="size-4 shrink-0" aria-hidden /> : null}
      {!collapsed ? <span className="truncate">{item.label}</span> : null}
      {collapsed ? <span className="sr-only">{item.label}</span> : null}
    </Link>
  );

  if (!collapsed) return link;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{link}</TooltipTrigger>
      <TooltipContent side="right">{item.label}</TooltipContent>
    </Tooltip>
  );
}

export { AppSidebar };
