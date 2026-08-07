'use client';

import * as React from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { ErrorState } from '@/components/common/error-state';

/**
 * Route-level boundary. Catches render errors in any nested segment and offers
 * `reset()`, which re-renders the segment without a full page reload.
 */
export default function RouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // Wire this to the real reporter when one exists.
    console.error('Route error:', error);
  }, [error]);

  return (
    <div className="container-page flex min-h-[60vh] items-center justify-center py-16">
      <ErrorState
        reference={error.digest}
        onRetry={reset}
        actions={
          <Button asChild variant="ghost">
            <Link href="/">Back home</Link>
          </Button>
        }
        className="max-w-xl"
      />
    </div>
  );
}
