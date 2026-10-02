import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#111111',
        offwhite: '#F5F5F3',
        gold: '#C9A96E',
      },
      boxShadow: {
        neu: '0 1px 2px rgba(17,17,17,0.04), 0 12px 32px -8px rgba(17,17,17,0.10)',
        'neu-lg': '0 2px 4px rgba(17,17,17,0.05), 0 24px 48px -12px rgba(17,17,17,0.14)',
        'neu-inset': 'inset 0 1px 2px rgba(17,17,17,0.06)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      letterSpacing: {
        tighter: '-0.03em',
        tightest: '-0.05em',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        'spin-slow': 'spin-slow 14s linear infinite',
      },
    },
  },
  plugins: [],
};
export default config;
