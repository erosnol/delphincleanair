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
      <body>
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
