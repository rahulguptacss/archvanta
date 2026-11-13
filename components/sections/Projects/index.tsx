'use client';

import React from 'react';
import Image from 'next/image';
import {
  Building,
  Building2,
  Factory,
  GraduationCap,
  Home,
  ShoppingBag,
} from 'lucide-react';
import { motion } from 'framer-motion';
import type { ProjectsSectionData } from '../../types';

export default function Projects({ data }: { data: ProjectsSectionData }) {
  const iconMap: Record<string, React.ReactNode> = {
    Home: <Home className="h-5 w-5 stroke-[1.8] text-white sm:h-5.5 sm:w-5.5" />,
    Factory: (
      <Factory className="h-5 w-5 stroke-[1.8] text-white sm:h-5.5 sm:w-5.5" />
    ),
    Building: (
      <Building className="h-5 w-5 stroke-[1.8] text-white sm:h-5.5 sm:w-5.5" />
    ),
    GraduationCap: (
      <GraduationCap className="h-5 w-5 stroke-[1.8] text-white sm:h-5.5 sm:w-5.5" />
    ),
    ShoppingBag: (
      <ShoppingBag className="h-5 w-5 stroke-[1.8] text-white sm:h-5.5 sm:w-5.5" />
    ),
  };

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-white pt-10 pb-4 sm:pt-12 sm:pb-6 lg:pt-14 lg:pb-8"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Top Header & Large Featured Card */}
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-12">
          {/* Left Intro Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-2.5">
              <span className="h-[2.5px] w-8 bg-[#EAA023]" />
              <p className="text-[11.5px] font-bold uppercase tracking-[0.22em] text-[#0C243B] sm:text-[12px]">
                {data.eyebrow}
              </p>
            </div>

            {/* Main Heading */}
            <h2 className="mt-2.5 font-sans text-3xl font-extrabold tracking-tight text-[#0C243B] sm:text-4xl lg:text-[44px] lg:leading-[1.12]">
              <span>{data.heading_prefix} </span>
              <span className="text-[#EAA023]">{data.heading_highlight}</span>
            </h2>

            {/* Description */}
            <p className="mt-3.5 max-w-sm text-[13px] leading-relaxed text-[#5A6878] sm:text-[13.5px]">
              {data.description}
            </p>
          </motion.div>

          {/* Right Featured Hero Banner with Angular Diagonal Cuts */}
          <motion.a
            href={data.featured.href || '#contact'}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="group relative block lg:col-span-7 cursor-pointer"
          >
            <div className="relative min-h-[250px] w-full overflow-hidden rounded-r-2xl bg-transparent sm:min-h-[270px] lg:min-h-[280px]">
              {/* Photo Area clipped with diagonal on the left */}
              <div
                className="absolute inset-0"
                style={{
                  clipPath: 'polygon(12% 0, 100% 0, 100% 100%, 0% 100%)',
                }}
              >
                <Image
                  src={data.featured.image}
                  alt={data.featured.image_alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Left Diagonal Gold Border Stripe */}
                <svg
                  className="pointer-events-none absolute inset-0 z-20 h-full w-full"
                  preserveAspectRatio="none"
                  viewBox="0 0 100 100"
                >
                  <line
                    x1="12"
                    y1="0"
                    x2="0"
                    y2="100"
                    stroke="#EAA023"
                    strokeWidth="5"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>

                {/* Right Angular Dark Navy Info Panel with parallel diagonal slant */}
                <div
                  className="absolute bottom-0 right-0 top-0 z-10 flex w-[52%] flex-col justify-center bg-[#1A3550] p-4 text-white sm:w-[45%] sm:p-5 lg:w-[40%] lg:p-6 xl:w-[38%]"
                  style={{
                    clipPath: 'polygon(26% 0, 100% 0, 100% 100%, 0% 100%)',
                  }}
                >
                  <div className="pl-9 pr-3 sm:pl-12 sm:pr-4 lg:pl-14 lg:pr-5">
                    <div className="flex h-7 w-7 items-center justify-center">
                      <Building2 className="h-5.5 w-5.5 stroke-[1.8] text-white" />
                    </div>
                    <span className="mt-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-white/90 sm:text-[10.5px]">
                      {data.featured.category}
                    </span>
                    <span
                      aria-hidden="true"
                      className="mt-1 block h-[2px] w-6 rounded-full bg-[#EAA023]"
                    />
                    <h3 className="mt-2 font-sans text-[14.5px] font-bold leading-tight text-white sm:text-base lg:text-[17.5px]">
                      <span className="block whitespace-nowrap">{data.featured.title_line1}</span>
                      <span className="block whitespace-nowrap">{data.featured.title_line2}</span>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </motion.a>
        </div>

        {/* Bottom 5 Project Cards Row */}
        <div className="mt-8 grid grid-cols-1 gap-4.5 sm:mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 sm:gap-5">
          {data.items.map((proj, idx) => (
            <motion.a
              key={proj.id}
              href={proj.href}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.5,
                delay: idx * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -6 }}
              className="group flex flex-col overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:border-[#EAA023]/40 hover:shadow-xl sm:rounded-2xl"
            >
              {/* Photo Card Head */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <Image
                  src={proj.image}
                  alt={proj.image_alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />
              </div>

              {/* White Body with Floating Gold Badge */}
              <div className="relative flex flex-1 flex-col justify-between px-4 pb-5 pt-7 sm:px-4.5 sm:pb-5.5 sm:pt-7.5">
                {/* Floating Gold Squircle Badge */}
                <div className="absolute -top-5 left-4 z-10 flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAA023] shadow-md transition-transform duration-300 group-hover:scale-110 sm:-top-5.5 sm:left-4.5 sm:h-11 sm:w-11">
                  {iconMap[proj.icon] ?? (
                    <Home className="h-5 w-5 stroke-[1.8] text-white" />
                  )}
                </div>

                <div>
                  <span className="block text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#5A6878] sm:text-[11px]">
                    {proj.category}
                  </span>
                  <h4 className="mt-1 font-sans text-[13.5px] font-bold leading-tight text-[#0C243B] transition-colors duration-300 group-hover:text-[#EAA023] sm:text-[14.5px]">
                    <span className="block">{proj.title_line1}</span>
                    <span className="block">{proj.title_line2}</span>
                  </h4>
                </div>

                {/* Bottom Gold Accent Rule */}
                <span
                  aria-hidden="true"
                  className="mt-3 block h-[2.5px] w-7 rounded-full bg-[#EAA023] transition-all duration-300 group-hover:w-10"
                />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
