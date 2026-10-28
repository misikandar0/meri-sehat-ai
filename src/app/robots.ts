import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
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
        ],
        disallow: [
          '/api/',
          '/admin/',
          '/dashboard/',
          // Disallow crawling private dynamic user reports
          '/report/*',
        ],
      },
    ],
    sitemap: 'https://merisehat.ai/sitemap.xml',
  };
}
