'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 50, rotateX: -20, transformPerspective: 1000 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          },
        }
      );
    }
  }, []);

  return (
    <footer ref={containerRef} className="relative bg-[#111111] text-white py-32 overflow-hidden perspective-[1000px]">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none"
      >
        <source src="/videos/footer.mp4" type="video/mp4" />
      </video>

      {/* Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
        <h1 
          className="text-[10rem] md:text-[16rem] font-serif font-bold text-center opacity-[0.03] whitespace-nowrap"
          style={{ WebkitBackgroundClip: 'text', backgroundClip: 'text', backgroundImage: 'linear-gradient(to bottom, white 25%, transparent 85%)' }}
        >
          FARHA
        </h1>
      </div>

      {/* Foreground Card */}
      <div 
        ref={cardRef}
        className="relative z-10 max-w-5xl mx-auto bg-white text-[#111111] rounded-[2rem] shadow-2xl p-12 md:p-16 mx-6 md:mx-auto"
      >
        {/* Decorative Punch Holes */}
        <div className="absolute -top-3 left-8 w-6 h-6 rounded-full bg-[#111111]"></div>
        <div className="absolute -top-3 right-8 w-6 h-6 rounded-full bg-[#111111]"></div>

        <h2 className="text-3xl md:text-4xl font-serif font-bold text-center tracking-tight mb-8">
          Step Into Your Best Style
        </h2>

        <div className="border-t border-dashed border-[#111111]/20 my-10"></div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <h3 className="text-xs uppercase tracking-widest font-bold mb-6 text-[#111111]/50">Shop</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:text-[#C9A96E] transition-colors">All Collections</a></li>
              <li><a href="#" className="hover:text-[#C9A96E] transition-colors">New Arrivals</a></li>
              <li><a href="#" className="hover:text-[#C9A96E] transition-colors">Bridal Wear</a></li>
              <li><a href="#" className="hover:text-[#C9A96E] transition-colors">Festive Edits</a></li>
            </ul>
          </div>
          <div className="md:col-span-1">
            <h3 className="text-xs uppercase tracking-widest font-bold mb-6 text-[#111111]/50">Help</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:text-[#C9A96E] transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-[#C9A96E] transition-colors">Size Guide</a></li>
              <li><a href="#" className="hover:text-[#C9A96E] transition-colors">Shipping</a></li>
              <li><a href="#" className="hover:text-[#C9A96E] transition-colors">Returns</a></li>
              <li><a href="#" className="hover:text-[#C9A96E] transition-colors">Care Instructions</a></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h3 className="text-xs uppercase tracking-widest font-bold mb-6 text-[#111111]/50">Stay in the loop</h3>
            <p className="text-sm text-[#111111]/70 mb-4">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 rounded-full border border-[#111111]/10 bg-[#F9F9F9] px-6 py-3 text-sm outline-none focus:border-[#C9A96E] transition-colors"
                required
              />
              <button 
                type="submit"
                className="rounded-full bg-[#111111] text-white px-8 py-3 text-sm font-medium uppercase tracking-widest hover:bg-black/90 transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[#111111]/10 text-center">
          <p className="text-sm text-[#111111]/40">
            © 2024 Farha Tarannum Couture. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
