'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion, type PanInfo } from 'framer-motion';
import type { HeroSectionData } from '../../types';

export default function Hero({ data }: { data: HeroSectionData }) {
  const slides = data.slides;
  const count = slides.length;
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (count <= 1 || isPaused) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % count);
    }, 6500);
    return () => clearInterval(interval);
  }, [count, isPaused]);

  if (count === 0) return null;

  const activeSlide = slides[current] ?? slides[0];

  const prev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + count) % count);
  };

  const next = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % count);
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.x > 50 || info.velocity.x > 250) {
      prev();
    } else if (info.offset.x < -50 || info.velocity.x < -250) {
      next();
    }
  };

  const variants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 30 : -30,
    }),
    center: {
      opacity: 1,
      x: 0,
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -30 : 30,
    }),
  };

  return (
    <section
      id="home"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative flex min-h-[460px] w-full items-center overflow-hidden bg-[#0C243B] py-10 sm:min-h-[520px] sm:py-12 lg:min-h-[560px] lg:py-14"
    >
      {/* Background Image Carousel */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={activeSlide.id}
            custom={direction}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={activeSlide.background_image}
              alt={activeSlide.background_alt}
              fill
              priority
              sizes="100vw"
              className="object-cover object-right lg:object-center"
            />
          </motion.div>
        </AnimatePresence>

        {/* Cinematic Left Gradient Overlay matching screenshot */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C243B] via-[#0C243B]/85 to-transparent sm:via-[#0C243B]/75" />
        <div className="absolute inset-0 bg-[#0C243B]/30 md:hidden" />
      </div>

      {/* Far Left Slider Arrow */}
      <button
        type="button"
        onClick={prev}
        aria-label={data.prev_slide_aria}
        className="absolute left-0 top-1/2 z-30 flex h-11 w-8 -translate-y-1/2 items-center justify-center rounded-r-[4px] bg-black/45 text-white/90 shadow-md backdrop-blur-xs transition-all hover:bg-[#EAA023] hover:text-[#0C243B] focus:outline-none sm:h-12 sm:w-9"
      >
        <ChevronLeft className="h-5 w-5 stroke-[2.2] sm:h-6 sm:w-6" />
      </button>

      {/* Far Right Slider Arrow */}
      <button
        type="button"
        onClick={next}
        aria-label={data.next_slide_aria}
        className="absolute right-0 top-1/2 z-30 flex h-11 w-8 -translate-y-1/2 items-center justify-center rounded-l-[4px] bg-black/45 text-white/90 shadow-md backdrop-blur-xs transition-all hover:bg-[#EAA023] hover:text-[#0C243B] focus:outline-none sm:h-12 sm:w-9"
      >
        <ChevronRight className="h-5 w-5 stroke-[2.2] sm:h-6 sm:w-6" />
      </button>

      {/* Slide Content with Swipe Gestures */}
      <div className="relative z-20 mx-auto w-full max-w-7xl px-8 sm:px-12 lg:px-16">
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          className="max-w-2xl cursor-grab active:cursor-grabbing pl-4 pr-8 sm:pl-6 sm:pr-14 lg:pl-6 lg:pr-20"
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeSlide.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              {/* Eyebrow */}
              <div className="flex items-center gap-2.5">
                <span className="h-[2px] w-6 bg-[#EAA023] sm:w-8" />
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white sm:text-[12px]">
                  {activeSlide.eyebrow}
                </p>
              </div>

              {/* Main Headline */}
              <h1 className="mt-2.5 font-sans text-3xl font-extrabold tracking-tight text-white sm:mt-3 sm:text-4xl lg:text-[48px] lg:leading-[1.14]">
                <span>{activeSlide.headline_first}</span>
                <span className="block text-[#EAA023]">
                  {activeSlide.headline_highlight}
                </span>
              </h1>

              {/* Description */}
              <p className="mt-3 max-w-lg text-[13px] leading-relaxed text-[#D2DCE8] sm:text-[14.5px]">
                {activeSlide.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Subtle Slide Dot Indicators at Bottom */}
      {count > 1 && (
        <div className="absolute bottom-3 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 sm:bottom-4">
          {slides.map((_, sIdx) => (
            <button
              key={sIdx}
              type="button"
              onClick={() => {
                setDirection(sIdx > current ? 1 : -1);
                setCurrent(sIdx);
              }}
              aria-label={`Slide ${sIdx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                sIdx === current
                  ? 'w-6 bg-[#EAA023]'
                  : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
