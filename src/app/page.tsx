'use client';

import useLenis from '@/lib/lenis';
import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProductShowcase from '@/components/ProductShowcase';
import PopularPicks from '@/components/PopularPicks';
import NewArrivals from '@/components/NewArrivals';
import CategoryGrid from '@/components/CategoryGrid';
import IdentityShowcase from '@/components/IdentityShowcase';
import FeaturedProduct from '@/components/FeaturedProduct';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

export default function Home() {
  useLenis();

  return (
    <>
      <Preloader />
      <Navbar />
      <main>
        <Hero />
        <ProductShowcase />
        <PopularPicks />
        <NewArrivals />
        <CategoryGrid />
        <IdentityShowcase />
        <FeaturedProduct />
        <Testimonials />
        <Footer />
      </main>
    </>
  );
}
