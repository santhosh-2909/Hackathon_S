import type { Metadata, Viewport } from 'next';
import { Fraunces, JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google';

import '@/styles/globals.css';

import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/providers/theme-provider';
import { QueryProvider } from '@/providers/query-provider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import CursorLiquid from '@/components/ui/cursor-liquid';
import { Logo } from '@/components/layout/logo';

const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans-family',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono-family',
  display: 'swap',
});

/**
 * Variable display serif. `opsz` is bound to the size axis so the large steps
 * get the high-contrast display cut and the smaller ones keep enough stroke
 * weight to stay legible — a single static optical size cannot do both.
 */
const display = Fraunces({
  subsets: ['latin'],
  axes: ['opsz', 'SOFT', 'WONK'],
  variable: '--font-display-family',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.title }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5f8ff' },
    { media: '(prefers-color-scheme: dark)', color: '#0b1220' },
  ],
  colorScheme: 'light dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(sans.variable, mono.variable, display.variable, 'min-h-dvh antialiased')}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <QueryProvider>
            <TooltipProvider delayDuration={200}>
              <a
                href="#main"
                className="skip-link rounded-md bg-primary px-4 py-2 text-body-sm text-primary-foreground shadow-e3"
              >
                Skip to content
              </a>
              {/* Watermark background (pointer-events-none so it doesn't block interaction) */}
              <div className="pointer-events-none fixed inset-0 -z-20 flex items-center justify-center">
                <img
                  src="/imagery/kira-logo-new.png"
                  alt="Kira watermark"
                  className="max-w-[900px] w-1/2 object-contain transform -translate-y-8 rotate-[-8deg]"
                  style={{ opacity: 0.04 }}
                />
              </div>

              {/* Fixed top-left logo — uses Logo component; reveals wordmark on hover */}
              <div className="fixed top-4 left-4 z-50">
                <div className="group flex items-center gap-2 rounded-full bg-white/90 dark:bg-black/70 p-1 pr-3 shadow-md backdrop-blur-sm">
                  <Logo className="p-1 rounded-full" showWordmark={false} />
                  <span className="hidden group-hover:inline-block text-h4 font-semibold text-primary-foreground dark:text-primary-foreground">
                    {siteConfig.name}
                  </span>
                </div>
              </div>
              {/* Liquid cursor / grid effect overlay (above watermark) */}
              <CursorLiquid />
              {children}
              <Toaster />
            </TooltipProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
