'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const images = [
  '/images/black-gold-kurta.jpg',
  '/images/taupe-embroidered-kurta.jpg',
  '/images/three-models-group.jpg',
  '/images/black-silver-kurta.jpg',
  '/images/lime-green-kurta.jpg',
  '/images/purple-gold-kurta.jpg',
  '/images/golden-silk-kurta.jpg',
  '/images/blue-embroidered-suit.jpg',
  '/images/red-silk-suit.jpg',
  '/images/olive-purple-suit.jpg',
  '/images/lavender-embroidered-suit.jpg',
];

export default function IdentityShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(
        headerRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      // Mid-section video entrance
      if (videoRef.current) {
        gsap.fromTo(
          videoRef.current,
          {
            opacity: 0,
            y: 50,
            rotateX: -40,
            transformPerspective: 1000,
          },
          {
            opacity: 0.8,
            y: 0,
            rotateX: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: videoRef.current,
              start: 'top 85%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-[#111] text-white relative overflow-hidden">
      <div ref={headerRef} className="relative z-10 px-6">
        <p className="text-xs uppercase tracking-[0.2em] font-medium text-white/60 mb-4 text-center">
          Express Your Identity
        </p>
        <h2 className="text-4xl md:text-6xl font-serif font-bold max-w-4xl mx-auto text-center mb-6 tracking-tight">
          Crafted With Passion, Worn With Pride
        </h2>
        <p className="text-white/60 max-w-2xl mx-auto text-center mb-16">
          Embrace the rich heritage of South Asian craftsmanship with our exquisite collection. Every thread tells a story of tradition, elegance, and unyielding passion.
        </p>
      </div>

      <div className="px-6 mb-24 relative z-10">
        <video
          ref={videoRef}
          src="/videos/mid.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="rounded-3xl mx-auto max-w-4xl w-full object-cover opacity-80 shadow-2xl"
        />
      </div>

      {/* Marquee Section */}
      <div className="relative pt-12 pb-12 bg-[#111]">
        {/* Curved SVG edges top and bottom */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-20">
          <svg className="block w-full h-[50px]" viewBox="0 0 100 11" preserveAspectRatio="none">
            <path d="M0,0 L100,0 L100,11 Q50,-8 0,11 Z" fill="#111"></path>
          </svg>
        </div>

        <div className="flex flex-col gap-6 overflow-hidden">
          {/* Row 1 */}
          <div className="flex gap-4 w-max animate-marquee">
            {[...images, ...images].map((src, idx) => (
              <div key={`row1-${idx}`} className="h-48 w-36 relative flex-shrink-0 rounded-2xl overflow-hidden">
                <Image src={src} alt="Showcase" fill className="object-cover" />
              </div>
            ))}
          </div>

          {/* Row 2 (reverse) */}
          <div className="flex gap-4 w-max animate-marquee-reverse" style={{ animationDirection: 'reverse' }}>
            {[...images, ...images].reverse().map((src, idx) => (
              <div key={`row2-${idx}`} className="h-48 w-36 relative flex-shrink-0 rounded-2xl overflow-hidden">
                <Image src={src} alt="Showcase" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180 z-20">
          <svg className="block w-full h-[50px]" viewBox="0 0 100 11" preserveAspectRatio="none">
            <path d="M0,0 L100,0 L100,11 Q50,-8 0,11 Z" fill="#111"></path>
          </svg>
        </div>
      </div>

      <div className="mx-auto mt-12 flex justify-center relative z-10 w-32 h-32">
        <div className="absolute inset-0 animate-spin-slow">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent" />
            <text className="text-[10px] font-bold tracking-widest fill-white">
              <textPath href="#circlePath" startOffset="0%">
                SCROLL DOWN • SCROLL DOWN • SCROLL DOWN • 
              </textPath>
            </text>
          </svg>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <ArrowDown className="w-6 h-6 text-white" />
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee 30s linear infinite reverse;
        }
        .animate-spin-slow {
          animation: spin 10s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
