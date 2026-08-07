import 'server-only';

import PptxGenJS from 'pptxgenjs';

import { DECK_META, DECK_SLIDES } from '@/constants/deck-template';

/**
 * Build the seven-slide template as a real .pptx.
 *
 * Colours are the design tokens converted to the hex PowerPoint expects — Office
 * has no notion of OKLCH, so these are resolved once here rather than being
 * re-derived per slide. Keep them in step with `src/styles/tokens.css`.
 */
const INK = '2A2822';
const MUTED = '545148';
const SUBTLE = '7A776B';
const ACCENT = '6C2DC9';
const CANVAS = 'FAF6DD';
const SUNKEN = 'F1EED6';

export async function buildDeckFile(): Promise<Buffer> {
  const pptx = new PptxGenJS();

  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'Hackathon_2026';
  pptx.company = 'Hackathon_2026';
  pptx.title = DECK_META.title;
  pptx.subject = DECK_META.subtitle;

  // A master so every slide shares one grid; editing the master in PowerPoint
  // then propagates, which is what makes this a template rather than seven
  // hand-drawn slides.
  pptx.defineSlideMaster({
    title: 'KIRA_MASTER',
    background: { color: CANVAS },
    objects: [
      { rect: { x: 0, y: 0, w: '100%', h: 0.06, fill: { color: ACCENT } } },
      {
        text: {
          text: DECK_META.title,
          options: {
            x: 0.5,
            y: 4.92,
            w: 6,
            h: 0.3,
            fontSize: 10,
            color: SUBTLE,
            fontFace: 'Arial',
          },
        },
      },
    ],
    slideNumber: { x: 9.0, y: 4.92, fontSize: 10, color: SUBTLE, fontFace: 'Arial' },
  });

  for (const slide of DECK_SLIDES) {
    const s = pptx.addSlide({ masterName: 'KIRA_MASTER' });

    s.addText(slide.label.toUpperCase(), {
      x: 0.5,
      y: 0.42,
      w: 5,
      h: 0.3,
      fontSize: 11,
      bold: true,
      charSpacing: 2,
      color: ACCENT,
      fontFace: 'Arial',
    });

    s.addText(slide.title, {
      x: 0.5,
      y: 0.78,
      w: 8.6,
      h: 0.82,
      fontSize: 30,
      bold: true,
      color: INK,
      fontFace: 'Georgia',
    });

    s.addText(slide.purpose, {
      x: 0.5,
      y: 1.62,
      w: 8.6,
      h: 0.36,
      fontSize: 12,
      italic: true,
      color: MUTED,
      fontFace: 'Arial',
    });

    s.addText(
      slide.bullets.map((text) => ({
        text,
        options: { bullet: { code: '2022' }, breakLine: true },
      })),
      {
        x: 0.5,
        y: 2.12,
        w: 8.6,
        h: 1.35,
        fontSize: 15,
        color: INK,
        fontFace: 'Arial',
        lineSpacingMultiple: 1.3,
      },
    );

    if (slide.example) {
      s.addShape('roundRect', {
        x: 0.5,
        y: 3.55,
        w: 8.6,
        h: 0.82,
        fill: { color: SUNKEN },
        line: { color: SUNKEN },
        rectRadius: 0.06,
      });
      s.addText(
        [
          { text: 'Filled in:  ', options: { bold: true, color: INK } },
          { text: slide.example, options: { color: MUTED } },
        ],
        {
          x: 0.72,
          y: 3.62,
          w: 8.16,
          h: 0.68,
          fontSize: 11,
          fontFace: 'Arial',
          valign: 'middle',
        },
      );
    }

    // Speaker notes carry the pitfall and the timing — guidance belongs off the
    // slide, where the audience never sees it.
    s.addNotes(
      `Budget ${slide.seconds}s.\n\nWhat kills this slide: ${slide.pitfall}\n\nPurpose: ${slide.purpose}`,
    );
  }

  // Deliberately no eighth slide. The timing budget lives on /deck and in each
  // slide's speaker notes — a reference slide inside the deck is one a team has
  // to remember to delete before presenting.

  const data = (await pptx.write({ outputType: 'nodebuffer' })) as Buffer;
  return data;
}

export const DECK_FILENAME = 'kira-hackathon-pitch-template.pptx';
