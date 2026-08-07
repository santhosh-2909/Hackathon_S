'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, LogOut, Menu, Search, Settings, User } from 'lucide-react';

import { cn, initials } from '@/lib/utils';
import { APP_NAV, APP_SECONDARY_NAV } from '@/config/navigation';
import { useUiStore } from '@/stores/ui-store';
import type { CurrentUser } from '@/types/workspace';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Sheet, SheetBody, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Logo } from '@/components/layout/logo';
import { ThemeToggle } from '@/components/layout/theme-toggle';

interface AppTopbarProps {
  user: CurrentUser;
  notifications: { id: string; title: string; body: string; at: string }[];
}

function AppTopbar({ user, notifications }: AppTopbarProps) {
  const pathname = usePathname();
  const toggleCommand = useUiStore((state) => state.toggleCommand);
  const mobileNavOpen = useUiStore((state) => state.mobileNavOpen);
  const setMobileNavOpen = useUiStore((state) => state.setMobileNavOpen);

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-3 border-b border-border bg-canvas/85 px-4 backdrop-blur-md sm:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        aria-label="Open navigation"
        onClick={() => setMobileNavOpen(true)}
      >
        <Menu aria-hidden />
      </Button>

      <Logo className="lg:hidden" />

      <Button
        variant="outline"
        size="sm"
        onClick={toggleCommand}
        className="ml-auto gap-2 pr-1.5 pl-2.5 text-muted-foreground lg:ml-0 lg:w-72 lg:justify-start"
      >
        <Search aria-hidden />
        <span className="hidden sm:inline">Search or jump to…</span>
        <kbd className="ml-auto hidden rounded border border-border bg-muted px-1.5 font-mono text-[0.625rem] tracking-widest sm:inline">
          ⌘K
        </kbd>
      </Button>

      <div className="ml-auto flex items-center gap-1">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              aria-label={`Notifications, ${notifications.length} unread`}
            >
              <Bell aria-hidden />
              {notifications.length > 0 ? (
                <span
                  aria-hidden
                  className="absolute top-1.5 right-1.5 size-2 rounded-full bg-accent ring-2 ring-canvas"
                />
              ) : null}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 p-0">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <p className="text-h6">Notifications</p>
              <Badge variant="neutral" size="sm">
                {notifications.length} new
              </Badge>
            </div>
            <ul className="max-h-80 overflow-y-auto">
              {notifications.map((item) => (
                <li key={item.id} className="border-b border-border px-4 py-3 last:border-b-0">
                  <p className="text-body-sm font-medium">{item.title}</p>
                  <p className="mt-0.5 text-caption text-muted-foreground">{item.body}</p>
                  <p className="mt-1 text-caption text-subtle-foreground">{item.at}</p>
                </li>
              ))}
            </ul>
          </PopoverContent>
        </Popover>

        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full" aria-label="Account menu">
              <Avatar className="size-7 border-0">
                <AvatarFallback className="bg-primary text-[0.625rem] text-primary-foreground">
                  {initials(user.name)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="flex flex-col gap-0.5 py-2 text-foreground">
              <span className="text-body-sm font-medium">{user.name}</span>
              <span className="text-caption font-normal text-muted-foreground">{user.email}</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/profile">
                <User aria-hidden />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings">
                <Settings aria-hidden />
                Settings
                <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild variant="danger">
              {/* Signing out lands on the public site — there is no sign-in
                  screen to return to. */}
              <Link href="/">
                <LogOut aria-hidden />
                Sign out
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile navigation drawer */}
      <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
        <SheetContent side="left" className="w-[min(18rem,85vw)]">
          <SheetHeader>
            <SheetTitle>Workspace</SheetTitle>
          </SheetHeader>
          <SheetBody className="flex flex-col gap-1">
            {[...APP_NAV, ...APP_SECONDARY_NAV].map((item) => {
              const active =
                item.href === '/dashboard'
                  ? pathname === item.href
                  : pathname.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileNavOpen(false)}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'flex min-h-11 items-center gap-3 rounded-md px-3 text-body-sm transition-colors',
                    active
                      ? 'bg-muted font-medium text-foreground'
                      : 'text-muted-foreground hover:bg-muted',
                  )}
                >
                  {Icon ? <Icon className="size-4" aria-hidden /> : null}
                  <span className="flex flex-col">
                    {item.label}
                    {item.description ? (
                      <span className="text-caption text-subtle-foreground">
                        {item.description}
                      </span>
                    ) : null}
                  </span>
                </Link>
              );
            })}
          </SheetBody>
        </SheetContent>
      </Sheet>
    </header>
  );
}

export { AppTopbar };
