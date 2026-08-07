'use client';

import * as React from 'react';

/**
 * Observe an element's content-box size.
 *
 * Charts render at real pixel dimensions rather than scaling a fixed viewBox, so
 * a 2px line stays 2px and a 12px label stays 12px at every breakpoint. That
 * requires knowing the actual width.
 */
export function useElementSize<T extends HTMLElement>() {
  const ref = React.useRef<T | null>(null);
  const [size, setSize] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const box = entry.contentRect;
      setSize((prev) =>
        prev.width === box.width && prev.height === box.height
          ? prev
          : { width: box.width, height: box.height },
      );
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, size] as const;
}
