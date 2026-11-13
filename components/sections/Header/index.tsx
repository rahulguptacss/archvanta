'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronDown, Menu, Phone, X } from 'lucide-react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  type PanInfo,
} from 'framer-motion';
import type { HeaderData } from '../../types';

export default function Header({ data }: { data: HeaderData }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeName, setActiveName] = useState<string>(
    data.links[0]?.name ?? ''
  );
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 16);
  });

  useEffect(() => {
    const pageSections = [
      { id: 'home', name: 'Home' },
      { id: 'about', name: 'About Us' },
      { id: 'services', name: 'Our Services' },
      { id: 'counters', name: 'Our Services' },
      { id: 'projects', name: 'Projects' },
      { id: 'gallery', name: 'Gallery' },
      { id: 'cta', name: 'Reviews' },
      { id: 'testimonials', name: 'Reviews' },
      { id: 'faq', name: 'FAQ' },
      { id: 'contact', name: 'Contact Us' },
    ];

    const linkNames = new Set(data.links.map((link) => link.name));

    const handleScroll = () => {
      // If at or near bottom of document, activate Contact Us
      const scrollPos = window.innerHeight + window.scrollY;
      const scrollMax = document.documentElement.scrollHeight;
      if (scrollPos >= scrollMax - 80) {
        const contactLink = data.links.find((l) => l.name === 'Contact Us') || data.links[data.links.length - 1];
        if (contactLink) {
          setActiveName(contactLink.name);
          return;
        }
      }

      // Check current section intersecting the viewport below sticky header
      const threshold = 140;
      let matchedName = '';

      for (const section of pageSections) {
        const el = document.getElementById(section.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= threshold && rect.bottom > threshold) {
          matchedName = section.name;
          break;
        }
      }

      // If at very top or no section matched threshold yet
      if (!matchedName) {
        for (let i = pageSections.length - 1; i >= 0; i--) {
          const el = document.getElementById(pageSections[i].id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= threshold) {
              matchedName = pageSections[i].name;
              break;
            }
          }
        }
      }

      if (matchedName && (linkNames.has(matchedName) || data.links.some(l => l.name.includes(matchedName)))) {
        const actual = data.links.find(l => l.name === matchedName || l.name.includes(matchedName));
        if (actual) setActiveName(actual.name);
      } else if (window.scrollY < 120 && data.links[0]?.name) {
        setActiveName(data.links[0].name);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [data.links]);

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.x > 80 || info.velocity.x > 300) {
      setMobileOpen(false);
    }
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={`sticky top-0 z-40 w-full border-b border-white/10 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0A2238]/95 shadow-[0_10px_30px_rgba(4,14,24,0.4)] backdrop-blur-md'
            : 'bg-[#0C243B]'
        }`}
      >
        <div className="mx-auto flex h-[74px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left Brand Logo */}
          <a
            href={data.links[0]?.href}
            onClick={() => setActiveName(data.links[0]?.name ?? '')}
            className="inline-flex shrink-0 items-center"
          >
            <Image
              src={data.logo}
              alt={`${data.logo_text} - ${data.logo_subtext}`}
              width={340}
              height={75}
              priority
              className="h-[46px] w-auto object-contain sm:h-[52px] lg:h-[55px]"
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-2 lg:flex lg:gap-2.5 xl:gap-4.5 2xl:gap-6">
            {data.links.map((item) => {
              const isActive = activeName === item.name;
              const hasDropdown = Boolean(
                item.dropdown && item.dropdown.length > 0
              );

              return (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => hasDropdown && setDropdownOpen(true)}
                  onMouseLeave={() => hasDropdown && setDropdownOpen(false)}
                >
                  <motion.a
                    href={item.href}
                    onClick={() => {
                      setActiveName(item.name);
                      if (hasDropdown) setDropdownOpen(false);
                    }}
                    whileHover={{ y: -1 }}
                    transition={{
                      type: 'spring',
                      stiffness: 450,
                      damping: 30,
                    }}
                    className={`relative inline-flex items-center gap-1 whitespace-nowrap py-2 text-[12.5px] font-semibold tracking-normal transition-colors xl:text-[13.5px] 2xl:text-[14.5px] ${
                      isActive
                        ? 'text-[#EAA023]'
                        : 'text-white hover:text-[#EAA023]'
                    }`}
                  >
                    <span>{item.name}</span>
                    {hasDropdown && (
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          dropdownOpen ? 'rotate-180 text-[#EAA023]' : ''
                        }`}
                      />
                    )}

                    {/* Active Underline Pill Bar */}
                    {isActive && (
                      <motion.span
                        layoutId="archvantaActiveNav"
                        transition={{
                          type: 'spring',
                          stiffness: 420,
                          damping: 34,
                        }}
                        className="absolute inset-x-0 -bottom-1 h-[3px] rounded-full bg-[#EAA023]"
                      />
                    )}
                  </motion.a>

                  {/* Dropdown Menu */}
                  {hasDropdown && (
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                          className="absolute left-0 top-full z-50 mt-1 w-56 overflow-hidden rounded-xl border border-white/10 bg-[#0A2238] p-2 shadow-2xl backdrop-blur-md"
                        >
                          {item.dropdown?.map((subItem) => (
                            <a
                              key={subItem.name}
                              href={subItem.href}
                              onClick={() => {
                                setActiveName(item.name);
                                setDropdownOpen(false);
                              }}
                              className="block rounded-lg px-3.5 py-2.5 text-xs font-semibold text-white/90 transition-colors hover:bg-white/10 hover:text-[#EAA023]"
                            >
                              {subItem.name}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Phone CTA Pill Button */}
          <div className="flex items-center gap-3">
            <motion.a
              href={data.phone_href}
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 450, damping: 28 }}
              className="hidden items-center gap-2.5 rounded-full bg-[#E09915] px-5 py-2.5 text-[13px] font-bold tracking-wide text-white shadow-md transition-colors hover:bg-[#F5A623] sm:inline-flex"
            >
              <Phone className="h-4 w-4 fill-white stroke-white" />
              <span>{data.phone_text}</span>
            </motion.a>

            {/* Mobile Drawer Trigger */}
            <motion.button
              type="button"
              onClick={() => setMobileOpen(true)}
              whileTap={{ scale: 0.94 }}
              aria-label={data.menu_aria_label}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-white/5 text-white transition-colors hover:border-[#EAA023] hover:text-[#EAA023] lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Responsive Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-xs lg:hidden"
          >
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              onClick={(e) => e.stopPropagation()}
              className="flex h-full w-80 max-w-[85vw] flex-col justify-between bg-[#0C243B] p-6 text-white shadow-2xl"
            >
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <Image
                    src={data.logo}
                    alt={`${data.logo_text} - ${data.logo_subtext}`}
                    width={180}
                    height={45}
                    className="h-9 w-auto object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    aria-label={data.close_aria_label}
                    className="rounded-lg border border-white/20 p-2 text-white/80 hover:border-[#EAA023] hover:text-[#EAA023]"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <nav className="mt-6 flex flex-col gap-1.5">
                  {data.links.map((item, idx) => {
                    const isActive = activeName === item.name;
                    const hasDropdown = Boolean(
                      item.dropdown && item.dropdown.length > 0
                    );

                    return (
                      <div key={item.name}>
                        <motion.div
                          initial={{ opacity: 0, x: 16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.05 * idx, duration: 0.25 }}
                          className={`flex items-center justify-between rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${
                            isActive
                              ? 'bg-white/10 text-[#EAA023]'
                              : 'text-white/85 hover:bg-white/5 hover:text-[#EAA023]'
                          }`}
                        >
                          <a
                            href={item.href}
                            onClick={() => {
                              setActiveName(item.name);
                              if (!hasDropdown) setMobileOpen(false);
                            }}
                            className="flex-1"
                          >
                            {item.name}
                          </a>

                          {hasDropdown && (
                            <button
                              type="button"
                              onClick={() =>
                                setMobileDropdownOpen((prev) => !prev)
                              }
                              className="p-1"
                            >
                              <ChevronDown
                                className={`h-4 w-4 transition-transform ${
                                  mobileDropdownOpen ? 'rotate-180' : ''
                                }`}
                              />
                            </button>
                          )}

                          {isActive && !hasDropdown && (
                            <span className="h-1.5 w-1.5 rounded-full bg-[#EAA023]" />
                          )}
                        </motion.div>

                        {/* Mobile Submenu Accordion */}
                        {hasDropdown && mobileDropdownOpen && (
                          <div className="ml-4 mt-1 space-y-1 border-l border-white/10 pl-3">
                            {item.dropdown?.map((sub) => (
                              <a
                                key={sub.name}
                                href={sub.href}
                                onClick={() => {
                                  setActiveName(item.name);
                                  setMobileOpen(false);
                                }}
                                className="block rounded-md py-2 text-xs font-medium text-white/70 hover:text-[#EAA023]"
                              >
                                {sub.name}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </nav>
              </div>

              <div className="space-y-4 border-t border-white/10 pt-5">
                <a
                  href={data.phone_href}
                  onClick={() => setMobileOpen(false)}
                  className="flex w-full items-center justify-center gap-2.5 rounded-full bg-[#E09915] px-4 py-3 text-sm font-bold text-white shadow-lg transition-colors hover:bg-[#F5A623]"
                >
                  <Phone className="h-4 w-4 fill-white stroke-white" />
                  <span>{data.phone_text}</span>
                </a>
                <p className="text-center text-[11px] text-white/50">
                  {data.drag_hint}
                </p>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
