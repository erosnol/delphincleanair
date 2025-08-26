import HeroSection from '@/components/HeroSection';
import FreeGiftSection from '@/components/FreeGiftSection';
import BookingSection from '@/components/BookingSection';
import EbooksSection from '@/components/EbooksSection';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <FreeGiftSection />
      <BookingSection />
      <section id="ebooks">
        <EbooksSection />
      </section>
    </main>
  );
}
