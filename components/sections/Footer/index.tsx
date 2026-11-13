'use client';

import React from 'react';
import Image from 'next/image';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import type { FooterData } from '../../types';

export default function Footer({ data }: { data: FooterData }) {
  const hasPosts = Boolean(data.posts && data.posts.length > 0 && data.posts_title);

  return (
    <footer id="footer" className="border-t border-white/10 bg-[#071324] text-white">
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-14 sm:px-6 lg:px-8 lg:pt-16">
        <div
          className={`grid grid-cols-1 gap-10 ${
            hasPosts
              ? 'md:grid-cols-2 lg:grid-cols-12 lg:gap-8'
              : 'md:grid-cols-3 lg:grid-cols-12 lg:gap-10'
          }`}
        >
          {/* Column 1: Brand & About */}
          <div className={hasPosts ? 'lg:col-span-4' : 'lg:col-span-4'}>
            <a href="#home" className="inline-flex items-center">
              <Image
                src={data.logo}
                alt={`${data.logo_text} - ${data.logo_subtext}`}
                width={240}
                height={60}
                className="h-11 w-auto object-contain"
              />
            </a>
            <p className="mt-4 max-w-sm text-xs leading-relaxed text-slate-300 sm:text-[13.5px]">
              {data.tagline}
            </p>
          </div>

          {/* Column 2: Recent Posts (Optional) */}
          {hasPosts && (
            <div className="lg:col-span-3">
              <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[#F5A623]">
                {data.posts_title}
              </h3>
              <span className="mt-2 block h-[2px] w-8 bg-[#E09915]" />

              <div className="mt-5 space-y-4">
                {data.posts?.map((post) => (
                  <a
                    key={post.id}
                    href={post.href}
                    className="group flex items-center gap-3 transition-colors"
                  >
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-slate-800">
                      <Image
                        src={post.image}
                        alt={post.image_alt}
                        fill
                        sizes="56px"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div>
                      <h4 className="text-[12.5px] font-semibold leading-snug text-slate-200 transition-colors group-hover:text-[#F5A623]">
                        {post.title}
                      </h4>
                      <p className="mt-1 text-[11px] text-[#D08B0E]">
                        {post.date}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Column: Quick Links */}
          <div className={hasPosts ? 'lg:col-span-2' : 'lg:col-span-4'}>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[#F5A623]">
              {data.quick_links_title}
            </h3>
            <span className="mt-2 block h-[2px] w-8 bg-[#E09915]" />

            <ul
              className={`mt-5 ${
                hasPosts
                  ? 'flex flex-col gap-2'
                  : 'grid grid-cols-2 gap-x-6 gap-y-2.5 sm:gap-x-8'
              }`}
            >
              {data.quick_links.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 3 }}
                    transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                    className="inline-block text-[13px] text-slate-300 transition-colors hover:text-[#F5A623]"
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column: Contact Info & Hours */}
          <div className={hasPosts ? 'lg:col-span-3' : 'lg:col-span-4'}>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[#F5A623]">
              {data.contact_title}
            </h3>
            <span className="mt-2 block h-[2px] w-8 bg-[#E09915]" />

            <ul className="mt-5 space-y-3.5 text-[13px] text-slate-300">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#F5A623]" />
                <span className="leading-relaxed">{data.address}</span>
              </li>
              <li>
                <a
                  href={data.phone_href}
                  className="flex items-center gap-3 transition-colors hover:text-[#F5A623]"
                >
                  <Phone className="h-4 w-4 shrink-0 text-[#F5A623]" />
                  <span>{data.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={data.email_href}
                  className="flex items-center gap-3 transition-colors hover:text-[#F5A623]"
                >
                  <Mail className="h-4 w-4 shrink-0 text-[#F5A623]" />
                  <span>{data.email}</span>
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-4 w-4 shrink-0 text-[#F5A623]" />
                <span>
                  {data.hours.days}: {data.hours.time}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-slate-400">
          {data.copyright}
        </div>
      </div>
    </footer>
  );
}

