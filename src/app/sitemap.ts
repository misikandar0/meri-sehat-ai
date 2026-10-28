import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://merisehat.ai';

  const routes = [
    '',
    '/analyzer',
    '/prescription',
    '/report/sample',
    '/compare',
    '/doctors',
    '/pricing',
    '/health-library',
    '/clinical-safety',
    '/privacy',
    '/terms',
    '/medical-disclaimer',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : route.startsWith('/analyzer') || route.startsWith('/prescription') ? 0.9 : 0.8,
  }));
}
