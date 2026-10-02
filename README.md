# Farha Tarannum Couture

An ultra-premium, modern luxury e-commerce landing experience built for **Farha Tarannum Couture** — an haute couture South Asian fashion label specializing in bespoke hand-embroidered kurtis, bridal ensembles, and luxury ethnic wear.

Inspired by cutting-edge monochrome design systems, editorial typography, and cinematic motion design.

---

## 🌟 Key Features

- **Preloader Splash Screen**: Cinematic intro with GSAP-orchestrated typography and expanding gold accent line with body scroll lock.
- **Floating Glassmorphic Navbar**: Dynamic backdrop blur, custom navigation links, interactive cart badge, and automatic scroll-state styling.
- **Hero Showcase**: High-impact editorial hero featuring background video cutout preview, mask-revealed split typography, floating metric pills, and stats bar.
- **Interactive Product Showcase**: GSAP Flip carousel staging current and upcoming queue items with real-time size, color swatch pickers, and dynamic price formatting.
- **Popular Picks**: Smooth horizontal snap carousel with custom directional controls and product cards.
- **New Arrivals**: Responsive 4-column catalog grid with promotional badges and hover interactions.
- **Bento Category Grid**: Asymmetric editorial layout with dark gradient overlays, title overlays, and hover zoom transitions.
- **Identity Showcase & Endless Marquee**: Dual-stream marquee gallery bounded by curved SVG geometry with an interactive spinning scroll badge.
- **Featured Product Inspection**: Detailed spotlight on signature couture pieces with multi-angle thumbnail gallery, order option switches, and specification options.
- **Editorial Testimonials**: Asymmetrical staggered layout with quotation marks and verified customer reviews.
- **Dark Luxury Footer**: Deep ink aesthetic featuring massive gradient typography, punch-hole card geometry, newsletter subscription, and quick links.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animation**: [GSAP (GreenSock)](https://greensock.com/gsap/) with [ScrollTrigger](https://greensock.com/scrolltrigger/)
- **Smooth Scroll**: [Lenis](https://lenis.darkroom.engineering/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: Inter (Sans-serif) & Playfair Display (Serif) via Next.js Font Optimization

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/Mahdib4/FARHATARANNUM.git

# Navigate to the project directory
cd FARHATARANNUM

# Install dependencies
npm install
```

### Running Locally

```bash
# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```
├── public/
│   ├── images/          # Curated product and model photography
│   └── videos/          # Editorial video assets (hero, mid, footer)
├── src/
│   ├── app/
│   │   ├── globals.css  # Global styles, Tailwind v4 @theme tokens
│   │   ├── layout.tsx   # Root layout with Google Fonts
│   │   └── page.tsx     # Page orchestrator mounting all sections
│   ├── components/      # Modular section components
│   │   ├── CategoryGrid.tsx
│   │   ├── FeaturedProduct.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── IdentityShowcase.tsx
│   │   ├── Navbar.tsx
│   │   ├── NewArrivals.tsx
│   │   ├── PopularPicks.tsx
│   │   ├── Preloader.tsx
│   │   ├── ProductShowcase.tsx
│   │   └── Testimonials.tsx
│   ├── data/
│   │   └── products.ts  # Structured catalog data
│   └── lib/
│       └── lenis.ts     # Lenis smooth scroll & GSAP ticker integration
├── package.json
└── tailwind.config.ts
```

---

## 📄 License

Private property of **Farha Tarannum Couture**. All rights reserved.
