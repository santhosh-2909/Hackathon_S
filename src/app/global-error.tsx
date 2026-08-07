'use client';

/**
 * Last-resort boundary — replaces the root layout, so it must render its own
 * `<html>` and `<body>` and cannot rely on providers, fonts or design tokens.
 * Styles are inline for exactly that reason.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100dvh',
          display: 'grid',
          placeItems: 'center',
          padding: '2rem',
          fontFamily: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
          background: '#ffffff',
          color: '#1a1d23',
        }}
      >
        <main style={{ maxWidth: '32rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.5rem', margin: '0 0 0.5rem', letterSpacing: '-0.02em' }}>
            The application failed to start
          </h1>
          <p style={{ margin: '0 0 1.5rem', color: '#6b7280', lineHeight: 1.6 }}>
            Something went wrong before the interface could render. Reloading usually clears it.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              font: 'inherit',
              fontWeight: 500,
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              border: 0,
              background: '#1a1d23',
              color: '#ffffff',
              cursor: 'pointer',
            }}
          >
            Reload
          </button>
          {error.digest ? (
            <p style={{ marginTop: '1.5rem', fontSize: '0.75rem', color: '#9ca3af' }}>
              ref: {error.digest}
            </p>
          ) : null}
        </main>
      </body>
    </html>
  );
}
