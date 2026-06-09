import { useState, useEffect } from "react";
import type { MetaFunction } from "react-router";
import { useSearchParams } from "react-router";
import { Filter, X, SlidersHorizontal, ChevronDown } from "lucide-react";
import { StorefrontLayout } from "~/components/haifa/StorefrontLayout";
import { ProductCard } from "~/components/haifa/ProductCard";
import { ProductCardSkeleton } from "~/components/haifa/Skeleton";

export const meta: MetaFunction = () => [
  { title: "Semua Produk — Haifa Official Store" },
  { name: "description", content: "Temukan koleksi busana muslimah premium pilihan Haifa." },
];

const CATEGORIES = [
  { key: "", label: "Semua Kategori" },
  { key: "kerudung", label: "Kerudung" },
  { key: "gamis", label: "Gamis" },
  { key: "palestine", label: "Palestine Series" },
  { key: "aksesoris", label: "Aksesoris Hijab" },
];

const SORT_OPTIONS = [
  { key: "createdAt", label: "Terbaru" },
  { key: "soldCount", label: "Terlaris" },
  { key: "price-asc", label: "Harga Terendah" },
  { key: "price-desc", label: "Harga Tertinggi" },
];

// Mock products — in production, these load from /api/store/products
const ALL_MOCK_PRODUCTS = [
  { _id: "1", name: "Kerudung Voile Premium", slug: "kerudung-voile-premium", price: 185000, originalPrice: 225000, images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80"], badge: "best-seller", category: "kerudung", variants: [{ color: "Putih", colorHex: "#fff", size: "All Size", stock: 50 }] },
  { _id: "2", name: "Gamis Ceruti Polos", slug: "gamis-ceruti-polos", price: 320000, images: ["https://images.unsplash.com/photo-1529111290557-82f6d5c6cf85?w=400&q=80"], badge: "new", category: "gamis", variants: [{ color: "Dusty Pink", colorHex: "#E8A98A", size: "M", stock: 20 }] },
  { _id: "3", name: "Kerudung Palestine Keffiyeh", slug: "kerudung-palestine-keffiyeh", price: 145000, images: ["https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&q=80"], badge: "best-seller", category: "palestine", variants: [{ color: "Merah Putih", colorHex: "#C0392B", size: "All Size", stock: 30 }] },
  { _id: "4", name: "Aksesoris Hijab Set Premium", slug: "aksesoris-hijab-set-premium", price: 95000, originalPrice: 120000, images: ["https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=400&q=80"], badge: "sale", category: "aksesoris", variants: [{ color: "Mixed", colorHex: "#B17457", size: "All Size", stock: 0 }] },
  { _id: "5", name: "Kerudung Satin Premium", slug: "kerudung-satin-premium", price: 165000, images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80"], badge: "new", category: "kerudung", variants: [{ color: "Navy", colorHex: "#1a237e", size: "All Size", stock: 40 }] },
  { _id: "6", name: "Gamis Palestine Series", slug: "gamis-palestine-series", price: 425000, images: ["https://images.unsplash.com/photo-1529111290557-82f6d5c6cf85?w=400&q=80"], badge: "best-seller", category: "palestine", variants: [{ color: "Olive", colorHex: "#6b7c35", size: "M", stock: 10 }] },
  { _id: "7", name: "Inner Ninja Premium", slug: "inner-ninja-premium", price: 55000, images: ["https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=400&q=80"], category: "aksesoris", variants: [{ color: "Hitam", colorHex: "#000", size: "All Size", stock: 100 }] },
  { _id: "8", name: "Gamis Wolfis Syar'i", slug: "gamis-wolfis-syari", price: 285000, originalPrice: 350000, images: ["https://images.unsplash.com/photo-1529111290557-82f6d5c6cf85?w=400&q=80"], badge: "sale", category: "gamis", variants: [{ color: "Mocca", colorHex: "#8B6040", size: "M", stock: 12 }] },
  { _id: "9", name: "Kerudung Instant Jersey", slug: "kerudung-instant-jersey", price: 79000, images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80"], category: "kerudung", variants: [{ color: "Abu", colorHex: "#888", size: "All Size", stock: 80 }] },
  { _id: "10", name: "Gamis Ceruti Bordir", slug: "gamis-ceruti-bordir", price: 385000, originalPrice: 450000, images: ["https://images.unsplash.com/photo-1529111290557-82f6d5c6cf85?w=400&q=80"], badge: "sale", category: "gamis", variants: [{ color: "Cream", colorHex: "#F7EFD8", size: "L", stock: 8 }] },
  { _id: "11", name: "Scarf Palestine Premium", slug: "scarf-palestine-premium", price: 195000, images: ["https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&q=80"], badge: "new", category: "palestine", variants: [{ color: "Keffiyeh Red", colorHex: "#C0392B", size: "All Size", stock: 25 }] },
  { _id: "12", name: "Bando Hijab Bunga", slug: "bando-hijab-bunga", price: 45000, images: ["https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=400&q=80"], category: "aksesoris", variants: [{ color: "Mix Color", colorHex: "#E8A98A", size: "All Size", stock: 60 }] },
];

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);

  const categoryParam = searchParams.get("category") || "";
  const sortParam = searchParams.get("sort") || "createdAt";
  const searchParam = searchParams.get("search") || "";
  const minPrice = parseInt(searchParams.get("minPrice") || "0");
  const maxPrice = parseInt(searchParams.get("maxPrice") || "1000000");

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, [categoryParam]);

  const filtered = ALL_MOCK_PRODUCTS
    .filter((p) => {
      if (categoryParam && p.category !== categoryParam) return false;
      if (searchParam && !p.name.toLowerCase().includes(searchParam.toLowerCase())) return false;
      if (p.price < minPrice || p.price > maxPrice) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortParam === "price-asc") return a.price - b.price;
      if (sortParam === "price-desc") return b.price - a.price;
      if (sortParam === "soldCount") return parseInt(b._id) - parseInt(a._id);
      return parseInt(b._id) - parseInt(a._id);
    });

  const updateFilter = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next);
  };

  return (
    <StorefrontLayout>
      {/* Header */}
      <div className="pt-16 bg-haifa-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="font-display text-3xl md:text-4xl text-haifa-charcoal">
            {categoryParam
              ? CATEGORIES.find((c) => c.key === categoryParam)?.label || "Produk"
              : "Semua Produk"}
          </h1>
          <p className="font-body text-sm text-muted-foreground mt-1">
            {filtered.length} produk ditemukan
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6 gap-4">
          {/* Filter chips (desktop) */}
          <div className="hidden md:flex items-center gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => updateFilter("category", cat.key)}
                className={`px-4 py-1.5 rounded-full font-body text-xs font-medium transition-all ${
                  categoryParam === cat.key
                    ? "bg-haifa-clay text-white"
                    : "bg-white border border-border text-haifa-charcoal hover:border-haifa-clay"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Mobile filter button */}
          <button
            className="md:hidden flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-full font-body text-sm"
            onClick={() => setFilterOpen(true)}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filter
          </button>

          {/* Sort */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="font-body text-xs text-muted-foreground hidden sm:block">Urutkan:</span>
            <select
              value={sortParam}
              onChange={(e) => updateFilter("sort", e.target.value)}
              className="font-body text-sm border border-border rounded-full px-3 py-1.5 bg-white outline-none cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.key} value={opt.key}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search bar */}
        {searchParam && (
          <div className="mb-4 flex items-center gap-2">
            <span className="font-body text-sm text-muted-foreground">
              Hasil untuk: <strong className="text-haifa-charcoal">"{searchParam}"</strong>
            </span>
            <button
              onClick={() => updateFilter("search", "")}
              className="text-muted-foreground hover:text-haifa-clay transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Products grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-display italic text-2xl text-muted-foreground">Produk tidak ditemukan</p>
            <p className="font-body text-sm text-muted-foreground mt-2">
              Coba ubah filter atau kata kunci pencarian
            </p>
            <button
              onClick={() => setSearchParams(new URLSearchParams())}
              className="mt-4 btn-primary font-body text-sm"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filtered.map((product, i) => (
              <ProductCard
                key={product._id}
                product={product}
                style={{ transitionDelay: `${i * 60}ms` }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Mobile Filter Drawer */}
      {filterOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-50" onClick={() => setFilterOpen(false)} />
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 p-5 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-body font-medium text-haifa-charcoal">Filter</h3>
              <button onClick={() => setFilterOpen(false)}>
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            <div className="space-y-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => {
                    updateFilter("category", cat.key);
                    setFilterOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl font-body text-sm transition-all ${
                    categoryParam === cat.key
                      ? "bg-haifa-cream text-haifa-clay font-medium"
                      : "hover:bg-haifa-cream/50"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </StorefrontLayout>
  );
}
