import type { MetadataRoute } from 'next';

import { siteConfig } from '@/config/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Authenticated and credential surfaces carry no public value.
      disallow: ['/dashboard', '/sign-up'],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
