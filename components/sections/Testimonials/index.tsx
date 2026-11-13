'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import type { TestimonialItem, TestimonialsSectionData } from '../../types';

export default function Testimonials({
  data,
}: {
  data: TestimonialsSectionData;
}) {
  const items = data.items || [];
  const count = items.length;
  // Per requirement: only slide if there are MORE than 2 items!
  const shouldSlide = count > 2;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-slide every 5 seconds when shouldSlide is true and not paused
  useEffect(() => {
    if (!shouldSlide || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % count);
    }, 5000);

    return () => clearInterval(interval);
  }, [shouldSlide, isPaused, count]);

  // When sliding, determine the two cards to display side by side
  const firstItem = items[currentIndex];
  const secondItem = shouldSlide
    ? items[(currentIndex + 1) % count]
    : items[1];

  // Helper card renderer with guaranteed identical height across all cards
  const renderCard = (item: TestimonialItem) => {
    if (!item) return null;

    return (
      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 hover:shadow-[0_12px_40px_rgb(0,0,0,0.1)] sm:flex-row">
        {/* Left Photo Container with Diagonal Cut and Gold Accent Stripe */}
        <div className="relative h-52 w-full shrink-0 overflow-hidden sm:h-full sm:min-h-[220px] sm:w-[35%] lg:w-[36%]">
          {/* Diagonal Clipped Photo */}
          <div
            className="absolute inset-0 z-0"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 76% 100%, 0 100%)',
            }}
          >
            <Image
              src={item.avatar}
              alt={item.avatar_alt}
              fill
              sizes="(max-width: 640px) 100vw, 260px"
              className="object-cover object-top sm:object-center"
            />
          </div>

          {/* SVG Diagonal Gold Accent Border Line */}
          <svg
            className="pointer-events-none absolute inset-0 z-10 h-full w-full"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
          >
            <line
              x1="100"
              y1="0"
              x2="76"
              y2="100"
              stroke="#EAA023"
              strokeWidth="3.5"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        {/* Right Content Area: flex-1 flex flex-col justify-between guarantees equal height and bottom alignment */}
        <div className="flex flex-1 flex-col justify-between p-5 sm:p-5.5 sm:pl-3 lg:p-6 lg:pl-3">
          <div className="flex-1">
            {/* Double Quote Icon in Gold */}
            <div className="text-[#EAA023]">
              <svg
                className="h-7 w-7 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            {/* Quote Text */}
            <p className="mt-2 text-[13px] leading-relaxed text-[#4A5568] sm:text-[14px]">
              {item.quote}
            </p>
          </div>

          <div className="mt-4 pt-2">
            {/* Gold Divider Line above author */}
            <span
              aria-hidden="true"
              className="block h-[2px] w-7 rounded-full bg-[#EAA023]"
            />

            {/* Bottom Row: Author details on left, 5 stars on right */}
            <div className="mt-2 flex items-center justify-between gap-3">
              <div>
                <h3 className="font-sans text-[15px] font-bold text-[#0C243B] sm:text-base">
                  {item.author_name}
                </h3>
                <p className="text-xs text-slate-500 sm:text-[12.5px]">
                  {item.role}
                </p>
              </div>

              {/* 5 Gold Stars */}
              <div
                className="flex items-center gap-0.5 text-[#EAA023]"
                aria-label={`${item.rating} out of 5 stars`}
              >
                {Array.from({ length: item.rating }).map((_, sIdx) => (
                  <Star
                    key={sIdx}
                    className="h-3.5 w-3.5 fill-[#EAA023] text-[#EAA023] sm:h-4 sm:w-4"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-white pt-10 pb-4 sm:pt-12 sm:pb-6 lg:pt-14 lg:pb-6"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header matching screenshot: Flanked Gold Lines + Centered Heading & Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          {/* Eyebrow with Flanking Gold Lines */}
          <div className="flex items-center justify-center gap-3">
            <span
              aria-hidden="true"
              className="h-[2px] w-8 rounded-full bg-[#EAA023] sm:w-10"
            />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0C243B] sm:text-[13px]">
              {data.eyebrow}
            </p>
            <span
              aria-hidden="true"
              className="h-[2px] w-8 rounded-full bg-[#EAA023] sm:w-10"
            />
          </div>

          {/* Main Heading: What Our (Navy) Clients Say (Gold) */}
          <h2 className="mt-3 font-sans text-3xl font-extrabold tracking-tight text-[#0C243B] sm:text-4xl lg:text-[44px]">
            <span>{data.heading_prefix} </span>
            <span className="text-[#EAA023]">{data.heading_highlight}</span>
          </h2>

          {/* Subtitle */}
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-500 sm:text-base">
            {data.subtitle}
          </p>
        </motion.div>

        {/* Testimonials Display with Guaranteed Equal Card Heights */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="mt-10 sm:mt-12"
        >
          {/* CASE 1: More than 2 items -> Carousel Slide with Auto-slide */}
          {shouldSlide ? (
            <div className="relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 26 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -26 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:gap-8"
                >
                  {/* First Card of current slide */}
                  <div className="flex h-full flex-col">
                    {renderCard(firstItem)}
                  </div>

                  {/* Second Card of current slide (hidden on small mobile, visible from md up) */}
                  <div className="hidden h-full flex-col md:flex">
                    {secondItem && renderCard(secondItem)}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Pagination Dots (Only rendered when > 2 items) */}
              <div className="mt-8 flex items-center justify-center gap-2">
                {items.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    onClick={() => setCurrentIndex(dotIdx)}
                    aria-label={`Go to slide ${dotIdx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentIndex === dotIdx
                        ? 'w-6 bg-[#EAA023]'
                        : 'w-2 bg-[#CBD5E1] hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          ) : (
            /* CASE 2: 2 or fewer items -> Static 2-column layout (NO SLIDE, NO AUTO-SLIDE, NO DOTS) */
            <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:gap-8">
              {items.map((item) => (
                <div key={item.id} className="flex h-full flex-col">
                  {renderCard(item)}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
