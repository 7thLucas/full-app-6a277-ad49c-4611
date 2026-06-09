# Haifa Official Store — Product Overview

## What It Is

Haifa Official Store is a full-stack e-commerce website for premium Indonesian Muslim fashion (busana muslimah). It consists of two parts: a public-facing **Storefront** and a protected **Admin Panel** (route `/admin`), built on React + Tailwind CSS with Supabase as the backend.

## Brand Identity

- **Name:** Haifa Official Store
- **Tagline:** Anggun dalam Iman, Indah dalam Hijab
- **Sub-tagline (Arabic):** الحجاب نور، والنور جمال — "The hijab is light, and light is beauty"
- **Mission:** Premium, values-driven modest fashion rooted in Islamic principles and solidarity with Palestine — with 10% of every transaction donated to Palestinian humanitarian causes.
- **Tone:** Calm, elegant, purposeful. Editorial and heritage-informed. Never loud or discount-heavy.

## Target Users

| Persona | Description |
|---|---|
| **Shopper** | Muslim women in Indonesia seeking premium, meaningful modest fashion online |
| **Store Admin** | The Haifa team managing products, orders, content, and promotions via the admin panel |

## Product Catalog

Four collections:
1. **Kerudung Premium** — 48 products
2. **Gamis** — 32 products
3. **Palestine Series** — 16 products (exclusive keffiyeh-motif designs)
4. **Aksesoris Hijab** — 24 products

## Storefront Features

- **Hero landing page** — full-viewport editorial hero, floating animated chips (New Arrivals / Palestine Series / Free Ongkir), scroll indicator, brand story sections
- **Marquee bar** — infinite-loop scrolling ticker: "Premium Hijab · Busana Muslimah · Haifa Collection · Palestine Series · Free Ongkir se-Indonesia · 100% Bahan Premium"
- **Collection grid** — 4 curated category cards (Kerudung Premium, Gamis, Palestine Series, Aksesoris Hijab)
- **Product catalog** — filter by category / price / size / color / in-stock only; sort newest / best-selling / price; infinite scroll or pagination
- **Product detail** — photo gallery (swipe mobile, thumbnails desktop), color + size variant swatches, stock indicator, "Tambah ke Keranjang" + "Beli Sekarang" CTAs, description tabs (Deskripsi / Bahan & Perawatan / Ukuran), WhatsApp order button, size guide modal, recently viewed row
- **Cart & checkout** — multi-step: item list with qty controls → address form (name, full address, city, postal code, phone) → courier selection (JNE, J&T, SiCepat with estimated costs) → order summary + voucher/promo code → payment method (Transfer Bank / QRIS / COD) → confirmation
- **Flash sale** — real-time countdown timer banner on homepage when a flash sale is active; strikethrough price + flash price
- **Wishlist** — localStorage (no login required); Supabase sync when logged in; badge count in navbar + bottom nav
- **Product reviews** — star rating, text comment, photo upload by verified buyers; displayed on product detail page
- **Stock notification** — "Beritahu Saya" CTA for sold-out products; email triggered on restock
- **Order tracking** — public page, no login required; input order number → real-time pipeline status
- **Affiliate / referral** — unique referral links per customer; cashback or discount on successful conversion
- **Blog** — article list + detail pages; categories: Style Guide / Tips Hijab / Palestine / Brand Story
- **Lookbook / Gallery** — editorial-style photo grid
- **About Us** — brand story, vision/mission, core values
- **Contact** — form + WhatsApp / email / address
- **SEO** — meta title / description / OG images per page, auto-generated sitemap, SEO-friendly product URLs
- **WhatsApp Business integration** — "Order via WhatsApp" button with auto-filled product name, variant, and price

## Palestine × Haifa Section (Homepage)

