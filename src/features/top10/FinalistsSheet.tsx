'use client';

import { Trophy, Sparkles } from 'lucide-react';

import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { FinalistsLineup } from './FinalistsLineup';

/**
 * Floating cup/trophy button (bottom-right) that opens a side popup showcasing
 * this year's Top 10 finalists — the interactive FallingText "pit" plus the
 * full team lineup.
 */
export function FinalistsSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="View the Top 10 finalists"
          className="group fixed bottom-5 right-5 z-40 grid size-12 place-items-center rounded-full border border-amber-300/60 bg-gradient-to-b from-amber-300 to-amber-500 text-amber-950 shadow-e4 ring-1 ring-black/10 transition-transform duration-200 hover:scale-105 active:scale-95 sm:bottom-6 sm:right-6 sm:size-14"
        >
          <Trophy className="size-6 drop-shadow-sm sm:size-7" aria-hidden />
          <span className="sr-only">View the Top 10 finalists</span>
        </button>
      </SheetTrigger>

      <SheetContent side="right" className="w-full max-w-md bg-[#0b1120] max-w-[100vw]">
        <SheetHeader className="absolute inset-x-0 top-0 z-10 border-white/10 bg-[#0b1120]">
          <SheetTitle className="flex items-center gap-2 text-white pr-12">
            <Sparkles className="size-4 text-cyan-300" aria-hidden />
            Top 10 Finalists
          </SheetTitle>
        </SheetHeader>

        <SheetBody className="bg-[#0b1120] pt-20">
          <p className="mb-4 text-body-sm text-white/60">
            This year&apos;s innovation challenge lineup — drag the names around in the pit, or
            browse the full roster below.
          </p>
          <FinalistsLineup showPit columns={1} />
        </SheetBody>

        <SheetClose />
      </SheetContent>
    </Sheet>
  );
}
