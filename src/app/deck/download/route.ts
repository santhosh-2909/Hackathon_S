import { buildDeckFile, DECK_FILENAME } from '@/services/deck-file';

/**
 * Serves the template as a real .pptx.
 *
 * Generated once at build time and cached — the file is derived from a constant,
 * so regenerating it per request would burn CPU to produce identical bytes.
 */
export const dynamic = 'force-static';

export async function GET() {
  const file = await buildDeckFile();

  return new Response(new Uint8Array(file), {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'Content-Disposition': `attachment; filename="${DECK_FILENAME}"`,
      'Content-Length': String(file.byteLength),
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
