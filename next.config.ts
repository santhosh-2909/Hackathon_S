import type { NextConfig } from 'next';

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Keep the client bundle lean: icon and motion libraries are barrel-heavy.
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', 'cmdk'],
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    // The design uses a 4/8/12-column grid; these widths line up with the
    // container breakpoints so the CDN never generates an unused variant.
    deviceSizes: [360, 390, 430, 600, 820, 1024, 1366, 1440, 1920],
    imageSizes: [16, 24, 32, 48, 64, 96, 128, 256, 384],
  },

  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default nextConfig;
