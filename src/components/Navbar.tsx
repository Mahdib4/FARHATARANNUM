'use client';

import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { Search, ShoppingBag, Menu } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Entrance animation
    gsap.fromTo(navRef.current,
      { y: -24, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 3.5, ease: 'power3.out' }
    );

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 py-6 px-4 md:px-8`}
    >
      <div className="container mx-auto max-w-6xl">
        <div className={`flex items-center justify-between transition-all duration-300 rounded-full px-6 py-4 md:px-8 backdrop-blur-md shadow-md ${
          scrolled ? 'bg-white/90 shadow-lg' : 'bg-white/70'
        }`}>
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-xs md:text-sm uppercase tracking-widest font-semibold text-black">
              FARHA TARANNUM
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {['Home', 'Shop', 'Collections', 'About'].map((item) => (
              <Link 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-sm uppercase tracking-wide text-black hover:text-[#C9A96E] relative group transition-colors"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#C9A96E] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-5 text-black">
            <button className="hover:text-[#C9A96E] transition-colors" aria-label="Search">
              <Search size={20} strokeWidth={1.5} />
            </button>
            <button className="hover:text-[#C9A96E] transition-colors relative" aria-label="Shopping Bag">
              <ShoppingBag size={20} strokeWidth={1.5} />
              <span className="absolute -top-1.5 -right-2 bg-[#C9A96E] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                2
              </span>
            </button>
            <button className="md:hidden hover:text-[#C9A96E] transition-colors ml-2" aria-label="Menu">
              <Menu size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
