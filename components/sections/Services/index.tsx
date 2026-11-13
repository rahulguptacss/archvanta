'use client';

import React from 'react';
import Image from 'next/image';
import {
  Building2,
  Compass,
  HardHat,
  Home,
  Layers,
  LayoutGrid,
  Sofa,
} from 'lucide-react';
import { motion } from 'framer-motion';
import SectionHeading from '../../ui/SectionHeading';
import type { ServicesSectionData } from '../../types';

export default function Services({ data }: { data: ServicesSectionData }) {
  const iconMap: Record<string, React.ReactNode> = {
    Building2: (
      <Building2 className="h-6 w-6 stroke-[1.8] text-white transition-transform duration-300 group-hover:scale-110 group-hover:text-[#EAA023]" />
    ),
    Home: (
      <Home className="h-6 w-6 stroke-[1.8] text-white transition-transform duration-300 group-hover:scale-110 group-hover:text-[#EAA023]" />
    ),
    Compass: (
      <Compass className="h-6 w-6 stroke-[1.8] text-white transition-transform duration-300 group-hover:scale-110 group-hover:text-[#EAA023]" />
    ),
    Sofa: (
      <Sofa className="h-6 w-6 stroke-[1.8] text-white transition-transform duration-300 group-hover:scale-110 group-hover:text-[#EAA023]" />
    ),
    Layers: (
      <Layers className="h-6 w-6 stroke-[1.8] text-white transition-transform duration-300 group-hover:scale-110 group-hover:text-[#EAA023]" />
    ),
    HardHat: (
      <HardHat className="h-6 w-6 stroke-[1.8] text-white transition-transform duration-300 group-hover:scale-110 group-hover:text-[#EAA023]" />
    ),
    LayoutGrid: (
      <LayoutGrid className="h-6 w-6 stroke-[1.8] text-white transition-transform duration-300 group-hover:scale-110 group-hover:text-[#EAA023]" />
    ),
  };

  const topRow = data.items.slice(0, 4);
  const bottomRow = data.items.slice(4, 7);

  return (
    <section id="services" className="bg-white py-10 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow={data.eyebrow}
          headingPrefix={data.heading_prefix}
          headingHighlight={data.heading_highlight}
          subtitle={data.subtitle}
        />

        {/* Top 4 Cards Grid */}
        <div className="mt-8 grid grid-cols-1 gap-4.5 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-5">
          {topRow.map((srv, idx) => (
            <motion.a
              key={srv.id}
              href={srv.href}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.55,
                delay: idx * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative aspect-[1.28/1] w-full overflow-hidden rounded-xl bg-slate-900 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl sm:aspect-[1.18/1] sm:rounded-2xl"
            >
              {/* Full Background Image */}
              <Image
                src={srv.image}
                alt={srv.image_alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Bottom Scrim Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C243B] via-[#0C243B]/65 to-transparent transition-opacity duration-300 group-hover:from-[#071726] group-hover:via-[#071726]/75" />

              {/* Floating Bottom Content Badge */}
              <div className="absolute inset-x-0 bottom-0 z-10 flex items-center gap-2.5 p-4 sm:p-4.5">
                <div className="flex shrink-0 items-center justify-center">
                  {iconMap[srv.icon] ?? (
                    <Building2 className="h-6 w-6 text-white" />
                  )}
                </div>

                {/* Thin Vertical Gold Divider */}
                <span
                  aria-hidden="true"
                  className="h-7 w-[2px] shrink-0 rounded-full bg-[#EAA023]"
                />

                {/* Two-Line Title */}
                <div className="flex flex-col leading-tight">
                  <span className="text-[13px] font-bold text-white transition-colors duration-300 group-hover:text-[#EAA023] sm:text-[14px]">
                    {srv.title_line1}
                  </span>
                  <span className="text-[13px] font-bold text-white transition-colors duration-300 group-hover:text-[#EAA023] sm:text-[14px]">
                    {srv.title_line2}
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Bottom 3 Cards Grid */}
        <div className="mt-4.5 grid grid-cols-1 gap-4.5 sm:mt-5 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-5">
          {bottomRow.map((srv, idx) => (
            <motion.a
              key={srv.id}
              href={srv.href}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.55,
                delay: 0.2 + idx * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative aspect-[1.65/1] w-full overflow-hidden rounded-xl bg-slate-900 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl sm:aspect-[1.55/1] sm:rounded-2xl"
            >
              {/* Full Background Image */}
              <Image
                src={srv.image}
                alt={srv.image_alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Bottom Scrim Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C243B] via-[#0C243B]/65 to-transparent transition-opacity duration-300 group-hover:from-[#071726] group-hover:via-[#071726]/75" />

              {/* Floating Bottom Content Badge */}
              <div className="absolute inset-x-0 bottom-0 z-10 flex items-center gap-3 p-4 sm:p-5">
                <div className="flex shrink-0 items-center justify-center">
                  {iconMap[srv.icon] ?? (
                    <Building2 className="h-6 w-6 text-white" />
                  )}
                </div>

                {/* Thin Vertical Gold Divider */}
                <span
                  aria-hidden="true"
                  className="h-7 w-[2px] shrink-0 rounded-full bg-[#EAA023]"
                />

                {/* Two-Line Title */}
                <div className="flex flex-col leading-tight">
                  <span className="text-[13.5px] font-bold text-white transition-colors duration-300 group-hover:text-[#EAA023] sm:text-[14.5px]">
                    {srv.title_line1}
                  </span>
                  <span className="text-[13.5px] font-bold text-white transition-colors duration-300 group-hover:text-[#EAA023] sm:text-[14.5px]">
                    {srv.title_line2}
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
