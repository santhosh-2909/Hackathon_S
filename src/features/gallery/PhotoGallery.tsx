'use client';

import * as React from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Maximize2,
  X,
} from 'lucide-react';

import { GALLERY_PHOTOS, GALLERY_TOTAL } from './data';

const AUTOPLAY_MS = 4500;
const SWIPE_THRESHOLD = 56;

function prevIndex(i: number) {
  return (i - 1 + GALLERY_TOTAL) % GALLERY_TOTAL;
}
function nextIndex(i: number) {
  return (i + 1) % GALLERY_TOTAL;
}

/**
 * Premium KIRA 2026 photo gallery — one image at a time, at the very top of
 * the site. Supports prev/next, counter, pagination dots, autoplay, download,
 * a fullscreen lightbox, touch swipe, and keyboard navigation. Built without
 * extra dependencies and is fully accessible / reduced-motion aware.
 */
export function PhotoGallery() {
  const reduced = useReducedMotion();
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const [lightbox, setLightbox] = React.useState(false);
  const [failed, setFailed] = React.useState<Record<string, boolean>>({});

  const photo = GALLERY_PHOTOS[index]!;
  const next = GALLERY_PHOTOS[nextIndex(index)]!;
  const count = GALLERY_TOTAL;

  const go = React.useCallback((fn: (i: number) => number) => {
    setIndex((i) => fn(i));
    setPaused(true);
  }, []);

  // Autoplay while not paused and not in the lightbox.
  React.useEffect(() => {
    if (paused || lightbox || reduced) return;
    const id = window.setInterval(() => setIndex((i) => nextIndex(i)), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, lightbox, reduced, index]);

  // Preload the upcoming photo so navigation feels instant.
  React.useEffect(() => {
    const img = new Image();
    img.src = next.imageUrl;
  }, [next.imageUrl]);

  const swipeStart = React.useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    swipeStart.current = e.touches[0]!.clientX;
    setPaused(true);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (swipeStart.current == null) return;
    const dx = e.changedTouches[0]!.clientX - swipeStart.current;
    if (Math.abs(dx) > SWIPE_THRESHOLD) {
      setIndex((i) => (dx < 0 ? nextIndex(i) : prevIndex(i)));
    }
    swipeStart.current = null;
  };

  const openLightbox = () => setLightbox(true);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') go(prevIndex);
    else if (e.key === 'ArrowRight') go(nextIndex);
  };

  const failedCurrent = failed[photo.imageUrl];

  return (
    <section className="relative overflow-hidden border-b border-border bg-surface-inverse text-surface-inverse-foreground">
      {/* soft premium glow behind the showcase */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[50rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.22),transparent_65%)] blur-3xl"
        aria-hidden
      />

      <div className="container-page flex flex-col items-center gap-6 py-12 md:gap-8 md:py-16">
        {/* Heading */}
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-accent-on-inverse">
            KIRA 2026
          </span>
          <h2 className="font-display text-h2 font-semibold text-white">
            Moments From The Journey
          </h2>
          <p className="max-w-md text-body-sm text-white/60">
            Celebrating the teams, ideas and moments that brought us to the final round.
          </p>
        </div>

        {/* Photo stage */}
        <div
          className="relative w-full max-w-[1200px]"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onKeyDown={handleKey}
          tabIndex={0}
          role="group"
          aria-roledescription="carousel"
          aria-label="KIRA 2026 event photos"
        >
          <figure className="relative flex aspect-[4/3] max-h-[70vh] w-full items-center justify-center overflow-hidden rounded-[28px] border border-white/10 bg-[#070a14] shadow-e4">
            <AnimatePresence initial={false} mode="sync">
              <motion.img
                key={photo.id}
                src={photo.imageUrl}
                alt={photo.alt}
                loading={index === 0 ? 'eager' : 'lazy'}
                onError={() => setFailed((f) => ({ ...f, [photo.imageUrl]: true }))}
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduced ? undefined : { opacity: 0 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="h-full w-full object-contain"
                draggable={false}
              />
            </AnimatePresence>

            {failedCurrent && (
              <div className="absolute inset-0 grid place-items-center bg-[#070a14] text-sm text-white/50">
                Photo unavailable
              </div>
            )}

            {/* Prev / Next */}
            <button
              type="button"
              onClick={() => go(prevIndex)}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-black/40 p-2.5 text-white backdrop-blur transition-colors hover:bg-black/70 focus-visible:outline-2 focus-visible:outline-cyan-300 sm:p-3.5"
            >
              <ChevronLeft className="size-5 sm:size-6" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => go(nextIndex)}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-black/40 p-2.5 text-white backdrop-blur transition-colors hover:bg-black/70 focus-visible:outline-2 focus-visible:outline-cyan-300 sm:p-3.5"
            >
              <ChevronRight className="size-5 sm:size-6" aria-hidden />
            </button>

            {/* Fullscreen */}
            <button
              type="button"
              onClick={openLightbox}
              aria-label="View fullscreen"
              className="absolute right-3 top-3 rounded-full border border-white/15 bg-black/40 p-2 text-white backdrop-blur transition-colors hover:bg-black/70 focus-visible:outline-2 focus-visible:outline-cyan-300"
            >
              <Maximize2 className="size-4" aria-hidden />
            </button>

            {/* Counter */}
            <span className="pointer-events-none absolute left-3 top-3 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 font-mono text-[0.6875rem] font-semibold tracking-widest text-white/80 backdrop-blur">
              Photo {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
            </span>
          </figure>

          {/* Caption */}
          <figcaption className="sr-only">{photo.title}</figcaption>
        </div>

        {/* Controls row */}
        <div className="flex flex-col items-center gap-4">
          {/* Pagination dots */}
          <div className="flex max-w-full flex-wrap justify-center gap-1.5">
            {GALLERY_PHOTOS.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to photo ${i + 1}`}
                aria-current={i === index}
                className={
                  i === index
                    ? 'size-2.5 rounded-full bg-amber-300 transition-colors'
                    : 'size-2.5 rounded-full bg-white/20 transition-colors hover:bg-white/50'
                }
              />
            ))}
          </div>

          {/* Download current photo */}
          <a
            href={photo.downloadUrl}
            download={photo.fileName}
            rel="noopener"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-amber-300/40 bg-amber-300/10 px-5 py-2 text-sm font-semibold text-amber-100 transition-colors hover:bg-amber-300/20 focus-visible:outline-2 focus-visible:outline-cyan-300"
          >
            <Download className="size-4" aria-hidden />
            Download Photo
          </a>
        </div>
      </div>

      {/* Fullscreen lightbox */}
      <AnimatePresence>
        {lightbox && (
          <Lightbox
            index={index}
            failed={failed}
            onError={(url) => setFailed((f) => ({ ...f, [url]: true }))}
            onClose={() => setLightbox(false)}
            onPrev={() => setIndex(prevIndex)}
            onNext={() => setIndex(nextIndex)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function Lightbox({
  index,
  failed,
  onError,
  onClose,
  onPrev,
  onNext,
}: {
  index: number;
  failed: Record<string, boolean>;
  onError: (url: string) => void;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const reduced = useReducedMotion();
  const photo = GALLERY_PHOTOS[index]!;
  const count = GALLERY_TOTAL;
  const swipeStart = React.useRef<number | null>(null);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    else if (e.key === 'ArrowLeft') onPrev();
    else if (e.key === 'ArrowRight') onNext();
  };

  const onTouchStart = (e: React.TouchEvent) => {
    swipeStart.current = e.touches[0]!.clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (swipeStart.current == null) return;
    const dx = e.changedTouches[0]!.clientX - swipeStart.current;
    if (Math.abs(dx) > SWIPE_THRESHOLD) {
      if (dx < 0) onNext();
      else onPrev();
    }
    swipeStart.current = null;
  };

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Photo fullscreen viewer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={reduced ? { duration: 0 } : { duration: 0.2 }}
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black/90 p-3 backdrop-blur-sm sm:p-6"
      onKeyDown={handleKey}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      tabIndex={-1}
    >
      {/* back layer closes on outside tap */}
      <div className="absolute inset-0 -z-10" onClick={onClose} aria-hidden />

      {/* header controls */}
      <div className="absolute left-3 top-3 z-10 sm:left-6 sm:top-6">
        <span className="rounded-full border border-white/15 bg-black/50 px-2.5 py-1 font-mono text-xs tracking-widest text-white/80">
          {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
        </span>
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-3 top-3 z-10 rounded-full border border-white/15 bg-black/50 p-2.5 text-white transition-colors hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-cyan-300 sm:right-6 sm:top-6"
      >
        <X className="size-5" aria-hidden />
      </button>

      {/* main image */}
      <figure className="relative flex max-h-full w-full max-w-5xl items-center justify-center">
        <div className="relative flex h-[68vh] w-full items-center justify-center">
          <AnimatePresence initial={false} mode="sync">
            <motion.img
              key={photo.id}
              src={photo.imageUrl}
              alt={photo.alt}
              onError={() => onError(photo.imageUrl)}
              initial={reduced ? false : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduced ? undefined : { opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="max-h-full w-full object-contain"
              draggable={false}
            />
          </AnimatePresence>
          {failed[photo.imageUrl] && (
            <div className="absolute inset-0 grid place-items-center text-sm text-white/50">
              Photo unavailable
            </div>
          )}
        </div>
      </figure>

      {/* prev / next */}
      <button
        type="button"
        onClick={onPrev}
        aria-label="Previous photo"
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-black/40 p-3 text-white transition-colors hover:bg-black/70 focus-visible:outline-2 focus-visible:outline-cyan-300"
      >
        <ChevronLeft className="size-6" aria-hidden />
      </button>
      <button
        type="button"
        onClick={onNext}
        aria-label="Next photo"
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-black/40 p-3 text-white transition-colors hover:bg-black/70 focus-visible:outline-2 focus-visible:outline-cyan-300"
      >
        <ChevronRight className="size-6" aria-hidden />
      </button>

      {/* footer: download */}
      <a
        href={photo.downloadUrl}
        download={photo.fileName}
        rel="noopener"
        className="absolute bottom-4 left-1/2 inline-flex min-h-11 -translate-x-1/2 items-center gap-2 rounded-full border border-amber-300/40 bg-amber-300/15 px-5 py-2 text-sm font-semibold text-amber-100 transition-colors hover:bg-amber-300/25 focus-visible:outline-2 focus-visible:outline-cyan-300"
      >
        <Download className="size-4" aria-hidden />
        Download Photo
      </a>
    </motion.div>
  );
}
