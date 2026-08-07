'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { ArrowRight, FileText, Home, LayoutDashboard, Moon, Search, Sun } from 'lucide-react';

import { useUiStore } from '@/stores/ui-store';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';

export interface CommandEntry {
  id: string;
  label: string;
  hint?: string;
  href: string;
}

interface CommandPaletteProps {
  /** Problem statements, passed down from a server component — no client fetch. */
  problems: CommandEntry[];
  pages: CommandEntry[];
}

/**
 * Global command palette. Opened by ⌘K / Ctrl-K anywhere, or by the search
 * button in either shell. Radix's Dialog underneath handles the focus trap,
 * scroll lock and restore-focus-on-close.
 */
function CommandPalette({ problems, pages }: CommandPaletteProps) {
  const router = useRouter();
  const { setTheme } = useTheme();
  const open = useUiStore((state) => state.commandOpen);
  const setOpen = useUiStore((state) => state.setCommandOpen);

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen(!useUiStore.getState().commandOpen);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [setOpen]);

  const run = React.useCallback(
    (action: () => void) => {
      setOpen(false);
      action();
    },
    [setOpen],
  );

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search problem statements, pages and actions…" />
      <CommandList>
        <CommandEmpty>
          <span className="flex flex-col items-center gap-1">
            <Search className="size-5 text-subtle-foreground" aria-hidden />
            No match. Try a domain — healthcare, phishing, dropout.
          </span>
        </CommandEmpty>

        <CommandGroup heading="Go to">
          {pages.map((page) => (
            <CommandItem
              key={page.id}
              value={`${page.label} ${page.hint ?? ''}`}
              onSelect={() => run(() => router.push(page.href))}
            >
              {page.href === '/' ? (
                <Home aria-hidden />
              ) : page.href.startsWith('/dashboard') ? (
                <LayoutDashboard aria-hidden />
              ) : (
                <FileText aria-hidden />
              )}
              <span>{page.label}</span>
              {page.hint ? (
                <span className="ml-auto text-caption text-subtle-foreground">{page.hint}</span>
              ) : null}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Problem statements">
          {problems.map((problem) => (
            <CommandItem
              key={problem.id}
              value={`${problem.label} ${problem.hint ?? ''}`}
              onSelect={() => run(() => router.push(problem.href))}
            >
              <ArrowRight aria-hidden />
              <span className="truncate">{problem.label}</span>
              {problem.hint ? (
                <span className="ml-auto shrink-0 font-mono text-[0.6875rem] text-subtle-foreground">
                  {problem.hint}
                </span>
              ) : null}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Theme">
          <CommandItem value="light theme" onSelect={() => run(() => setTheme('light'))}>
            <Sun aria-hidden />
            Light
            <CommandShortcut>L</CommandShortcut>
          </CommandItem>
          <CommandItem value="dark theme" onSelect={() => run(() => setTheme('dark'))}>
            <Moon aria-hidden />
            Dark
            <CommandShortcut>D</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

export { CommandPalette };
