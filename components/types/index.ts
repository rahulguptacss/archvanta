import data from '../data/data.json';

export interface NavDropdownItem {
  name: string;
  href: string;
}

export interface NavItem {
  name: string;
  href: string;
  dropdown?: NavDropdownItem[];
}

export type LinkType = NavItem;

export interface HeaderData {
  logo: string;
  logo_text: string;
  logo_subtext: string;
  links: LinkType[];
  phone_icon_label: string;
  phone_text: string;
  phone_href: string;
  menu_aria_label: string;
  close_aria_label: string;
  drag_hint: string;
}

export interface HeroBadgeItem {
  id: string;
  title_line1: string;
  title_line2: string;
  icon: string;
}

export interface HeroSlideItem {
  id: string;
  eyebrow: string;
  headline_first: string;
  headline_highlight: string;
  description: string;
  background_image: string;
  background_alt: string;
  badges?: HeroBadgeItem[];
}

export interface HeroSectionData {
  prev_slide_aria: string;
  next_slide_aria: string;
  slides: HeroSlideItem[];
}

export interface AboutFeatureItem {
  id: string;
  title_line1: string;
  title_line2: string;
  icon: string;
}

export interface AboutSectionData {
  eyebrow: string;
  heading_prefix: string;
  heading_highlight: string;
  description_p1: string;
  description_p2: string;
  image: string;
  image_alt: string;
  features: AboutFeatureItem[];
}

export interface ServiceItem {
  id: string;
  title: string;
  title_line1: string;
  title_line2: string;
  image: string;
  image_alt: string;
  icon: string;
  href: string;
}

export interface ServicesSectionData {
  eyebrow: string;
  heading_prefix: string;
  heading_highlight: string;
  subtitle: string;
  items: ServiceItem[];
}

export interface CounterItem {
  id: string;
  value: string;
  label: string;
  icon: string;
}

export interface CountersSectionData {
  eyebrow: string;
  heading_prefix: string;
  heading_highlight: string;
  subtitle: string;
  background_accent: string;
  items: CounterItem[];
}

export interface ProjectItem {
  id: string;
  category: string;
  title: string;
  title_line1: string;
  title_line2: string;
  icon: string;
  image: string;
  image_alt: string;
  href: string;
}

export interface FeaturedCardData {
  title: string;
  title_line1: string;
  title_line2: string;
  category: string;
  icon: string;
  image: string;
  image_alt: string;
  href: string;
}

export interface ProjectsSectionData {
  eyebrow: string;
  heading_prefix: string;
  heading_highlight: string;
  description: string;
  featured: FeaturedCardData;
  items: ProjectItem[];
}

export interface GalleryImageItem {
  id: string;
  src: string;
  alt: string;
  category: string;
}

export interface GallerySectionData {
  eyebrow_icon: string;
  heading_prefix: string;
  heading_highlight: string;
  close_aria_label: string;
  prev_aria_label: string;
  next_aria_label: string;
  images: GalleryImageItem[];
}

export interface CtaSectionData {
  headline_line1: string;
  headline_prefix: string;
  headline_highlight: string;
  button_text: string;
  button_link: string;
  background_image: string;
  background_alt: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author_name: string;
  role: string;
  avatar: string;
  avatar_alt: string;
  rating: number;
}

export interface TestimonialsSectionData {
  eyebrow: string;
  heading_prefix: string;
  heading_highlight: string;
  subtitle: string;
  prev_aria_label: string;
  next_aria_label: string;
  items: TestimonialItem[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ContactCardItem {
  id: string;
  icon: string;
  title: string;
  line1: string;
  line2?: string;
  href?: string;
}

export interface ContactFormData {
  card_title?: string;
  card_subtitle?: string;
  confidential_badge?: string;
  success_title?: string;
  reset_button_text?: string;
  name_label: string;
  name_placeholder: string;
  email_label: string;
  email_placeholder: string;
  phone_label: string;
  phone_placeholder: string;
  service_label: string;
  service_placeholder: string;
  service_options: string[];
  message_label: string;
  message_placeholder: string;
  submit_text: string;
  submitting_text: string;
  success_message: string;
}

export interface ContactSectionData {
  eyebrow: string;
  heading_prefix: string;
  heading_highlight: string;
  description: string;
  form: ContactFormData;
  contact_cards?: ContactCardItem[];
}

export interface FaqSectionData {
  eyebrow: string;
  heading_prefix: string;
  heading_highlight: string;
  subtitle: string;
  badge_years: string;
  badge_text: string;
  engineer_image: string;
  engineer_image_alt: string;
  items: FaqItem[];
}

export interface BlogPostItem {
  id: string;
  title: string;
  date: string;
  image: string;
  image_alt: string;
  href: string;
}

export interface FooterHoursItem {
  days: string;
  time: string;
}

export interface FooterData {
  logo: string;
  logo_text: string;
  logo_subtext: string;
  tagline: string;
  posts_title?: string;
  posts?: BlogPostItem[];
  quick_links_title: string;
  quick_links: LinkType[];
  contact_title: string;
  address: string;
  phone: string;
  phone_href: string;
  email: string;
  email_href: string;
  hours: FooterHoursItem;
  copyright: string;
}

export interface BackToTopData {
  aria_label: string;
}

export interface PageComponent {
  key: string;
  component: string;
}

export interface PageMeta {
  title: string;
  pageName: string;
  metadata: {
    title: string;
    description: string;
  };
  components: PageComponent[];
}

export interface SiteSections {
  hero: HeroSectionData;
  about: AboutSectionData;
  services: ServicesSectionData;
  counters: CountersSectionData;
  projects: ProjectsSectionData;
  gallery: GallerySectionData;
  cta: CtaSectionData;
  testimonials: TestimonialsSectionData;
  faq: FaqSectionData;
  contact?: ContactSectionData;
}

export interface SitePages {
  home: PageMeta;
}

export interface TemplateComponents {
  pages: SitePages;
  sections: SiteSections;
}

export interface SiteData {
  common: {
    Header: HeaderData;
    Footer: FooterData;
    BackToTop: BackToTopData;
  };
  categories: {
    ConstructionArchitecture: {
      templateComponents: {
        'template-1': TemplateComponents;
      };
    };
  };
}

export const siteJson: SiteData = data;
export const common = siteJson.common;
export const template =
  siteJson.categories.ConstructionArchitecture.templateComponents['template-1'];
export const pages = template.pages;
export const sections = template.sections;

