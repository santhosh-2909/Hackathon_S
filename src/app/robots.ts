import type { MetadataRoute } from 'next';

import { siteConfig } from '@/config/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // The workshop has no account or credential surfaces.
      disallow: ['/dashboard'],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
