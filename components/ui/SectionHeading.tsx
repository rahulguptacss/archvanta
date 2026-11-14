import React from 'react';

interface SectionHeadingProps {
  eyebrow: string;
  headingPrefix: string;
  headingHighlight: string;
  subtitle?: string;
  align?: 'center' | 'left';
  dark?: boolean;
}

export default function SectionHeading({
  eyebrow,
  headingPrefix,
  headingHighlight,
  subtitle,
  align = 'center',
  dark = false,
}: SectionHeadingProps) {
  const isCenter = align === 'center';

  return (
    <div className={isCenter ? 'mx-auto max-w-4xl text-center' : 'text-left'}>
      {/* Eyebrow with hairline rules */}
      <div
        className={`mb-2.5 flex items-center gap-3 ${
          isCenter ? 'justify-center' : 'justify-start'
        }`}
      >
        <span
          className={`h-[1.5px] w-8 sm:w-10 ${
            dark ? 'bg-[#EAA023]/70' : 'bg-[#EAA023]'
          }`}
        />
        <span
          className={`text-[11.5px] font-bold uppercase tracking-[0.24em] sm:text-[12px] ${
            dark ? 'text-[#EAA023]' : 'text-[#0C243B]'
          }`}
        >
          {eyebrow}
        </span>
        <span
          className={`h-[1.5px] w-8 sm:w-10 ${
            dark ? 'bg-[#EAA023]/70' : 'bg-[#EAA023]'
          }`}
        />
      </div>

      {/* Dual Tone Main Heading */}
      <h2
        className={`font-sans text-[26px] xs:text-3xl sm:text-4xl lg:text-[40px] xl:text-[42px] font-extrabold tracking-tight lg:leading-[1.15] sm:whitespace-nowrap ${
          dark ? 'text-white' : 'text-[#0D1F38]'
        }`}
      >
        <span>{headingPrefix} </span>
        <span className="text-[#E09915]">{headingHighlight}</span>
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p
          className={`mx-auto mt-3 max-w-2xl text-xs leading-relaxed sm:text-[14px] ${
            dark ? 'text-slate-300' : 'text-[#5A6E85]'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

