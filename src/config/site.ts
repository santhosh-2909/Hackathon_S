/**
 * Resolve the public origin.
 *
 * Order matters: an explicit `NEXT_PUBLIC_SITE_URL` wins so a custom domain can
 * override everything. Failing that, Vercel injects the production domain at
 * build time, which keeps canonical URLs, OG images and the sitemap correct on a
 * zero-config deploy — without it they would all ship pointing at localhost.
 */
function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, '');

  const vercelDomain =
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL;
  if (vercelDomain) return `https://${vercelDomain}`;

  return 'http://localhost:3000';
}

/**
 * Single source of truth for brand-level strings and canonical URLs.
 * Metadata, structured data, sitemap and the OG image all read from here.
 */
export const siteConfig = {
  name: 'Kira_2026',
  product: 'Innovation Challenge',
  title: 'Kira_2026 — Innovation Challenge',
  tagline: 'Discover. Build. Demo.',
  description:
    'A working method for choosing hackathon problem statements: the pain-not-solution template, five pre-build checks, a weekend delivery plan, and a researched directory of ten real SIH problem statements.',
  url: resolveSiteUrl(),
  ogImage: '/imagery/cover-0.png',
  locale: 'en_IN',
  keywords: [
    'hackathon',
    'problem statement',
    'Smart India Hackathon',
    'SIH',
    'MVP',
    'vertical slice',
    'tech stack',
    'student teams',
  ],
  links: {
    docs: '/playbook',
    directory: '/problems',
  },
} as const;

export type SiteConfig = typeof siteConfig;
