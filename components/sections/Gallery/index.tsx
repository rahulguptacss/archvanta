'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import type { GallerySectionData } from '../../types';

export default function Gallery({ data }: { data: GallerySectionData }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const count = data.images?.length || 0;

  useEffect(() => {
    if (selectedIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowRight') {
        setSelectedIndex((i) => (i === null ? null : (i + 1) % count));
      }
      if (e.key === 'ArrowLeft') {
        setSelectedIndex((i) => (i === null ? null : (i - 1 + count) % count));
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedIndex, count]);

  const activeItem =
    selectedIndex !== null && data.images[selectedIndex]
      ? data.images[selectedIndex]
      : null;

  // The 5 photos corresponding to screenshot:
  // Item 0: Left tall card (Office building)
  // Item 1: Center top card (Villa)
  // Item 2: Right top card (Crane)
  // Item 3: Center bottom card (Warehouse)
  // Item 4: Right bottom card (Apartment)
  const item0 = data.images[0];
  const item1 = data.images[1];
  const item2 = data.images[2];
  const item3 = data.images[3];
  const item4 = data.images[4];

  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-white pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-24"
    >
      {/* Decorative Top-Left Angled Navy Corner Wedge with Gold Diagonal Border Line */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-0 h-24 w-36 sm:h-32 sm:w-52 lg:h-40 lg:w-64 overflow-hidden"
      >
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <polygon points="0,0 100,0 0,100" fill="#0C243B" />
          <line
            x1="100"
            y1="0"
            x2="0"
            y2="100"
            stroke="#EAA023"
            strokeWidth="4"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      {/* Decorative Bottom-Right Angled Navy Corner Wedge with Gold Diagonal Border Line */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 z-0 h-24 w-36 sm:h-32 sm:w-52 lg:h-40 lg:w-64 overflow-hidden"
      >
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <polygon points="100,0 100,100 0,100" fill="#0C243B" />
          <line
            x1="0"
            y1="100"
            x2="100"
            y2="0"
            stroke="#EAA023"
            strokeWidth="4"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header matching screenshot: Flanked Gold Lines + Center Gold Icon + "Project Gallery" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          {/* Gold Horizontal Lines flanking Center Gold Gallery Icon */}
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <span
              aria-hidden="true"
              className="h-[2px] w-12 rounded-full bg-[#EAA023] sm:w-16"
            />
            <div className="flex items-center justify-center text-[#EAA023]">
              <svg
                className="h-7 w-7 sm:h-8 sm:w-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#EAA023"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect width="18" height="18" x="3" y="3" rx="3.5" ry="3.5" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
            </div>
            <span
              aria-hidden="true"
              className="h-[2px] w-12 rounded-full bg-[#EAA023] sm:w-16"
            />
          </div>

          {/* Heading: Project (Navy) Gallery (Gold) */}
          <h2 className="mt-3.5 font-sans text-3xl font-extrabold tracking-tight text-[#0C243B] sm:text-4xl lg:text-[44px]">
            <span>{data.heading_prefix} </span>
            <span className="text-[#EAA023]">{data.heading_highlight}</span>
          </h2>
        </motion.div>

        {/* 3-Column / 5-Photo Mosaic Grid matching screenshot */}
        <div className="mt-9 grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-5.5 xl:gap-6">
          {/* Column 1: Left Tall Hero Card (Office Building) */}
          {item0 && (
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="h-full"
            >
              <button
                type="button"
                onClick={() => setSelectedIndex(0)}
                className="group relative block h-[340px] w-full cursor-pointer overflow-hidden rounded-2xl bg-slate-100 text-left shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EAA023] sm:h-[420px] lg:h-full"
                aria-label={item0.alt}
              >
                <Image
                  src={item0.src}
                  alt={item0.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                  priority
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/28">
                  <div className="flex h-11 w-11 scale-75 items-center justify-center rounded-full bg-white/95 text-[#0C243B] opacity-0 shadow-lg transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 hover:bg-[#EAA023] hover:text-white">
                    <ZoomIn className="h-5 w-5" />
                  </div>
                </div>
              </button>
            </motion.div>
          )}

          {/* Column 2: Center Stacked Cards (Top: Villa, Bottom: Warehouse) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.6,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-col gap-4 sm:gap-5 lg:gap-5.5 xl:gap-6"
          >
            {/* Center Top: Luxury Villa (Item 1) */}
            {item1 && (
              <button
                type="button"
                onClick={() => setSelectedIndex(1)}
                className="group relative aspect-[16/10.8] w-full cursor-pointer overflow-hidden rounded-2xl bg-slate-100 text-left shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EAA023]"
                aria-label={item1.alt}
              >
                <Image
                  src={item1.src}
                  alt={item1.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 30vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/28">
                  <div className="flex h-10 w-10 scale-75 items-center justify-center rounded-full bg-white/95 text-[#0C243B] opacity-0 shadow-lg transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 hover:bg-[#EAA023] hover:text-white">
                    <ZoomIn className="h-5 w-5" />
                  </div>
                </div>
              </button>
            )}

            {/* Center Bottom: Industrial Warehouse (Item 3) */}
            {item3 && (
              <button
                type="button"
                onClick={() => setSelectedIndex(3)}
                className="group relative aspect-[16/10.8] w-full cursor-pointer overflow-hidden rounded-2xl bg-slate-100 text-left shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EAA023]"
                aria-label={item3.alt}
              >
                <Image
                  src={item3.src}
                  alt={item3.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 30vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/28">
                  <div className="flex h-10 w-10 scale-75 items-center justify-center rounded-full bg-white/95 text-[#0C243B] opacity-0 shadow-lg transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 hover:bg-[#EAA023] hover:text-white">
                    <ZoomIn className="h-5 w-5" />
                  </div>
                </div>
              </button>
            )}
          </motion.div>

          {/* Column 3: Right Stacked Cards (Top: Crane, Bottom: Apartment) */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.6,
              delay: 0.16,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-col gap-4 sm:gap-5 lg:gap-5.5 xl:gap-6"
          >
            {/* Right Top: Construction Crane Structure (Item 2) */}
            {item2 && (
              <button
                type="button"
                onClick={() => setSelectedIndex(2)}
                className="group relative aspect-[16/10.8] w-full cursor-pointer overflow-hidden rounded-2xl bg-slate-100 text-left shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EAA023]"
                aria-label={item2.alt}
              >
                <Image
                  src={item2.src}
                  alt={item2.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 30vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/28">
                  <div className="flex h-10 w-10 scale-75 items-center justify-center rounded-full bg-white/95 text-[#0C243B] opacity-0 shadow-lg transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 hover:bg-[#EAA023] hover:text-white">
                    <ZoomIn className="h-5 w-5" />
                  </div>
                </div>
              </button>
            )}

            {/* Right Bottom: Apartment Complex (Item 4) */}
            {item4 && (
              <button
                type="button"
                onClick={() => setSelectedIndex(4)}
                className="group relative aspect-[16/10.8] w-full cursor-pointer overflow-hidden rounded-2xl bg-slate-100 text-left shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EAA023]"
                aria-label={item4.alt}
              >
                <Image
                  src={item4.src}
                  alt={item4.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 30vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/28">
                  <div className="flex h-10 w-10 scale-75 items-center justify-center rounded-full bg-white/95 text-[#0C243B] opacity-0 shadow-lg transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 hover:bg-[#EAA023] hover:text-white">
                    <ZoomIn className="h-5 w-5" />
                  </div>
                </div>
              </button>
            )}
          </motion.div>
        </div>
      </div>

      {/* Lightbox Modal Preview */}
      <AnimatePresence>
        {activeItem && selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#071324]/92 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 12 }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/15 bg-[#0C243B] p-3 shadow-2xl sm:p-5"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedIndex(null)}
                aria-label={data.close_aria_label}
                className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-[#EAA023] hover:text-[#0C243B]"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Prev Navigation Button */}
              <button
                type="button"
                onClick={() =>
                  setSelectedIndex((selectedIndex - 1 + count) % count)
                }
                aria-label={data.prev_aria_label}
                className="absolute left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-[#EAA023] hover:text-[#0C243B]"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {/* Next Navigation Button */}
              <button
                type="button"
                onClick={() => setSelectedIndex((selectedIndex + 1) % count)}
                aria-label={data.next_aria_label}
                className="absolute right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-[#EAA023] hover:text-[#0C243B]"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Modal Image Box */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-black">
                <Image
                  src={activeItem.src}
                  alt={activeItem.alt}
                  fill
                  sizes="(max-width: 1024px) 95vw, 920px"
                  className="object-contain"
                />
              </div>

              {/* Caption & Counter */}
              <div className="mt-3 flex items-center justify-between px-1 text-white">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-[#EAA023] px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[#0C243B]">
                    {activeItem.category}
                  </span>
                  <p className="line-clamp-1 text-xs text-white/80 sm:text-sm">
                    {activeItem.alt}
                  </p>
                </div>
                <span className="font-sans text-xs font-bold text-[#EAA023]">
                  {selectedIndex + 1} / {count}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
