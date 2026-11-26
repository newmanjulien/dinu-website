export const CUSTOMER_BRANDS = [
  {
    id: 'rippling',
    name: 'Rippling',
    src: '/logos/rippling.svg',
    width: 127,
    height: 18,
    displayHeight: 'clamp(13.5px, 1.35vw, 15px)',
    tileHeight: 14
  },
  {
    id: 'ramp',
    name: 'Ramp',
    src: '/logos/ramp.svg',
    width: 71,
    height: 20,
    displayHeight: 'clamp(19.47663px, 1.78771vw, 21.6407px)',
    tileHeight: 20.6998
  },
  {
    id: 'replit',
    name: 'Replit',
    src: '/logos/replit.svg',
    width: 71,
    height: 21,
    displayHeight: 'clamp(18.9px, 1.7325vw, 21px)',
    tileHeight: 19.95
  },
  {
    id: 'supabase',
    name: 'Supabase',
    src: '/logos/supabase.svg',
    width: 581,
    height: 113,
    displayHeight: 'clamp(18.753525px, 1.79431875vw, 20.83725px)',
    tileHeight: 19.679625
  },
  {
    id: 'posthog',
    name: 'PostHog',
    src: '/logos/posthog.svg',
    width: 160,
    height: 28,
    displayHeight: 'clamp(15.714px, 1.5035vw, 17.46px)',
    tileHeight: 16.49
  },
  {
    id: 'retool',
    name: 'Retool',
    src: '/logos/retool.svg',
    width: 87,
    height: 17,
    displayHeight: 'clamp(14.6205px, 1.398875vw, 16.245px)',
    tileHeight: 15.3425
  },
  {
    id: 'revenuecat',
    name: 'RevenueCat',
    src: '/logos/revenuecat.svg',
    width: 138,
    height: 40,
    displayHeight: 'clamp(23.4px, 2.25vw, 26px)',
    tileHeight: 24
  },
  {
    id: 'lattice',
    name: 'Lattice',
    src: '/logos/lattice.svg',
    width: 112,
    height: 21,
    displayHeight: 'clamp(16.587px, 1.552vw, 18.43px)',
    tileHeight: 17.46
  },
  {
    id: 'zip',
    name: 'Zip',
    src: '/logos/zip.svg',
    width: 54,
    height: 37,
    displayHeight: 'clamp(17.8695px, 1.6245vw, 19.855px)',
    tileHeight: 18.9525
  },
  {
    id: 'webflow',
    name: 'Webflow',
    src: '/logos/webflow.svg',
    width: 108,
    height: 19,
    displayHeight: 'clamp(16.245px, 1.489125vw, 18.05px)',
    tileHeight: 17.1475
  },
  {
    id: 'algolia',
    name: 'Algolia',
    src: '/logos/algolia.svg',
    width: 2197,
    height: 501,
    displayHeight: 'clamp(18.68175px, 1.71475vw, 20.7575px)',
    tileHeight: 19.855
  }
] as const;

type CustomerTestimonial = {
  brandId: (typeof CUSTOMER_BRANDS)[number]['id'];
  quote: string;
  name: string;
  role: string;
  displayHeight: number;
};

export const CUSTOMER_TESTIMONIALS = [
  {
    brandId: 'rippling',
    quote: 'Dinu lets our reps close +90% of deals without help from legal.',
    name: 'Christopher Haworth',
    role: 'VP of Sales',
    displayHeight: 18
  },
  {
    brandId: 'ramp',
    quote: 'Dinu cut our sales cycle by 30% and improved rep productivity by 10%.',
    name: 'Stephen Sunder',
    role: 'CRO',
    displayHeight: 23.5225
  },
  {
    brandId: 'replit',
    quote: 'Dinu keeps deals moving and lets legal focus where it matters.',
    name: 'Ghazi Masood',
    role: 'CRO',
    displayHeight: 23.1
  }
] as const satisfies readonly CustomerTestimonial[];
