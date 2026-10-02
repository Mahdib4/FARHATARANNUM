'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Note: If you have a separate @/data/products file, you can import this array from there.
const categories = [
  {
    id: 1,
    name: 'New Arrivals',
    count: '24 Items',
    image: '/images/three-models-group.jpg',
    className: 'md:row-span-2 md:col-span-1 min-h-[400px] md:min-h-full',
  },
  {
    id: 2,
    name: 'Bridal Collection',
    count: '12 Items',
    image: '/images/red-silk-suit.jpg',
    className: 'md:col-span-2 min-h-[300px]',
  },
  {
    id: 3,
    name: 'Festive Wear',
    count: '36 Items',
    image: '/images/purple-gold-kurta.jpg',
    className: 'md:col-span-1 min-h-[300px]',
  },
  {
    id: 4,
    name: 'Everyday Elegance',
    count: '48 Items',
    image: '/images/lavender-embroidered-suit.jpg',
    className: 'md:col-span-1 min-h-[300px]',
  },
];

export default function CategoryGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        {
          opacity: 0,
          y: 50,
          rotateX: -40,
          transformPerspective: 1000,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6 md:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.2em] font-medium text-black/60 mb-2">
            BROWSE BY
          </p>
          <h2 className="text-5xl font-serif font-bold tracking-tight text-black">
            Our Categories
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4">
          {categories.map((category, index) => (
            <div
              key={category.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className={`relative rounded-3xl overflow-hidden group cursor-pointer ${category.className}`}
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              <div className="absolute bottom-0 left-0 p-6 w-full flex justify-between items-end">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {category.name}
                  </h3>
                  <p className="text-white/80">{category.count}</p>
                </div>
                
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium">
                    View Collection &rarr;
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
