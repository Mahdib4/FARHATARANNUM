'use client';

import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLDivElement>(null);
  const title2Ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 3.5 });

      // Badge pops in
      tl.fromTo(badgeRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 0);

      // Title lines reveal via yPercent
      tl.fromTo([title1Ref.current, title2Ref.current], 
        { yPercent: 110 },
        { yPercent: 0, duration: 1, ease: "power4.out", stagger: 0.15 },
        0.2
      );

      // Subtitle + buttons stagger in
      tl.fromTo(contentRef.current?.children ? Array.from(contentRef.current.children) : [],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.1 },
        0.6
      );

      // Right-side floating cards
      tl.fromTo(cardsRef.current?.children ? Array.from(cardsRef.current.children) : [],
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.15 },
        0.8
      );

      // Video scale/fade
      tl.fromTo(videoRef.current,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" },
        0.4
      );

      // Bottom stats bar
      tl.fromTo(statsRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        1
      );

      // Scroll Parallax
      gsap.to(container.current, {
        yPercent: -6,
        opacity: 0.4,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="relative min-h-screen bg-white text-black overflow-hidden pt-24 pb-32 px-6 lg:px-12 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center flex-grow">
        
        {/* Left Content (60% approx -> 7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-start z-10">
          <div ref={badgeRef} className="inline-flex items-center gap-2 rounded-full bg-black text-white px-4 py-1.5 text-xs tracking-[0.2em] uppercase mb-8">
            <Star className="w-3 h-3 fill-current" />
            NEW COLLECTION
          </div>

          <div className="mb-6">
            <div className="overflow-hidden">
              <h1 ref={title1Ref} className="text-6xl md:text-8xl font-bold font-serif tracking-tighter leading-tight">
                Elegance.
              </h1>
            </div>
            <div className="overflow-hidden">
              <h1 ref={title2Ref} className="text-6xl md:text-8xl font-bold font-serif tracking-tighter leading-tight">
                Redefined.
              </h1>
            </div>
          </div>

          <div ref={contentRef} className="flex flex-col items-start">
            <p className="text-lg text-black/60 max-w-md mb-8">
              Where heritage meets haute couture. Discover hand-crafted luxury ethnic wear that tells your story.
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <button className="flex items-center gap-2 rounded-full bg-black text-white px-8 py-4 text-sm tracking-wide uppercase hover:bg-black/90 transition-colors">
                Explore Collection
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <button className="rounded-full border-2 border-black/20 text-black px-8 py-4 text-sm tracking-wide uppercase hover:border-black/40 transition-colors">
                Watch Lookbook
              </button>
            </div>
          </div>
        </div>

        {/* Right Side (40% approx -> 5 cols) */}
        <div className="lg:col-span-5 relative w-full h-[600px] flex items-center justify-center mt-12 lg:mt-0">
          <div ref={videoRef} className="w-full h-full rounded-3xl overflow-hidden relative shadow-2xl">
            <video 
              src="/videos/hero.mp4" 
              autoPlay 
              muted 
              loop 
              playsInline
              className="w-full h-full object-cover"
            />
          </div>

          {/* Floating Cards */}
          <div ref={cardsRef} className="absolute inset-0 pointer-events-none">
            {/* Card 1 */}
            <div className="absolute top-12 -left-12 bg-white/70 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/20 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center">
                <Star className="w-5 h-5 text-black" />
              </div>
              <div className="text-sm font-medium text-black">Premium<br/>Handcraft</div>
            </div>

            {/* Card 2 */}
            <div className="absolute bottom-32 -right-8 bg-white/70 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/20">
              <div className="text-xs tracking-wider uppercase text-black/60 mb-1">Edition</div>
              <div className="text-sm font-medium text-black">Limited Release</div>
            </div>

            {/* Card 3 */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white/70 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/20 flex items-center gap-4">
              <div className="flex -space-x-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-white"></div>
              </div>
              <div className="text-sm font-medium text-black">Loved by 2.4K+</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Stats Bar */}
      <div className="absolute bottom-8 left-0 w-full px-6 flex justify-center z-20">
        <div ref={statsRef} className="rounded-full bg-white shadow-2xl border border-black/5 px-8 py-4 flex items-center justify-between gap-8 md:gap-16 max-w-3xl w-full">
          <div className="text-center">
            <div className="font-bold text-lg text-black">50+</div>
            <div className="text-xs text-black/50 uppercase tracking-wide">Collections</div>
          </div>
          <div className="w-px h-8 bg-black/10"></div>
          <div className="text-center">
            <div className="font-bold text-lg text-black">12+</div>
            <div className="text-xs text-black/50 uppercase tracking-wide">Designers</div>
          </div>
          <div className="w-px h-8 bg-black/10"></div>
          <div className="text-center">
            <div className="font-bold text-lg text-black">2.4K+</div>
            <div className="text-xs text-black/50 uppercase tracking-wide">Customers</div>
          </div>
        </div>
      </div>
    </section>
  );
}
