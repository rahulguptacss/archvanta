'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Building2, GraduationCap, Users } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import SectionHeading from '../../ui/SectionHeading';
import type { CountersSectionData } from '../../types';

function TowerCraneIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Tower Mast */}
      <path d="M6 4v17" />
      <path d="M9 4v17" />
      <path d="M6 8h3" />
      <path d="M6 13h3" />
      <path d="M6 18h3" />
      {/* Base */}
      <path d="M4 21h7" />
      {/* Horizontal Jib & Counter-Jib */}
      <path d="M3 6h17" />
      {/* Apex & Stay Cables */}
      <path d="M7.5 2v4" />
      <path d="M7.5 2L16 6" />
      <path d="M7.5 2L3 6" />
      {/* Hoist Cable & Hook Block */}
      <path d="M17 6v6" />
      <rect x="15" y="12" width="4" height="3" rx="0.5" />
    </svg>
  );
}

function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;
  const suffix = value.replace(/[0-9,]/g, '');
  const hasComma = value.includes(',');

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1800; // 1.8 seconds
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.round(easeProgress * numericValue);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [isInView, numericValue]);

  const formatted = hasComma
    ? displayValue.toLocaleString('en-US')
    : displayValue.toString();

  return (
    <span ref={ref}>
      {formatted}
      {suffix}
    </span>
  );
}

export default function Counters({ data }: { data: CountersSectionData }) {
  const iconMap: Record<string, React.ReactNode> = {
    Building2: (
      <Building2 className="h-5 w-5 stroke-[1.8] text-white transition-colors duration-300 group-hover:text-[#EAA023] sm:h-5.5 sm:w-5.5" />
    ),
    Users: (
      <Users className="h-5 w-5 stroke-[1.8] text-white transition-colors duration-300 group-hover:text-[#EAA023] sm:h-5.5 sm:w-5.5" />
    ),
    GraduationCap: (
      <GraduationCap className="h-5 w-5 stroke-[1.8] text-white transition-colors duration-300 group-hover:text-[#EAA023] sm:h-5.5 sm:w-5.5" />
    ),
    TowerCrane: (
      <TowerCraneIcon className="h-5 w-5 stroke-[1.8] text-white transition-colors duration-300 group-hover:text-[#EAA023] sm:h-5.5 sm:w-5.5" />
    ),
  };

  return (
    <section
      id="counters"
      className="relative overflow-hidden bg-white py-10 sm:py-12 lg:py-14"
    >
      {/* Modern architectural building element on the far right matching screenshot */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-full overflow-hidden sm:w-[48%] md:w-[40%] lg:w-[32%] xl:w-[28%]">
        <Image
          src={data.background_accent}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 28vw"
          className="object-cover object-right"
        />
        {/* Seamless left-to-right white fade */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent sm:via-white/25" />
        <div className="absolute inset-0 bg-white/75 sm:hidden" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow={data.eyebrow}
          headingPrefix={data.heading_prefix}
          headingHighlight={data.heading_highlight}
          subtitle={data.subtitle}
        />

        {/* 4 Counter Cards */}
        <div className="mt-9 grid grid-cols-1 gap-7 sm:mt-11 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-5">
          {data.items.map((cnt, idx) => (
            <motion.div
              key={cnt.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: idx * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative flex flex-col items-center justify-center rounded-2xl border-b-[3.5px] border-[#EAA023] bg-white px-4 pb-4.5 pt-7 text-center shadow-md shadow-slate-200/70 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl sm:pb-5.5 sm:pt-8"
            >
              {/* Floating Top Badge with Gold Border */}
              <div className="absolute -top-5 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-xl border-[2px] border-[#EAA023] bg-[#0C243B] shadow-md transition-all duration-300 group-hover:scale-110 group-hover:bg-[#071726] sm:h-11 sm:w-11">
                {iconMap[cnt.icon] ?? (
                  <Building2 className="h-5 w-5 stroke-[1.8] text-white" />
                )}
              </div>

              {/* Number Value with Smooth Animated Count-Up */}
              <p className="font-sans text-2xl font-extrabold tracking-tight text-[#0C243B] sm:text-3xl lg:text-[36px]">
                <AnimatedCounter value={cnt.value} />
              </p>

              {/* Label */}
              <h4 className="mt-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#5A6878] sm:text-[11.5px]">
                {cnt.label}
              </h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
