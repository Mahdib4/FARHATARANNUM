'use client';

import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const brandNameRef = useRef<HTMLHeadingElement>(null);
  const coutureRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        setIsLoading(false);
        onComplete?.();
      }
    });

    // 1. Brand name fades in + slides up from y:30 (0.8s)
    tl.fromTo(brandNameRef.current, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    )
    // 2. 'COUTURE' text fades in (0.4s)
    .fromTo(coutureRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: 'power2.out' },
      "-=0.2"
    )
    // 3. Gold line expands (1.5s, ease: power2.inOut)
    .fromTo(lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.5, ease: 'power2.inOut', transformOrigin: 'center center' },
      "-=0.2"
    )
    // 4. Everything fades out together (0.6s)
    .to(containerRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: 'power3.inOut',
      delay: 0.2
    });

    return () => {
      document.body.style.overflow = '';
      tl.kill();
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 bg-[#111] flex flex-col items-center justify-center pointer-events-none"
    >
      <div className="flex flex-col items-center justify-center">
        <h1 
          ref={brandNameRef}
          className="text-5xl md:text-7xl font-serif tracking-tighter text-white mb-2"
          style={{ opacity: 0 }}
        >
          FARHA TARANNUM
        </h1>
        <div 
          ref={coutureRef}
          className="text-white text-xs md:text-sm tracking-[0.3em] uppercase mb-8"
          style={{ opacity: 0 }}
        >
          COUTURE
        </div>
        <div className="w-64 h-[1px] bg-white/20 overflow-hidden">
          <div 
            ref={lineRef}
            className="w-full h-full bg-[#C9A96E]"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
      </div>
    </div>
  );
}
