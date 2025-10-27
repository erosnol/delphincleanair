import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Toaster } from 'react-hot-toast';
import { Providers } from './providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'Delphin Clean Air - Revolutionary Air Purification System',
  description: 'Experience the revolutionary Delphin air purification system that transforms your home into a sanctuary of clean, healthy air. Trusted by 100,000+ families worldwide.',
  keywords: 'air purification, clean air, Delphin, air quality, home health, allergen removal',
  authors: [{ name: 'Delphin Clean Air' }],
  openGraph: {
    title: 'Delphin Clean Air - Revolutionary Air Purification System',
    description: 'Transform your home into a sanctuary of clean, healthy air with Delphin.',
    type: 'website',
    locale: 'en_US',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='4' fill='white'/><path d='M8 12c0-1 1-2 2.5-2.5C12 9 14 8.5 16 9c2 0.5 4 1.5 5 3 0.5 0.8 0.5 1.5 0 2-0.3 0.3-0.8 0.5-1.2 0.3-0.2-0.1-0.3-0.3-0.3-0.5 0-0.2 0.1-0.4 0.3-0.5 0.1-0.1 0.2-0.1 0.3-0.1s0.2 0 0.2 0.1c0 0.1-0.1 0.1-0.2 0.1h-0.1c-0.1 0-0.1 0.1-0.1 0.1s0 0.1 0.1 0.1c0.2 0 0.4-0.1 0.5-0.3 0.2-0.3 0.1-0.7-0.2-0.9-0.5-0.3-1.2-0.1-1.5 0.4-0.2 0.3-0.2 0.7 0 1 0.3 0.4 0.8 0.6 1.3 0.5 1-0.2 1.8-1 2-2 0.1-0.5 0-1-0.3-1.4-0.8-1.2-2.5-2-4-2.3-1.5-0.3-3 0-4.2 0.8C9.2 10.5 8.5 11.2 8 12z' fill='%231e3a8a'/><circle cx='18' cy='12' r='0.8' fill='white'/><circle cx='18.2' cy='11.8' r='0.3' fill='%231e3a8a'/><path d='M4 20c2-1 4 1 6 0s4-1 6 0 4 1 6 0 4-1 6 0' stroke='%231e3a8a' stroke-width='1.5' fill='none'/><path d='M4 23c2-1 4 1 6 0s4-1 6 0 4 1 6 0 4-1 6 0' stroke='%231e3a8a' stroke-width='1.5' fill='none'/><path d='M4 26c2-1 4 1 6 0s4-1 6 0 4 1 6 0 4-1 6 0' stroke='%231e3a8a' stroke-width='1.5' fill='none'/></svg>" />
        {process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY && (
          <script
            async
            defer
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}&libraries=places&loading=async`}
          />
        )}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Suppress non-critical console warnings
              if (typeof window !== 'undefined') {
                const originalWarn = console.warn;
                console.warn = function(...args) {
                  const message = args.join(' ');
                  // Suppress specific warnings that don't affect functionality
                  if (message.includes('Extra attributes from the server') ||
                      message.includes('allowfullscreen') ||
                      message.includes('chrome-extension')) {
                    return;
                  }
                  originalWarn.apply(console, args);
                };
              }
            `
          }}
        />
      </head>
      <body suppressHydrationWarning={true}>
        <Providers>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 4000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
