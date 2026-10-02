'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const reviews = [
    {
      name: 'Ayesha Rahman',
      text: "The craftsmanship is beyond anything I've seen. Every stitch tells a story of dedication. My wedding kurta was absolutely perfect.",
      avatar: '/images/black-gold-kurta.jpg',
    },
    {
      name: 'Nadia Hussain',
      text: "Farha Tarannum has redefined what luxury ethnic wear means. The attention to detail in the embroidery is simply breathtaking.",
      avatar: '/images/purple-gold-kurta.jpg',
    },
    {
      name: 'Sabrina Karim',
      text: "From the fabric selection to the final fitting, every step was a premium experience. I've never felt more beautiful.",
      avatar: '/images/lavender-embroidered-suit.jpg',
    }
  ];

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 50, rotateX: -40, transformPerspective: 1000 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
          },
        }
      );
    }
  }, []);

  return (
    <section ref={containerRef} className="py-24 px-6 md:px-16 bg-white overflow-hidden perspective-[1000px]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-[#111111] max-w-2xl leading-tight">
            Every Piece Tells A Story — Here's Theirs
          </h2>
          <div className="flex flex-col items-end gap-2">
            <div className="flex -space-x-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="relative w-12 h-12 rounded-full border-2 border-white overflow-hidden z-[1]">
                  <Image src={reviews[i].avatar} alt="Avatar" fill className="object-cover" />
                </div>
              ))}
            </div>
            <p className="text-sm font-medium text-[#111111]/60">4.5/5 Trusted By 100+ Customers</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              className={`relative bg-white rounded-3xl p-8 shadow-md shadow-black/5 border border-black/5 ${
                i === 1 ? 'md:translate-y-12' : ''
              }`}
            >
              <span className="absolute -top-4 left-6 text-8xl font-serif text-[#111111]/5 leading-none select-none">
                "
              </span>
              <div className="relative border-l-2 border-dashed border-[#111111]/10 pl-6 h-full flex flex-col justify-between pt-6">
                <p className="text-[#111111]/70 leading-relaxed text-lg mb-8">
                  {review.text}
                </p>
                
                <div className="flex items-center gap-4 mt-auto">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image src={review.avatar} alt={review.name} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-bold text-[#111111]">{review.name}</p>
                    <p className="text-xs text-[#111111]/50 uppercase tracking-widest mt-1">Verified Customer</p>
                  </div>
                </div>
                
                <div className="flex text-[#C9A96E] mt-6">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} size={16} fill="currentColor" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