Dedicated homepage section with keffiyeh pattern background accent:
- Heading: "Berpakaian dengan Makna & Solidaritas"
- Arabic: فلسطين في قلبنا
- Four value points with checkmarks:
  - 10% donasi untuk kemanusiaan Palestina
  - Motif keffiyeh eksklusif Haifa
  - Material premium ramah lingkungan
  - Diproduksi pengrajin lokal
- CTA: "Lihat Koleksi Palestine"

## Admin Panel Features (`/admin`)

Protected by Supabase Auth. Redirects to `/admin/login` if unauthenticated; to `/admin/dashboard` if authenticated.

- **Dashboard** — 30-day revenue line chart (Recharts), order status breakdown (Baru / Diproses / Dikirim / Selesai), active vs. sold-out products, visitor stats, 5 latest orders table, 5 top products with thumbnails
- **Product management** — CRUD; drag-and-drop multi-photo upload (reorderable); variant management (color + size + per-variant stock); badge system (Best Seller / New / Limited / Sold Out); rich text description (Quill.js or TipTap); Draft / Active status; bulk actions
- **Order management** — status pipeline: Baru → Dikonfirmasi → Dikemas → Dikirim → Selesai → Dibatalkan; shipping tracking number entry; internal notes
- **Blog management** — rich text editor, SEO meta fields, thumbnail upload, category tagging, publish / draft workflow, slug auto-generation
- **Promotions & vouchers** — voucher codes (e.g. HAIFA17), automatic discounts, flash sales with countdown timer, free-shipping thresholds, buy-X-get-Y, per-user limits, date ranges, product-specific targeting; Flash Sale Manager: set product, flash price, duration, dedicated stock
- **Homepage content editor** — drag-and-drop section reordering; hero text / image editing; promo banner management; per-section on/off toggle
- **Store settings** — name / tagline / logo / favicon; WhatsApp / email / Instagram / TikTok; shipping (RajaOngkir integration or flat rate); payment method toggles; bank account details for transfer; Palestine donation percentage per transaction; WhatsApp Business number

## Design System

| Token | Value |
|---|---|
| Primary | `#B17457` Clay Brown |
| Background | `#FBF7F0` Off White |
| Dark text | `#4C4947` Charcoal Grey |
| Accent warm | `#E8A98A` Peach |
| Accent dark | `#C96D3F` Peach Dark |
| Surface | `#F7EFD8` Surface Cream |

- **Heading font:** DM Serif Display (italic variant for accent words)
- **Body font:** Poppins 300 / 400 / 500
- **Arabic font:** Scheherazade New (scoped to Arabic text only)
- **Decorative motif:** Keffiyeh pattern — CSS `repeating-linear-gradient` with Palestine red `rgba(192,57,43,0.1)` on borders, dividers, accent backgrounds. Never full-bleed.
- **Custom cursor (desktop):** small dot + lagging ring; ring enlarges on interactive elements
- **Navbar scroll effect:** `backdrop-filter: blur(24px)` on scroll
- **Mobile nav:** sticky bottom 5-tab bar; hamburger → left slide-in drawer

## Social Proof & Stats

- **12,000+** loyal customers (pelanggan setia)
- **200+** product choices
- **100%** premium materials
- **10%** of every transaction donated to Palestinian humanitarian causes

## Tech Stack

- **Framework:** Remix (React Router v7) + Express custom server
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Backend / DB:** Express + MongoDB (Mongoose & Typegoose)
- **Auth:** JWT-based RBAC via the `authentication` module
- **Charts:** Recharts
- **State management:** React Hooks + local Context

## Strategic Principles

1. Mobile-first, fully responsive
2. Skeleton loaders on all async data fetches — no bare spinners
3. Toast notifications for every user action (add to cart, save, delete, error)
4. Scroll reveal animations with 70 ms stagger between cards; hover transitions; page transitions
5. Keffiyeh CSS pattern used decoratively only — never as a full-bleed background
6. Scheherazade New scoped strictly to Arabic text nodes
7. Admin: `/admin` → `/admin/login` if unauthenticated; → `/admin/dashboard` if authenticated
