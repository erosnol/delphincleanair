import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Navigation />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </NextIntlClientProvider>
  );
}
