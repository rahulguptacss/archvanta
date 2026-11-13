'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { CtaSectionData } from '../../types';

export default function Cta({ data }: { data: CtaSectionData }) {
  return (
    <section
      id="cta"
      className="relative w-full overflow-hidden bg-[#042D4B] py-8 sm:py-10 lg:py-12 xl:py-14"
    >
      {/* Background Image: Full-bleed HD architectural glass headquarters anchored to the right */}
      <div className="absolute inset-0 z-0">
        <Image
          src={data.background_image}
          alt={data.background_alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-right lg:object-[78%_center]"
        />

        {/* Navy/Blue Brand Color Scrim: Preserves signature rich dark navy color while ensuring high contrast for white & gold text */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#03253F] from-15% via-[#042D4B]/95 via-48% to-[#042D4B]/35 lg:via-[#042D4B]/70 lg:via-55% lg:to-[#042D4B]/15"
        />

        {/* Ambient Deep Navy Multiply Tint across the image to bring out the brand's architectural blue tone */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[#042D4B]/20 mix-blend-multiply"
        />

        {/* Subtle top and bottom blend lines */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-[#03253F]/40 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-[#03253F]/40 to-transparent"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="max-w-xl lg:max-w-2xl">
          {/* Main Headline */}
          <motion.h2
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="font-sans text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-[44px] xl:text-[48px] lg:leading-[1.14]"
          >
            <span className="block">{data.headline_line1}</span>
            <span className="block mt-1 sm:mt-1.5">
              <span>{data.headline_prefix} </span>
              <span className="text-[#FABF09]">{data.headline_highlight}</span>
            </span>
          </motion.h2>

          {/* CTA Pill Button */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.65,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-5 sm:mt-6 lg:mt-7"
          >
            <motion.a
              href={data.button_link}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 420, damping: 26 }}
              className="group inline-flex items-center gap-2.5 rounded-full bg-[#FABF09] px-6.5 py-2.5 text-[14px] font-bold text-[#0C243B] shadow-lg shadow-black/25 transition-all duration-200 hover:bg-[#FFC928] hover:shadow-xl hover:shadow-[#FABF09]/30 sm:px-7.5 sm:py-3 sm:text-[15px]"
            >
              <span>{data.button_text}</span>
              <ArrowRight className="h-4.5 w-4.5 stroke-[2.4] text-[#0C243B] transition-transform duration-200 group-hover:translate-x-1" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
