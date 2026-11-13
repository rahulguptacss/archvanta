'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import type { FaqSectionData } from '../../types';

export default function Faq({ data }: { data: FaqSectionData }) {
  const [openId, setOpenId] = useState<string>(data.items[0]?.id ?? '');

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? '' : id));
  };

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-white pt-4 pb-14 sm:pt-6 sm:pb-16 lg:pt-6 lg:pb-20"
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

          {/* Main Heading: Frequently Asked (Navy) Questions (Gold) */}
          <h2 className="mt-3 font-sans text-3xl font-extrabold tracking-tight text-[#0C243B] sm:text-4xl lg:text-[44px]">
            <span>{data.heading_prefix} </span>
            <span className="text-[#EAA023]">{data.heading_highlight}</span>
          </h2>

          {/* Subtitle */}
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-500 sm:text-base">
            {data.subtitle}
          </p>
        </motion.div>

        {/* FAQ Grid: items-stretch guarantees left card height EXACTLY matches right FAQ accordion */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 lg:grid-cols-12 lg:items-stretch lg:gap-8 xl:gap-10">
          {/* Left Column: Engineer Photo with 25+ Years Badge (Height perfectly matches FAQs) */}
          <motion.div
            initial={{ opacity: 0, x: -26 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] lg:col-span-5"
          >
            {/* Engineer Image: flex-1 dynamically expands to match right column height */}
            <div className="relative min-h-[340px] flex-1 w-full overflow-hidden bg-slate-100 sm:min-h-[400px] lg:min-h-0">
              <Image
                src={data.engineer_image}
                alt={data.engineer_image_alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-top sm:object-center"
              />
            </div>

            {/* Bottom 25+ Years Badge Bar */}
            <div className="flex shrink-0 items-center gap-3.5 bg-[#0C243B] p-4.5 sm:gap-4 sm:p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#FABF09] font-sans text-xl font-extrabold text-[#0C243B] shadow-sm sm:h-12 sm:w-12 sm:text-2xl">
                {data.badge_years}
              </div>
              <div>
                <h3 className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-white sm:text-[13px]">
                  {data.badge_text}
                </h3>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Accordion List matching screenshot */}
          <motion.div
            initial={{ opacity: 0, x: 26 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-3 sm:gap-3.5 lg:col-span-7"
          >
            {data.items.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className={`overflow-hidden rounded-xl border transition-all duration-200 ${
                    isOpen
                      ? 'border-[#0C243B] shadow-sm'
                      : 'border-slate-200/80 bg-white shadow-xs hover:border-[#EAA023]/60'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(item.id)}
                    aria-expanded={isOpen}
                    className={`flex w-full items-center justify-between p-4 text-left transition-colors sm:p-4.5 ${
                      isOpen
                        ? 'bg-[#0C243B] text-white'
                        : 'bg-white text-[#0C243B] hover:text-[#EAA023]'
                    }`}
                  >
                    <div className="flex items-center gap-3 pr-3">
                      <HelpCircle
                        className={`h-5 w-5 shrink-0 ${
                          isOpen ? 'text-[#FABF09]' : 'text-[#EAA023]'
                        }`}
                      />
                      <span className="font-sans text-[14px] font-bold sm:text-[15px]">
                        {item.question}
                      </span>
                    </div>

                    <ChevronDown
                      className={`h-5 w-5 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-[#FABF09]' : 'text-slate-400'
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="border-t border-slate-100 bg-white p-4.5 text-[13px] leading-relaxed text-[#556980] sm:p-5 sm:text-[14px]">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
