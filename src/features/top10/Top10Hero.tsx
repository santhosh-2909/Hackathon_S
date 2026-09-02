'use client';

import dynamic from 'next/dynamic';
import { PartyPopper } from 'lucide-react';

import { Badge } from '@/components/ui/badge';

const AcidSquares = dynamic(() => import('./AcidSquares'), { ssr: false });

/**
 * Animated hero background for the Top 10 page powered by the AcidSquares
 * WebGL fragment shader. Content sits on a glass panel above the animation.
 */
export function Top10Hero() {
  return (
    <section className="relative h-[420px] w-full overflow-hidden rounded-[28px] border border-border">
      <AcidSquares
        color1="#5227FF"
        color2="#A855F7"
        color3="#FFFFFF"
        detail="medium"
        speed={0.7}
        waveDepth={1}
        zoom={1.3}
        density={10}
        glow={1}
        exposure={2700}
        spread={0.3}
        stepSize={0.002}
        colorShift={0}
        contrast={1}
        brightness={1}
        opacity={1}
        mouseInteraction
        mouseStrength={0.1}
        mouseRadius={0.35}
        blur={0}
        grain
        grainIntensity={0.05}
      />

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/25 px-6 text-center">
        <Badge variant="accent" size="md">
          <PartyPopper className="size-3.5" />
          Announcement
        </Badge>
        <h1 className="font-display text-display-lg text-white drop-shadow-lg">
          Top 10 Finalists!
        </h1>
        <p className="max-w-2xl text-body-lg text-white/90 drop-shadow">
          These 10 amazing teams have showcased outstanding{' '}
          <span className="font-semibold">creativity, innovation,</span> and hard work to reach
          this stage!
        </p>
      </div>
    </section>
  );
}
