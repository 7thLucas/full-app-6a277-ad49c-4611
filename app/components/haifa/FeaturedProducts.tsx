import { useState, useEffect } from "react";
import { Link } from "react-router";
import { ProductCard } from "./ProductCard";
import { ProductCardSkeleton } from "./Skeleton";

const TABS = [
  { key: "all", label: "Semua" },
  { key: "kerudung", label: "Kerudung" },
  { key: "gamis", label: "Gamis" },
  { key: "palestine", label: "Palestine" },
];

// Mock products for initial display
const MOCK_PRODUCTS = [
  {
    _id: "1",
    name: "Kerudung Voile Premium",
    slug: "kerudung-voile-premium",
    price: 185000,
    originalPrice: 225000,
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80"],
    badge: "best-seller",
    category: "kerudung",
    variants: [{ color: "Putih", colorHex: "#FFFFFF", size: "All Size", stock: 50 }],
  },
  {
    _id: "2",
    name: "Gamis Ceruti Polos",
    slug: "gamis-ceruti-polos",
    price: 320000,
    images: ["https://images.unsplash.com/photo-1529111290557-82f6d5c6cf85?w=400&q=80"],
    badge: "new",
    category: "gamis",
    variants: [
      { color: "Dusty Pink", colorHex: "#E8A98A", size: "M", stock: 20 },
      { color: "Dusty Pink", colorHex: "#E8A98A", size: "L", stock: 15 },
    ],
  },
  {
    _id: "3",
    name: "Kerudung Palestine Keffiyeh",
    slug: "kerudung-palestine-keffiyeh",
    price: 145000,
    images: ["https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&q=80"],
    badge: "best-seller",
    category: "palestine",
    variants: [{ color: "Merah Putih", colorHex: "#C0392B", size: "All Size", stock: 30 }],
  },
  {
    _id: "4",
    name: "Aksesoris Hijab Set Premium",
    slug: "aksesoris-hijab-set-premium",
    price: 95000,
    originalPrice: 120000,
    images: ["https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=400&q=80"],
    badge: "sale",
    category: "aksesoris",
    variants: [{ color: "Mixed", colorHex: "#B17457", size: "All Size", stock: 0 }],
  },
  {
    _id: "5",
    name: "Kerudung Satin Premium",
    slug: "kerudung-satin-premium",
    price: 165000,
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80"],
    badge: "new",
    category: "kerudung",
    variants: [{ color: "Navy", colorHex: "#1a237e", size: "All Size", stock: 40 }],
  },
  {
    _id: "6",
    name: "Gamis Palestine Series",
    slug: "gamis-palestine-series",
    price: 425000,
    images: ["https://images.unsplash.com/photo-1529111290557-82f6d5c6cf85?w=400&q=80"],
    badge: "best-seller",
    category: "palestine",
    variants: [
      { color: "Olive", colorHex: "#6b7c35", size: "M", stock: 10 },
      { color: "Olive", colorHex: "#6b7c35", size: "L", stock: 8 },
    ],
  },
  {
    _id: "7",
    name: "Inner Ninja Premium",
    slug: "inner-ninja-premium",
    price: 55000,
    images: ["https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=400&q=80"],
    category: "aksesoris",
    variants: [{ color: "Hitam", colorHex: "#000000", size: "All Size", stock: 100 }],
  },
  {
    _id: "8",
    name: "Gamis Wolfis Syar'i",
    slug: "gamis-wolfis-syari",
    price: 285000,
    originalPrice: 350000,
    images: ["https://images.unsplash.com/photo-1529111290557-82f6d5c6cf85?w=400&q=80"],
    badge: "sale",
    category: "gamis",
    variants: [
      { color: "Mocca", colorHex: "#8B6040", size: "M", stock: 12 },
      { color: "Mocca", colorHex: "#8B6040", size: "L", stock: 9 },
      { color: "Mocca", colorHex: "#8B6040", size: "XL", stock: 5 },
    ],
  },
];

export function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState(MOCK_PRODUCTS);

  useEffect(() => {
    // Simulate loading
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const filtered =
    activeTab === "all"
      ? products.slice(0, 8)
      : products.filter((p) => p.category === activeTab).slice(0, 8);

  return (
    <section className="py-16 md:py-24 bg-haifa-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 reveal">
          <div>
            <span className="font-body text-xs uppercase tracking-widest text-haifa-clay">Produk Kami</span>
            <h2 className="font-display text-3xl md:text-4xl mt-1 text-haifa-charcoal">
              Pilihan <em className="text-haifa-clay italic">Terfavorit</em>
            </h2>
          </div>
          <Link
            to="/shop"
            className="font-body text-sm text-haifa-clay hover:text-haifa-peach-dark transition-colors flex items-center gap-1 shrink-0"
          >
            Lihat Semua &rarr;
          </Link>
        </div>

        {/* Tab filter */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 reveal">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-full font-body text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                activeTab === tab.key
                  ? "bg-haifa-clay text-white shadow-sm"
                  : "bg-white text-haifa-charcoal hover:bg-haifa-cream border border-border"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
            : filtered.map((product, i) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  style={{ transitionDelay: `${i * 70}ms` }}
                />
              ))}
        </div>
      </div>
    </section>
  );
}
