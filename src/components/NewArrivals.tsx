'use client';

import { useRef, useEffect } from 'react';
import { products } from '@/data/products';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

export default function NewArrivals() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const newProducts = products.filter(p => p.isNew);

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
    .fromTo(cardsRef.current.filter(Boolean),
      { opacity: 0, y: 50, rotateX: -40, transformPerspective: 1000 },
      { opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
      '-=0.5'
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6 md:px-16 bg-offwhite">
      <div className="max-w-[1400px] mx-auto">
        <div ref={headerRef} className="mb-12 text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-ink/40 block mb-4">JUST ARRIVED</span>
          <h2 className="text-5xl font-serif font-bold text-ink">New Arrivals</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {newProducts.map((product, index) => (
            <div 
              key={product.id}
              ref={el => { cardsRef.current[index] = el; }}
              className="rounded-3xl bg-white shadow-neu overflow-hidden group cursor-pointer"
            >
              <div className="aspect-[3/4] relative overflow-hidden bg-[#F3F3F3]">
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  fill 
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-4 left-4 bg-ink text-white text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                  NEW
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-lg text-ink mb-2">{product.name}</h3>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-ink">৳{product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-ink/50 line-through">
                      ৳{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
