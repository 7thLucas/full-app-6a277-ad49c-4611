import { useState, useEffect } from "react";
import type { MetaFunction } from "react-router";
import { useParams, Link } from "react-router";
import {
  ShoppingBag,
  MessageCircle,
  Heart,
  ChevronLeft,
  ChevronRight,
  Star,
  Ruler,
  Package,
  X,
} from "lucide-react";
import { StorefrontLayout } from "~/components/haifa/StorefrontLayout";
import { ProductCard } from "~/components/haifa/ProductCard";
import { Skeleton } from "~/components/haifa/Skeleton";
import { useCart } from "~/components/haifa/CartContext";
import { useWishlist } from "~/components/haifa/WishlistContext";
import { useToast } from "~/components/haifa/Toast";
import { useConfigurables } from "~/modules/configurables";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const product = (data as any)?.product;
  return [
    { title: product ? `${product.name} — Haifa Official Store` : "Produk — Haifa Official Store" },
    { name: "description", content: product?.description?.slice(0, 160) || "" },
  ];
};

export async function loader({ params }: { params: { slug: string } }) {
  return { slug: params.slug };
}

// Mock single product data
const MOCK_PRODUCT = {
  _id: "1",
  name: "Kerudung Voile Premium Palestine Series",
  slug: "kerudung-voile-premium",
  price: 185000,
  originalPrice: 225000,
  description: "Kerudung voile premium dengan bahan breathable yang nyaman dipakai sepanjang hari. Material pilihan yang lembut di kulit, tidak mudah kusut, dan tetap rapi seharian. Tersedia dalam berbagai warna pilihan.",
  materialCare: "100% Voile Premium • Cuci tangan dengan air dingin • Jangan diperas • Setrika dengan suhu rendah",
  images: [
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=600&q=80",
    "https://images.unsplash.com/photo-1529111290557-82f6d5c6cf85?w=600&q=80",
  ],
  badge: "best-seller",
  category: "kerudung",
  isPalestineSeries: true,
  variants: [
    { color: "Putih", colorHex: "#FFFFFF", size: "All Size", stock: 50 },
    { color: "Krem", colorHex: "#F7EFD8", size: "All Size", stock: 30 },
    { color: "Navy", colorHex: "#1a237e", size: "All Size", stock: 20 },
    { color: "Mocca", colorHex: "#8B6040", size: "All Size", stock: 15 },
    { color: "Hitam", colorHex: "#000000", size: "All Size", stock: 40 },
  ],
  reviews: [
    { reviewerName: "Siti Aisyah", rating: 5, comment: "Bahannya lembut banget! Suka banget sama kualitasnya.", createdAt: new Date("2025-01-15") },
    { reviewerName: "Fatimah Zahra", rating: 5, comment: "Sesuai ekspektasi, pengirimannya cepat juga.", createdAt: new Date("2025-01-10") },
    { reviewerName: "Nur Hidayah", rating: 4, comment: "Bagus, warna sesuai foto. Recommended!", createdAt: new Date("2024-12-28") },
  ],
};

const RELATED_PRODUCTS = [
  { _id: "3", name: "Kerudung Palestine Keffiyeh", slug: "kerudung-palestine-keffiyeh", price: 145000, images: ["https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&q=80"], badge: "best-seller", category: "kerudung", variants: [{ color: "Merah", colorHex: "#C0392B", size: "All Size", stock: 30 }] },
  { _id: "5", name: "Kerudung Satin Premium", slug: "kerudung-satin-premium", price: 165000, images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80"], badge: "new", category: "kerudung", variants: [{ color: "Navy", colorHex: "#1a237e", size: "All Size", stock: 40 }] },
  { _id: "9", name: "Kerudung Instant Jersey", slug: "kerudung-instant-jersey", price: 79000, images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80"], category: "kerudung", variants: [{ color: "Abu", colorHex: "#888", size: "All Size", stock: 80 }] },
  { _id: "11", name: "Scarf Palestine Premium", slug: "scarf-palestine-premium", price: 195000, images: ["https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&q=80"], badge: "new", category: "palestine", variants: [{ color: "Keffiyeh", colorHex: "#C0392B", size: "All Size", stock: 25 }] },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
        />
      ))}
    </div>
  );
}

