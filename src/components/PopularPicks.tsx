'use client';

import { useRef, useEffect } from 'react';
import { products } from '@/data/products';
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

export default function PopularPicks() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      }
    });

    tl.fromTo(headerRef.current, 
      { opacity: 0, y: 50, rotateX: -40, transformPerspective: 1000 },
      { opacity: 1, y: 0, rotateX: 0, duration: 1, ease: 'power3.out' }
    )
    .fromTo(cardsRef.current,
      { opacity: 0, y: 50, rotateX: -40, transformPerspective: 1000 },
      { opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
      '-=0.5'
    );
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section ref={sectionRef} className="py-24 px-6 bg-offwhite">
      <div ref={headerRef} className="max-w-[1400px] mx-auto mb-12 flex justify-between items-end">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-ink/40 block mb-4">SHOP THE COLLECTION</span>
          <h2 className="text-5xl font-serif font-bold text-ink">Popular Picks</h2>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => scroll('left')}
            className="w-12 h-12 rounded-full border border-ink/20 flex items-center justify-center hover:bg-ink hover:text-white transition"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="w-12 h-12 rounded-full border border-ink/20 flex items-center justify-center hover:bg-ink hover:text-white transition"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div 
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 max-w-[1400px] mx-auto"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style dangerouslySetInnerHTML={{__html: `
          ::-webkit-scrollbar { display: none; }
        `}} />
        {products.map((product, index) => (
          <div 
            key={product.id}
            ref={el => { cardsRef.current[index] = el; }}
            className="snap-start flex-shrink-0 w-[280px] rounded-3xl bg-white shadow-neu overflow-hidden"
          >
            <div className="aspect-[3/4] bg-[#F3F3F3] relative">
              <Image 
                src={product.image} 
                alt={product.name} 
                fill 
                className="object-cover"
              />
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-lg text-ink">{product.name}</h3>
              <p className="text-sm text-ink/50 mb-4">{product.category}</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-ink">৳{product.price.toLocaleString()}</span>
                <button className="rounded-full bg-ink text-white w-10 h-10 flex items-center justify-center hover:scale-105 transition">
                  <ShoppingBag size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
