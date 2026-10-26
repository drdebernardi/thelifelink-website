// Site-wide facts. Edit here and every page updates.
export const SITE = {
  name: 'The Life Link',
  url: 'https://thelifelink.org',
  address: { street: "2000 St. Michael's Drive", city: 'Santa Fe', region: 'NM', zip: '87505' },
  mainPhone: { display: '(505) 438-0010', tel: '5054380010' },
  // Contact form. Paste the Formspree form address here (https://formspree.io/f/XXXXXXXX). Leave null to show call-only.
  contactFormUrl: null as string | null,
  // Shown on job postings ("Questions? Email ..."). Not shown anywhere else on the site.
  hrEmail: 'hr@thelifelink.org',
  donateUrl: 'https://givebutter.com/9SyJHR',
  // Set facebook to the real page URL to show the Facebook icon in the footer.
  social: {
    facebook: 'https://www.facebook.com/thelifelinkorg' as string | null,
    instagram: 'https://www.instagram.com/thelifelinknm/',
    youtube: 'https://www.youtube.com/@thelifelink8998',
  },
  tagline: 'The Life Link is committed to improving individual and community health through breaking cycles of chronic homelessness, mental illness, trauma, exploitation, and addiction.',
  // Separate program pages (/programs/housing, /programs/ccss, ...). Content: src/data/program-pages.json.
  // Set to false to turn them all off: the pages stop being built, and the menu and Programs page go back to the single-page version.
  programPages: true,
};

export type NavSub = { label: string; href: string; external?: boolean };
export type NavItem = { label: string; href: string; key: string; subs?: NavSub[] };

export const NAV: NavItem[] = [
  { label: 'Home', href: '/', key: 'home' },
  { label: 'About', href: '/about', key: 'about', subs: [
    { label: 'Who We Are', href: '/about#who-we-are' },
    { label: 'Board', href: '/about#board' },
    { label: 'Senior Leadership', href: '/about#leadership' },
    { label: 'Partners', href: '/about#partners' },
    { label: 'Testimonials', href: '/about#testimonials' },
  ] },
  { label: 'Our Impact', href: '/impact', key: 'impact' },
  { label: 'Programs & Services', href: '/programs', key: 'programs', subs: SITE.programPages ? [
    { label: 'All Programs', href: '/programs' },
    { label: 'Housing', href: '/programs/housing' },
    { label: 'Community Support (CCSS)', href: '/programs/ccss' },
    { label: 'Treatment', href: '/programs/treatment' },
    { label: 'Outreach', href: '/programs/outreach' },
    { label: 'Clubhouse', href: '/programs/clubhouse' },
    { label: 'Human Trafficking Aftercare', href: '/programs/human-trafficking' },
    { label: 'Employment', href: '/programs#employment' },
    { label: 'New Clients', href: '/programs#get-help' },
  ] : [
    { label: 'Mental Health', href: '/programs#g1' },
    { label: 'Housing', href: '/programs#housing' },
    { label: 'Employment', href: '/programs#employment' },
    { label: 'Outreach', href: '/programs#outreach' },
    { label: 'Clubhouse', href: '/programs#clubhouse' },
    { label: 'Human Trafficking', href: '/programs#human-trafficking' },
    { label: 'New Clients', href: '/programs#get-help' },
  ] },
  { label: 'Events & News', href: '/events', key: 'events' },
  { label: 'Get Help', href: '/programs#get-help', key: 'gethelp' },
  { label: 'Ways to Give', href: '/donate', key: 'give', subs: [
    { label: 'Donate', href: 'https://givebutter.com/9SyJHR', external: true },
  ] },
  { label: 'Join our Team', href: '/get-involved', key: 'involved', subs: [
    { label: 'Jobs', href: '/get-involved#careers' },
    { label: 'Internships', href: '/get-involved#internships' },
  ] },
  { label: 'Contact', href: '/contact', key: 'contact' },
];
