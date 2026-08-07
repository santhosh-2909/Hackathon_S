'use client';

import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

/**
 * `false` during SSR and the hydration pass, `true` afterwards.
 *
 * Used by controls whose correct value is only knowable in the browser — the
 * resolved theme, for instance. `useSyncExternalStore` gives React separate
 * server and client snapshots, so this needs no state and no effect, and it does
 * not trip the cascading-render rule that `useState` + `useEffect` does.
 */
export function useIsHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
