'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Send,
  ShieldCheck,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import type { ContactSectionData } from '../../types';

export default function Contact({ data }: { data: ContactSectionData }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
      });
    }, 700);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section
      id="contact"
      className="relative scroll-mt-20 overflow-hidden bg-[#F8FAFC] py-14 sm:py-18 lg:py-22"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading matching screenshot style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
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

          <h2 className="mt-3 font-sans text-3xl font-extrabold tracking-tight text-[#0C243B] sm:text-4xl lg:text-[44px]">
            <span>{data.heading_prefix} </span>
            <span className="text-[#EAA023]">{data.heading_highlight}</span>
          </h2>

          <p className="mt-3 text-[13.5px] leading-relaxed text-[#5A6878] sm:text-[14.5px]">
            {data.description}
          </p>
        </motion.div>

        {/* Centered Enquiry Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-10 max-w-3xl rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_12px_40px_rgba(4,14,24,0.06)] sm:p-9 lg:mt-12 lg:p-11"
        >
          <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-[#0C243B] sm:text-lg">
                {data.form.card_title || 'Project Enquiry Form'}
              </h3>
              {data.form.card_subtitle && (
                <p className="text-xs text-slate-500">
                  {data.form.card_subtitle}
                </p>
              )}
            </div>
            {data.form.confidential_badge && (
              <span className="hidden items-center gap-1.5 rounded-full bg-[#EAA023]/10 px-3 py-1 text-[11px] font-bold text-[#D08B0E] sm:inline-flex">
                <ShieldCheck className="h-3.5 w-3.5" />
                {data.form.confidential_badge}
              </span>
            )}
          </div>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex min-h-[320px] flex-col items-center justify-center text-center py-8"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-8 ring-emerald-50/50">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="mt-4 text-xl font-extrabold text-[#0C243B] sm:text-2xl">
                {data.form.success_title || 'Enquiry Submitted Successfully'}
              </h3>
              <p className="mt-2 max-w-md text-xs leading-relaxed text-slate-600 sm:text-sm">
                {data.form.success_message}
              </p>
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#E09915] px-6 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:bg-[#F5A623]"
              >
                <span>{data.form.reset_button_text || 'Submit Another Enquiry'}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="enquiry-name"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700"
                  >
                    {data.form.name_label}{' '}
                    <span className="text-[#EAA023]">*</span>
                  </label>
                  <input
                    id="enquiry-name"
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={data.form.name_placeholder}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 transition-all focus:border-[#EAA023] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#EAA023]/20 sm:text-sm"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label
                    htmlFor="enquiry-phone"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700"
                  >
                    {data.form.phone_label}{' '}
                    <span className="text-[#EAA023]">*</span>
                  </label>
                  <input
                    id="enquiry-phone"
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={data.form.phone_placeholder}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 transition-all focus:border-[#EAA023] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#EAA023]/20 sm:text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Email Address */}
                <div>
                  <label
                    htmlFor="enquiry-email"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700"
                  >
                    {data.form.email_label}{' '}
                    <span className="text-[#EAA023]">*</span>
                  </label>
                  <input
                    id="enquiry-email"
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={data.form.email_placeholder}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 transition-all focus:border-[#EAA023] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#EAA023]/20 sm:text-sm"
                  />
                </div>

                {/* Project Type Custom Dropdown */}
                <div ref={dropdownRef} className="relative">
                  <label
                    id="enquiry-service-label"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700"
                  >
                    {data.form.service_label}
                  </label>

                  <input
                    type="hidden"
                    name="service"
                    value={formData.service}
                  />

                  <button
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={isDropdownOpen}
                    aria-labelledby="enquiry-service-label"
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                    className={`mt-1.5 flex w-full items-center justify-between rounded-xl border px-3.5 py-2.5 text-left text-xs transition-all sm:text-sm ${
                      isDropdownOpen
                        ? 'border-[#EAA023] bg-white ring-2 ring-[#EAA023]/20'
                        : 'border-slate-200 bg-slate-50/50 hover:border-slate-300 hover:bg-white'
                    }`}
                  >
                    <span
                      className={`truncate ${
                        formData.service
                          ? 'font-medium text-slate-900'
                          : 'text-slate-400'
                      }`}
                    >
                      {formData.service || data.form.service_placeholder}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                        isDropdownOpen
                          ? 'rotate-180 text-[#EAA023]'
                          : 'text-slate-400'
                      }`}
                    />
                  </button>

                  {/* Custom Animated Dropdown Menu */}
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        role="listbox"
                        aria-labelledby="enquiry-service-label"
                        initial={{ opacity: 0, y: -6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.98 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        className="absolute left-0 right-0 top-full z-50 mt-1.5 max-h-64 overflow-y-auto rounded-xl border border-slate-200/90 bg-white p-1.5 shadow-[0_16px_36px_rgba(4,14,24,0.14)]"
                      >
                        {/* Placeholder / Reset Option */}
                        <button
                          type="button"
                          role="option"
                          aria-selected={!formData.service}
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, service: '' }));
                            setIsDropdownOpen(false);
                          }}
                          className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition-colors sm:text-[13px] ${
                            !formData.service
                              ? 'bg-slate-100 font-semibold text-slate-700'
                              : 'text-slate-400 hover:bg-slate-50 hover:text-slate-700'
                          }`}
                        >
                          <span>{data.form.service_placeholder}</span>
                          {!formData.service && (
                            <Check className="h-3.5 w-3.5 text-slate-400" />
                          )}
                        </button>

                        <div className="my-1 h-px bg-slate-100" />

                        {/* Options List */}
                        {data.form.service_options.map((opt) => {
                          const isSelected = formData.service === opt;
                          return (
                            <button
                              key={opt}
                              type="button"
                              role="option"
                              aria-selected={isSelected}
                              onClick={() => {
                                setFormData((prev) => ({
                                  ...prev,
                                  service: opt,
                                }));
                                setIsDropdownOpen(false);
                              }}
                              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition-colors sm:text-[13px] ${
                                isSelected
                                  ? 'bg-[#EAA023]/15 font-semibold text-[#0C243B]'
                                  : 'text-slate-700 hover:bg-[#EAA023]/10 hover:text-[#0C243B]'
                              }`}
                            >
                              <span>{opt}</span>
                              {isSelected && (
                                <Check className="h-3.5 w-3.5 text-[#D08B0E]" />
                              )}
                            </button>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Message Textarea */}
              <div>
                <label
                  htmlFor="enquiry-message"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700"
                >
                  {data.form.message_label}{' '}
                  <span className="text-[#EAA023]">*</span>
                </label>
                <textarea
                  id="enquiry-message"
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={data.form.message_placeholder}
                  className="mt-1.5 w-full resize-none rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 transition-all focus:border-[#EAA023] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#EAA023]/20 sm:text-sm"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2 text-center sm:text-left">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#E09915] px-10 py-3.5 text-sm font-bold tracking-wide text-white shadow-md transition-all hover:bg-[#F5A623] disabled:cursor-not-allowed disabled:opacity-75 sm:w-auto"
                >
                  {isSubmitting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      <span>{data.form.submitting_text}</span>
                    </>
                  ) : (
                    <>
                      <span>{data.form.submit_text}</span>
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
