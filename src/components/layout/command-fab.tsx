'use client';

import { Command } from 'lucide-react';

import { useUiStore } from '@/stores/ui-store';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

/**
 * Floating command-palette launcher.
 *
 * A pointer-reachable equivalent of ⌘K, for the majority who never learn the
 * shortcut. Hidden below `sm` — on a phone it would sit on top of content and
 * duplicate the search already in the drawer.
 */
function CommandFab() {
  const toggleCommand = useUiStore((state) => state.toggleCommand);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={toggleCommand}
          aria-label="Open command palette"
          aria-keyshortcuts="Meta+K Control+K"
          className={[
            'fixed bottom-6 left-6 z-30 hidden size-14 place-items-center rounded-full sm:grid',
            'border border-accent-soft-border bg-accent-soft text-accent-soft-foreground shadow-e3',
            'transition-[background-color,transform] duration-150 ease-[var(--ease-standard)]',
            'hover:bg-accent-soft-hover active:translate-y-px',
            'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none',
          ].join(' ')}
        >
          <Command className="size-5" aria-hidden />
        </button>
      </TooltipTrigger>
      <TooltipContent side="right">
        Search everything <span className="ml-1 font-mono opacity-70">⌘K</span>
      </TooltipContent>
    </Tooltip>
  );
}

export { CommandFab };
