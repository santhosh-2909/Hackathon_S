import type { MetadataRoute } from 'next';

import { siteConfig } from '@/config/site';
import { getAllProblemSlugs } from '@/services/problems';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllProblemSlugs();
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.url, lastModified, changeFrequency: 'weekly', priority: 1 },
    {
      url: `${siteConfig.url}/problem-statement`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    { url: `${siteConfig.url}/problems`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${siteConfig.url}/playbook`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteConfig.url}/workshop`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
  ];

  return [
    ...staticRoutes,
    ...slugs.map((slug) => ({
      url: `${siteConfig.url}/problems/${slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
