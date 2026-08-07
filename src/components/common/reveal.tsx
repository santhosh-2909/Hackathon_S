'use client';

import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface RevealProps extends React.ComponentProps<'div'> {
  /** Stagger index — each step adds 60ms. Keep under ~5 or the wait is felt. */
  delayStep?: number;
}

/**
 * Scroll reveal: a short rise on a decelerating curve, once, when the element
 * first enters the viewport.
 *
 * The register here is institutional, so motion is confidence-building rather
 * than playful — no overshoot, no parallax, ~12px of travel. When the OS asks
 * for reduced motion the element renders in place with no animation at all.
 */
function Reveal({ delayStep = 0, children, ...props }: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) return <div {...props}>{children}</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-64px' }}
      transition={{ duration: 0.42, ease: [0.2, 0, 0, 1], delay: delayStep * 0.06 }}
      {...(props as React.ComponentProps<typeof motion.div>)}
    >
      {children}
    </motion.div>
  );
}

export { Reveal };
