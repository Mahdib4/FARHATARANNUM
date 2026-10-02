'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { products } from '@/data/products';

export default function ProductShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftStageRef = useRef<HTMLDivElement>(null);
  
  const [order, setOrder] = useState<number[]>([0, 1, 2, 3, 4, 5].slice(0, products?.length || 0));
  
  const activeProduct = products?.[order[0]];
  const q1Product = products?.[order[1]];
  const q2Product = products?.[order[2]];
  
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [selectedColor, setSelectedColor] = useState<string>('#000');
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
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
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      );
    }
  }, []);

  useEffect(() => {
    if (activeProduct) {
      setSelectedSize(activeProduct.sizes?.[0] || 'M');
      setSelectedColor(activeProduct.colors?.[0]?.hex || '#000');
    }
  }, [activeProduct]);

  useEffect(() => {
    if (!isAutoPlay || !products || products.length <= 1) return;
    const interval = setInterval(() => {
      handleNext(false);
    }, 4000);
    return () => clearInterval(interval);
  }, [order, isAutoPlay]);

  const animateTransition = () => {
    if (leftStageRef.current) {
      gsap.fromTo(leftStageRef.current,
        { opacity: 0.8, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }
      );
    }
  };

  const handleNext = (manual = true) => {
    if (manual) setIsAutoPlay(false);
    if (!products || products.length <= 1) return;
    
    setOrder((prev) => {
      const newOrder = [...prev];
      const first = newOrder.shift();
      if (first !== undefined) newOrder.push(first);
      return newOrder;
    });
    animateTransition();
  };

  const handlePrev = (manual = true) => {
    if (manual) setIsAutoPlay(false);
    if (!products || products.length <= 1) return;
    
    setOrder((prev) => {
      const newOrder = [...prev];
      const last = newOrder.pop();
      if (last !== undefined) newOrder.unshift(last);
      return newOrder;
    });
    animateTransition();
  };

  if (!products || products.length === 0) return null;

  return (
    <section ref={sectionRef} className="w-full min-h-screen flex flex-col lg:flex-row bg-white overflow-hidden py-12 px-4 lg:px-8 max-w-7xl mx-auto gap-8">
      {/* Left Side - 60% */}
      <div 
        className="w-full lg:w-[60%] relative bg-[#F5F5F3] rounded-3xl min-h-[60vh] lg:min-h-[80vh] p-8 flex flex-col justify-between overflow-hidden"
      >
        <div className="absolute top-8 left-8 z-20">
          <h3 className="text-xl font-serif font-bold tracking-tight">FEATURED</h3>
        </div>

        <div ref={leftStageRef} className="relative w-full h-full flex items-center justify-center flex-grow mt-12 mb-16">
          {/* Main Active Product */}
          {activeProduct && (
            <div className="relative z-30 w-[80%] aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={activeProduct.image}
                alt={activeProduct.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
            </div>
          )}

          {/* Queue 1 Product */}
          {q1Product && products.length > 1 && (
            <div className="absolute z-20 w-[65%] aspect-[3/4] -right-4 lg:-right-12 rounded-3xl overflow-hidden opacity-55 blur-[3px] scale-90 translate-x-12">
              <Image
                src={q1Product.image}
                alt={q1Product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 30vw"
              />
            </div>
          )}

          {/* Queue 2 Product */}
          {q2Product && products.length > 2 && (
            <div className="absolute z-10 w-[50%] aspect-[3/4] -right-12 lg:-right-24 rounded-3xl overflow-hidden opacity-32 blur-[6px] scale-75 translate-x-24">
              <Image
                src={q2Product.image}
                alt={q2Product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 30vw, 20vw"
              />
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="relative z-40 flex justify-between items-center w-full mt-auto">
          <button 
            onClick={() => handlePrev()} 
            className="flex items-center gap-2 text-sm tracking-widest uppercase hover:opacity-70 transition-opacity"
          >
            <ChevronLeft size={18} /> PREV
          </button>
          <div className="flex gap-2 hidden md:flex">
            {order.map((_, idx) => (
              <div 
                key={idx} 
                className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === 0 ? 'bg-black w-6' : 'bg-black/20'}`}
              />
            ))}
          </div>
          <button 
            onClick={() => handleNext()} 
            className="flex items-center gap-2 text-sm tracking-widest uppercase hover:opacity-70 transition-opacity"
          >
            NEXT <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Right Side - 40% */}
      <div className="w-full lg:w-[40%] flex flex-col justify-center py-8 lg:py-12 px-4 lg:px-8">
        <div className="text-xs uppercase tracking-widest text-black/40 mb-6">
          HOME &gt; KURTIS
        </div>

        <div className="flex items-center gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} size={16} className="fill-amber-400 text-amber-400" />
          ))}
          <span className="text-sm text-black/60 ml-2">(128 Reviews)</span>
        </div>

        <h2 className="text-4xl lg:text-5xl font-serif font-bold mb-4 leading-tight">
          {activeProduct?.name || 'Elegant Kurti'}
        </h2>

        <div className="flex items-center gap-4 mb-8">
          <span className="text-3xl font-bold">৳{activeProduct?.price?.toLocaleString() || '12,500'}</span>
          {activeProduct?.originalPrice && (
            <span className="text-xl text-black/40 line-through">
              ৳{activeProduct.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Size Selector */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold uppercase tracking-widest">Select Size</span>
            <button className="text-xs text-black/60 underline uppercase tracking-wide">Size Guide</button>
          </div>
          <div className="flex flex-wrap gap-3">
            {(activeProduct?.sizes || ['XS', 'S', 'M', 'L', 'XL']).map((size: string) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-5 py-2 rounded-full border-2 text-sm font-medium transition-all duration-300 ${
                  selectedSize === size 
                    ? 'border-black bg-black text-white' 
                    : 'border-black/10 hover:border-black/30'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Color Selector */}
        <div className="mb-10">
          <span className="block text-sm font-semibold uppercase tracking-widest mb-4">Select Color</span>
          <div className="flex gap-3">
            {(activeProduct?.colors || [{ name: 'Black', hex: '#111111' }, { name: 'Gold', hex: '#C9A96E' }]).map((color, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedColor(color.hex)}
                className={`w-8 h-8 rounded-full transition-all duration-300 ${
                  selectedColor === color.hex ? 'ring-2 ring-black ring-offset-2' : ''
                }`}
                style={{ backgroundColor: color.hex }}
                aria-label={`Color ${color.name}`}
              />
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button className="flex-grow bg-black text-white rounded-full py-4 text-sm tracking-widest uppercase hover:bg-black/90 transition-colors">
            Add to Cart
          </button>
          <button className="w-14 h-14 rounded-full border border-black/20 flex items-center justify-center hover:border-black transition-colors shrink-0 group">
            <Heart size={20} className="text-black/70 group-hover:text-black group-hover:fill-black/10 transition-all" />
          </button>
        </div>

        {/* Extra Info */}
        <div className="mt-8 pt-8 border-t border-black/10 text-sm text-black/60 space-y-2">
          <p>✓ Free shipping on orders over ৳15,000</p>
          <p>✓ 14-day hassle-free returns</p>
          <p>✓ 100% authentic designer wear</p>
        </div>
      </div>
    </section>
  );
}
