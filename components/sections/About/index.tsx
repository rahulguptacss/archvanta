'use client';

import React from 'react';
import Image from 'next/image';
import { Award, Building2, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import type { AboutSectionData } from '../../types';

export default function About({ data }: { data: AboutSectionData }) {
  const iconMap: Record<string, React.ReactNode> = {
    Award: (
      <Award className="h-8 w-8 stroke-[1.8] text-[#EAA023] transition-transform duration-300 group-hover:scale-110 sm:h-9 sm:w-9" />
    ),
    Users: (
      <Users className="h-8 w-8 stroke-[1.8] text-[#EAA023] transition-transform duration-300 group-hover:scale-110 sm:h-9 sm:w-9" />
    ),
    Building2: (
      <Building2 className="h-8 w-8 stroke-[1.8] text-[#EAA023] transition-transform duration-300 group-hover:scale-110 sm:h-9 sm:w-9" />
    ),
  };

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-white py-10 sm:py-12 lg:py-14"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-14">
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-2.5">
              <span className="h-[2px] w-6 bg-[#EAA023] sm:w-8" />
              <p className="text-[11.5px] font-bold uppercase tracking-[0.22em] text-[#0C243B] sm:text-[12px]">
                {data.eyebrow}
              </p>
            </div>

            {/* Main Heading */}
            <h2 className="mt-2.5 font-sans text-3xl font-extrabold tracking-tight text-[#0C243B] sm:text-4xl lg:text-[42px] lg:leading-[1.14]">
              <span>{data.heading_prefix} </span>
              <span className="text-[#EAA023]">{data.heading_highlight}</span>
            </h2>

            {/* Paragraph 1 */}
            <p className="mt-4 text-[13px] leading-relaxed text-[#5A6878] sm:text-[14px]">
              {data.description_p1}
            </p>

            {/* Paragraph 2 */}
            <p className="mt-2.5 text-[13px] leading-relaxed text-[#5A6878] sm:text-[14px]">
              {data.description_p2}
            </p>

            {/* 3 Features Row with Hairline Dividers */}
            <div className="mt-6 flex items-center gap-4 sm:mt-8 sm:gap-6">
              {data.features.map((feat, fIdx) => (
                <React.Fragment key={feat.id}>
                  <motion.div
                    whileHover={{ y: -3 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                    className="group flex flex-col items-center text-center"
                  >
                    <div className="flex h-9 w-9 items-center justify-center sm:h-10 sm:w-10">
                      {iconMap[feat.icon] ?? (
                        <Award className="h-7 w-7 text-[#EAA023]" />
                      )}
                    </div>
                    <span className="mt-1.5 block text-[12.5px] font-bold text-[#0C243B] sm:text-[13.5px]">
                      {feat.title_line1}
                    </span>
                    <span className="block text-[12.5px] font-bold text-[#0C243B] sm:text-[13.5px]">
                      {feat.title_line2}
                    </span>
                  </motion.div>

                  {fIdx < data.features.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="h-9 w-px self-center bg-slate-200"
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </motion.div>

          {/* Right Image Column with Architectural Geometric Frame Accents */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative lg:col-span-6"
          >
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Top-Left Thick Navy L-bracket */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85, x: -10, y: -10 }}
                whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                aria-hidden="true"
                className="absolute -left-3 -top-3 h-28 w-28 border-l-[16px] border-t-[16px] border-[#0C243B] sm:-left-5 sm:-top-5 sm:h-40 sm:w-40 sm:border-l-[22px] sm:border-t-[22px]"
              />

              {/* Bottom-Right Gold Accent L-bracket */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85, x: 10, y: 10 }}
                whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
                aria-hidden="true"
                className="absolute -bottom-3 -right-3 h-24 w-24 border-b-[3px] border-r-[3px] border-[#EAA023] sm:-bottom-5 sm:-right-5 sm:h-36 sm:w-36 sm:border-b-[3.5px] sm:border-r-[3.5px]"
              />

              {/* Foreground Crisp Image Card */}
              <div className="group relative z-10 aspect-[4/3] w-full overflow-hidden bg-slate-100 shadow-xl transition-shadow duration-500 hover:shadow-2xl sm:aspect-[16/11]">
                <Image
                  src={data.image}
                  alt={data.image_alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
