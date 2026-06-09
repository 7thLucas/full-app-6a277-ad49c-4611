# Haifa Official Store — Design System

## Brand Colors
- Primary: #B17457 (Clay Brown)
- Background: #FBF7F0 (Off White)
- Dark Text: #4C4947 (Charcoal Grey)
- Accent Warm: #E8A98A (Peach)
- Accent Dark: #C96D3F (Peach Dark)
- Surface Cream: #F7EFD8

## Typography
- Headings / Italic Accent: DM Serif Display (Google Fonts)
- Body: Poppins 300 / 400 / 500 (Google Fonts)
- Arabic Text only: Scheherazade New (Google Fonts)

## Decorative Pattern
Keffiyeh pattern using CSS repeating-linear-gradient with Palestinian red rgba(192,57,43,0.1).
Use ONLY for: borders, section dividers, Palestine section backgrounds.
NEVER use as a full-page background.

## Layout & Navigation
- Sticky top navbar: backdrop-filter blur(24px) on scroll
- Logo: "haifa" in geometric Kufi calligraphy SVG style
- Desktop menu: Beranda / Koleksi / Produk / Palestine Series / Tentang Kami
- Right icons: Search, Wishlist (badge), Cart (badge)
- Mobile: hamburger → slide-in drawer from left
- Mobile bottom nav: 5 tabs (Beranda, Koleksi, Cari, Wishlist, Keranjang)
- Custom cursor (desktop only): dot + ring, ring expands on hover, smooth lag

## Homepage Components

### Hero Section
- Full viewport, dark overlay gradient
- Left-bottom text layout:
  - Eyebrow: "New Collection 2025"
  - Large heading with italic peach accent words
  - Arabic subtitle (Scheherazade New)
  - Brand description
  - 2 CTAs: filled "Belanja Sekarang" + ghost "Lihat Koleksi"
- Right side: floating 3D product card with parallax rotateY on mouse move
- 3 animated floating chips
- Vertical scroll indicator

### Marquee Bar
- Charcoal background, uppercase text
- "Premium Hijab · Busana Muslimah · Haifa Collection · Palestine Series · Free Ongkir se-Indonesia · 100% Bahan Premium"

### Collections Grid
- 4-card grid
- Photo background, dark gradient overlay
- DM Serif italic name, product count, arrow icon
- Hover: scale + shadow

### Featured Products
- Tab filter: Semua / Kerudung / Gamis / Palestine
- 4-column desktop grid
- Cards: badge (Best Seller/New/Sold Out), price with strike-through, "+ Keranjang" / "Notify Me", heart wishlist
- Stagger scroll reveal 70ms delay

### Palestine × Haifa Section
- Split layout: text left, photo right
- Keffiyeh pattern subtle background
- Arabic text: "فلسطين في قلبنا" in Scheherazade New
- 4 checkpoints listed
- CTA button

### Stats Section
- 3 large numbers on cream background with subtle pattern
- 12K+ Pelanggan Setia / 200+ Pilihan Produk / 100% Bahan Premium

### Newsletter
- Email input + subscribe button
- Promo message for 15% discount

## Component Standards

### Product Card
- Photo with hover zoom
- Badge overlay (Best Seller / New / Sold Out)
- Price with optional strike-through for discount
- "+ Keranjang" primary button
- Heart wishlist icon top-right
- Subtle shadow, rounded corners

### Buttons
- Primary: filled Clay Brown (#B17457) bg, white text, rounded-full
- Ghost: border Clay Brown, Clay Brown text, rounded-full
- CTA hover: Accent Dark (#C96D3F)

### Admin UI
- Sidebar navigation, clean white/light gray surfaces
- Charts: Recharts with brand color palette
- Tables: striped rows, action buttons per row
- Form inputs: clean, labeled, validation states

## Animations & UX
- Scroll reveal: stagger 70ms, translateY(20px) → 0, opacity 0 → 1
- Hover transitions: 200ms ease
- Page transitions: subtle fade
- Skeleton loaders on all data fetches (not spinners)
- Toast notifications: add to cart, delete, save
- Custom cursor on desktop: dot 6px + ring 24px, ring lags 80ms, expands 1.5x on hover
- Floating 3D card: rotateY(-5deg) to rotateY(5deg) on mouse X movement
- Marquee: continuous scroll, pause on hover

## Responsive
- Mobile-first
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Mobile bottom nav replaces desktop top nav icons on mobile
- Sidebar filter → bottom sheet on mobile (shop page)
- Product photo gallery → swipe on mobile, thumbnails on desktop

## Accessibility
- Color contrast WCAG AA minimum
- Focus rings visible
- Alt text on all images
- Aria labels on icon buttons
