import React from 'react';
import type { Metadata } from 'next';
import Header from '../components/sections/Header';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Services from '../components/sections/Services';
import Counters from '../components/sections/Counters';
import Projects from '../components/sections/Projects';
import Gallery from '../components/sections/Gallery';
import Cta from '../components/sections/Cta';
import Testimonials from '../components/sections/Testimonials';
import Faq from '../components/sections/Faq';
import Contact from '../components/sections/Contact';
import Footer from '../components/sections/Footer';
import BackToTop from '../components/ui/BackToTop';
import {
  common,
  pages,
  sections,
  type PageComponent,
} from '../components/types';

const pageData = pages.home;

export const metadata: Metadata = {
  title: pageData.metadata.title,
  description: pageData.metadata.description,
};

export default function Home() {
  const sectionMap: Record<string, React.ReactNode> = {
    Hero: sections.hero ? <Hero data={sections.hero} /> : null,
    About: sections.about ? <About data={sections.about} /> : null,
    Services: sections.services ? <Services data={sections.services} /> : null,
    Counters: sections.counters ? <Counters data={sections.counters} /> : null,
    Projects: sections.projects ? <Projects data={sections.projects} /> : null,
    Gallery: sections.gallery ? <Gallery data={sections.gallery} /> : null,
    Cta: sections.cta ? <Cta data={sections.cta} /> : null,
    Testimonials: sections.testimonials ? (
      <Testimonials data={sections.testimonials} />
    ) : null,
    Faq: sections.faq ? <Faq data={sections.faq} /> : null,
    Contact: sections.contact ? <Contact data={sections.contact} /> : null,
  };

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans selection:bg-[#E09915] selection:text-[#09182E]">
      <Header data={common.Header} />
      <main className="w-full flex-1">
        {pageData.components.map((block: PageComponent) => (
          <React.Fragment key={block.key}>
            {sectionMap[block.component] ?? null}
          </React.Fragment>
        ))}
      </main>
      <Footer data={common.Footer} />
      <BackToTop data={common.BackToTop} />
    </div>
  );
}
