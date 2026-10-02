'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedProduct() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const images = [
    '/images/golden-silk-kurta.jpg',
    '/images/blue-embroidered-suit.jpg',
    '/images/red-silk-suit.jpg',
    '/images/olive-purple-suit.jpg',
  ];

  const [mainImage, setMainImage] = useState(images[0]);

  useEffect(() => {
    if (containerRef.current && leftRef.current && rightRef.current) {
      gsap.fromTo(
        [leftRef.current, rightRef.current],
        { opacity: 0, y: 50, rotateX: -40, transformPerspective: 1000 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          stagger: 0.2,
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
    <section ref={containerRef} className="py-24 px-6 md:px-16 bg-[#F9F9F9] overflow-hidden perspective-[1000px]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: Image Gallery */}
        <div ref={leftRef} className="flex flex-col gap-4">
          <div className="relative rounded-3xl overflow-hidden aspect-square">
            <Image
              src={mainImage}
              alt="Featured Product"
              fill
              className="object-cover transition-opacity duration-500"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {images.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setMainImage(img)}
                className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-colors ${
                  mainImage === img ? 'border-[#C9A96E]' : 'border-transparent'
                }`}
              >
                <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div ref={rightRef} className="flex flex-col gap-6">
          <div>
            <p className="text-xs tracking-[0.25em] text-[#111111]/40 uppercase font-medium mb-2">Featured Piece</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-[#111111]">Golden Heritage Kurta</h2>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-[#111111]">৳16,800</span>
            <div className="flex items-center gap-2 border-l border-[#111111]/10 pl-4">
              <div className="flex text-[#C9A96E]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i === 4 ? 'transparent' : 'currentColor'} className="text-[#C9A96E]" />
                ))}
              </div>
              <span className="text-sm font-medium text-[#111111]/60">4.8 (95 reviews)</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 my-2">
            <div className="rounded-2xl bg-white shadow-md shadow-black/5 p-4 border border-black/5">
              <p className="text-xs text-[#111111]/50 uppercase tracking-wider mb-1">Made to Order</p>
              <p className="font-bold text-lg text-[#111111]">৳16,800</p>
              <p className="text-xs text-[#111111]/60 mt-2">4-6 weeks</p>
            </div>
            <div className="rounded-2xl bg-white shadow-md shadow-black/5 p-4 border border-black/5 opacity-50 cursor-not-allowed">
              <p className="text-xs text-[#111111]/50 uppercase tracking-wider mb-1">Ready to Ship</p>
              <p className="font-bold text-lg text-[#111111]">৳19,500</p>
              <p className="text-xs text-[#111111]/60 mt-2">Ships in 2 days</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <select className="w-full appearance-none rounded-full border border-[#111111]/20 px-6 py-4 bg-transparent outline-none focus:border-[#C9A96E] text-sm font-medium text-[#111111]">
              <option value="">Select Size</option>
              <option value="xs">XS</option>
              <option value="s">S</option>
              <option value="m">M</option>
              <option value="l">L</option>
              <option value="xl">XL</option>
            </select>
            <select className="w-full appearance-none rounded-full border border-[#111111]/20 px-6 py-4 bg-transparent outline-none focus:border-[#C9A96E] text-sm font-medium text-[#111111]">
              <option value="">Select Color</option>
              <option value="gold">Golden Silk</option>
              <option value="black">Midnight Black</option>
            </select>
          </div>

          <div className="flex gap-4 mt-4">
            <button className="flex-1 rounded-full bg-[#111111] text-white py-4 text-sm tracking-widest uppercase font-medium hover:bg-black/90 transition-colors">
              Add to Collection
            </button>
            <button className="rounded-full border border-[#111111]/20 w-14 h-14 flex items-center justify-center hover:bg-black/5 transition-colors group">
              <Heart size={20} className="text-[#111111] group-hover:text-[#C9A96E]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