const SIZE_GUIDE = [
  ["Ukuran", "Panjang", "Lebar"],
  ["All Size", "115 cm", "115 cm"],
  ["XL", "120 cm", "120 cm"],
];

export default function ProductPage() {
  const { slug } = useParams();
  const { addItem } = useCart();
  const { toggle, isInWishlist } = useWishlist();
  const { showToast } = useToast();
  const { config } = useConfigurables();

  const [product] = useState(MOCK_PRODUCT);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.variants[0]?.color || "");
  const [selectedSize, setSelectedSize] = useState(product.variants[0]?.size || "");
  const [activeTab, setActiveTab] = useState<"desc" | "material" | "size">("desc");
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const inWishlist = isInWishlist(product._id);

  const selectedVariant = product.variants.find(
    (v) => v.color === selectedColor && v.size === selectedSize
  );
  const isOutOfStock = (selectedVariant?.stock || 0) === 0;

  const avgRating =
    product.reviews.reduce((s, r) => s + r.rating, 0) / (product.reviews.length || 1);

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addItem({
      productId: product._id,
      name: product.name,
      image: product.images[0],
      price: product.price,
      originalPrice: product.originalPrice,
      variant: `${selectedColor} / ${selectedSize}`,
      color: selectedColor,
      size: selectedSize,
      quantity,
      slug: product.slug,
    });
    showToast(`${product.name} ditambahkan ke keranjang!`);
  };

  const handleWhatsApp = () => {
    const waNumber = config?.whatsappNumber || "6281234567890";
    const msg = encodeURIComponent(
      `Halo Haifa Official! Saya ingin memesan:\n\nProduk: ${product.name}\nVarian: ${selectedColor} / ${selectedSize}\nHarga: Rp ${product.price.toLocaleString("id-ID")}\nJumlah: ${quantity}\n\nMohon konfirmasinya ya, terima kasih!`
    );
    window.open(`https://wa.me/${waNumber}?text=${msg}`, "_blank");
  };

  const handleBuyNow = () => {
    handleAddToCart();
    window.location.href = "/cart";
  };

  return (
    <StorefrontLayout>
      <div className="pt-16">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <nav className="flex items-center gap-2 text-xs font-body text-muted-foreground">
            <Link to="/" className="hover:text-haifa-clay transition-colors">Beranda</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-haifa-clay transition-colors">Produk</Link>
            <span>/</span>
            <span className="text-haifa-charcoal">{product.name}</span>
          </nav>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Left: Gallery */}
            <div>
              {/* Main image */}
              <div className="relative rounded-3xl overflow-hidden aspect-square bg-haifa-cream mb-3">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.badge === "best-seller" && (
                  <span className="absolute top-4 left-4 bg-haifa-clay text-white text-xs font-body px-3 py-1 rounded-full">
                    Best Seller
                  </span>
                )}
                {product.isPalestineSeries && (
                  <span className="absolute top-4 right-4 bg-red-600/90 text-white text-xs font-body px-3 py-1 rounded-full">
                    Palestine Series
                  </span>
                )}
                {/* Arrow nav */}
                <button
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow"
                  onClick={() => setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length)}
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow"
                  onClick={() => setSelectedImage((prev) => (prev + 1) % product.images.length)}
                  aria-label="Next"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 overflow-x-auto pb-1">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`gallery-thumb w-16 h-16 rounded-xl overflow-hidden shrink-0 ${i === selectedImage ? "active" : ""}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Product Info */}
            <div>
              <p className="font-body text-xs text-muted-foreground uppercase tracking-wide mb-2">
                {product.category}
              </p>
              <h1 className="font-display text-2xl md:text-3xl text-haifa-charcoal leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <StarRating rating={Math.round(avgRating)} />
                <span className="font-body text-sm text-muted-foreground">
                  {avgRating.toFixed(1)} ({product.reviews.length} ulasan)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mt-4">
                <span className="font-display text-3xl text-haifa-clay">
                  Rp {product.price.toLocaleString("id-ID")}
                </span>
                {product.originalPrice && (
                  <span className="font-body text-sm text-muted-foreground line-through">
                    Rp {product.originalPrice.toLocaleString("id-ID")}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="bg-red-100 text-red-600 text-xs font-body px-2 py-0.5 rounded-full">
                    Hemat {Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </span>
                )}
              </div>

              <div className="h-px bg-border my-5" />

              {/* Color selection */}
              <div className="mb-5">
                <p className="font-body text-sm font-medium text-haifa-charcoal mb-2">
                  Warna: <span className="text-haifa-clay">{selectedColor}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {[...new Map(product.variants.map((v) => [v.color, v])).values()].map((v) => (
                    <button
                      key={v.color}
                      onClick={() => setSelectedColor(v.color)}
                      className={`relative w-8 h-8 rounded-full border-2 transition-all ${
                        selectedColor === v.color
                          ? "border-haifa-clay scale-110"
                          : "border-transparent hover:border-border"
                      }`}
                      style={{ backgroundColor: v.colorHex }}
                      title={v.color}
                      aria-label={v.color}
                    >
                      {v.stock === 0 && (
                        <span className="absolute inset-0 rounded-full flex items-center justify-center">
                          <X className="w-3 h-3 text-gray-500" />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size selection */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-body text-sm font-medium text-haifa-charcoal">
                    Ukuran: <span className="text-haifa-clay">{selectedSize}</span>
                  </p>
                  <button
                    onClick={() => setSizeGuideOpen(true)}
                    className="flex items-center gap-1 font-body text-xs text-haifa-clay hover:text-haifa-peach-dark transition-colors"
                  >
                    <Ruler className="w-3 h-3" />
                    Panduan Ukuran
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[...new Set(product.variants.map((v) => v.size))].map((size) => {
                    const variant = product.variants.find((v) => v.color === selectedColor && v.size === size);
                    const outOfStock = (variant?.stock || 0) === 0;
                    return (
                      <button
                        key={size}
                        onClick={() => !outOfStock && setSelectedSize(size)}
                        disabled={outOfStock}
                        className={`px-4 py-2 rounded-xl border font-body text-sm transition-all ${
                          selectedSize === size
                            ? "border-haifa-clay bg-haifa-cream text-haifa-clay font-medium"
                            : outOfStock
                            ? "border-border text-muted-foreground opacity-50 cursor-not-allowed line-through"
                            : "border-border hover:border-haifa-clay"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-3 mb-6">
                <p className="font-body text-sm font-medium text-haifa-charcoal">Jumlah:</p>
                <div className="flex items-center border border-border rounded-full overflow-hidden">
                  <button
                    className="w-9 h-9 flex items-center justify-center hover:bg-haifa-cream transition-colors font-body text-lg"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  >
                    −
                  </button>
                  <span className="w-10 text-center font-body text-sm">{quantity}</span>
                  <button
                    className="w-9 h-9 flex items-center justify-center hover:bg-haifa-cream transition-colors font-body text-lg"
                    onClick={() => setQuantity((q) => Math.min(selectedVariant?.stock || 1, q + 1))}
                  >
                    +
                  </button>
                </div>
                {selectedVariant && (
                  <span className="font-body text-xs text-muted-foreground">
                    Stok: {selectedVariant.stock} tersisa
                  </span>
                )}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className="flex-1 bg-haifa-clay text-white rounded-full py-3 font-body text-sm font-medium flex items-center justify-center gap-2 hover:bg-haifa-peach-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingBag className="w-4 h-4" />
                  {isOutOfStock ? "Stok Habis" : "Tambah ke Keranjang"}
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={isOutOfStock}
                  className="flex-1 border-2 border-haifa-clay text-haifa-clay rounded-full py-3 font-body text-sm font-medium flex items-center justify-center gap-2 hover:bg-haifa-clay hover:text-white transition-colors disabled:opacity-50"
                >
                  Beli Sekarang
                </button>
              </div>

              <button
                onClick={handleWhatsApp}
                className="w-full bg-green-500 text-white rounded-full py-3 font-body text-sm font-medium flex items-center justify-center gap-2 hover:bg-green-600 transition-colors mb-4"
              >
                <MessageCircle className="w-4 h-4" />
                Order via WhatsApp
              </button>

              <button
                onClick={() => {
                  toggle({ productId: product._id, name: product.name, image: product.images[0], price: product.price, slug: product.slug });
                  showToast(inWishlist ? "Dihapus dari wishlist" : "Ditambahkan ke wishlist", "info");
                }}
                className="flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-haifa-clay transition-colors"
              >
                <Heart className={`w-4 h-4 ${inWishlist ? "fill-haifa-clay text-haifa-clay" : ""}`} />
                {inWishlist ? "Hapus dari Wishlist" : "Tambah ke Wishlist"}
              </button>

              {/* Palestine donation note */}
              {product.isPalestineSeries && (
                <div className="mt-5 bg-red-50 border border-red-100 rounded-2xl p-4 flex items-start gap-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                    <Heart className="w-4 h-4 text-red-600 fill-current" />
                  </div>
                  <div>
                    <p className="font-body text-sm font-medium text-red-700">Palestine Series</p>
                    <p className="font-body text-xs text-red-600/80 mt-0.5">
                      {config?.palestineDonationPercent || 10}% dari pembelian ini akan didonasikan untuk kemanusiaan Palestina.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Description tabs */}
          <div className="mt-12">
            <div className="flex border-b border-border gap-6">
              {(["desc", "material", "size"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 font-body text-sm font-medium transition-colors border-b-2 ${
                    activeTab === tab
                      ? "border-haifa-clay text-haifa-clay"
                      : "border-transparent text-muted-foreground hover:text-haifa-charcoal"
                  }`}
                >
                  {tab === "desc" ? "Deskripsi" : tab === "material" ? "Bahan & Perawatan" : "Ukuran"}
                </button>
              ))}
            </div>
            <div className="py-6 font-body text-sm text-haifa-charcoal leading-relaxed max-w-2xl">
              {activeTab === "desc" && <p>{product.description}</p>}
              {activeTab === "material" && <p>{product.materialCare}</p>}
              {activeTab === "size" && (
                <div>
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-haifa-cream">
                        {SIZE_GUIDE[0].map((h) => (
                          <th key={h} className="px-4 py-2 text-left font-medium">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {SIZE_GUIDE.slice(1).map((row, i) => (
                        <tr key={i} className="border-b border-border">
                          {row.map((cell) => (
                            <td key={cell} className="px-4 py-2">{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Reviews */}
          <div className="mt-10">
            <h3 className="font-display text-2xl text-haifa-charcoal mb-6">
              Ulasan Pelanggan
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {product.reviews.map((review, i) => (
                <div key={i} className="bg-white rounded-2xl p-4 border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-body text-sm font-medium text-haifa-charcoal">
                      {review.reviewerName}
                    </p>
                    <p className="font-body text-xs text-muted-foreground">
                      {new Date(review.createdAt).toLocaleDateString("id-ID")}
                    </p>
                  </div>
                  <StarRating rating={review.rating} />
                  <p className="font-body text-sm text-muted-foreground mt-2 leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Related products */}
          <div className="mt-12">
            <h3 className="font-display text-2xl text-haifa-charcoal mb-6">
              Produk <em className="italic text-haifa-clay">Terkait</em>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {RELATED_PRODUCTS.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Size Guide Modal */}
      {sizeGuideOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-50"
            onClick={() => setSizeGuideOpen(false)}
          />
          <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 bg-white rounded-2xl z-50 p-6 shadow-2xl max-w-lg mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-body font-medium text-haifa-charcoal">Panduan Ukuran</h3>
              <button onClick={() => setSizeGuideOpen(false)}>
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            <table className="w-full border-collapse text-sm font-body">
              <thead>
                <tr className="bg-haifa-cream">
                  {SIZE_GUIDE[0].map((h) => (
                    <th key={h} className="px-4 py-2 text-left font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SIZE_GUIDE.slice(1).map((row, i) => (
                  <tr key={i} className="border-b border-border">
                    {row.map((cell) => (
                      <td key={cell} className="px-4 py-2">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="font-body text-xs text-muted-foreground mt-3">
              * Ukuran dalam sentimeter (cm). Toleransi ±2cm.
            </p>
          </div>
        </>
      )}
    </StorefrontLayout>
  );
}
