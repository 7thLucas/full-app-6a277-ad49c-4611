import { useState } from "react";
import { Link } from "react-router";
import { Heart, ShoppingBag, Bell } from "lucide-react";
import { useCart } from "./CartContext";
import { useWishlist } from "./WishlistContext";
import { useToast } from "./Toast";

interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  images: string[];
  badge?: string;
  category: string;
  variants?: Array<{ color: string; colorHex: string; size: string; stock: number }>;
}

interface ProductCardProps {
  product: Product;
  style?: React.CSSProperties;
}

const formatPrice = (n: number) =>
  "Rp " + n.toLocaleString("id-ID");

const BADGE_LABELS: Record<string, string> = {
  "best-seller": "Best Seller",
  new: "New",
  sale: "Sale",
};

const BADGE_COLORS: Record<string, string> = {
  "best-seller": "bg-haifa-clay",
  new: "bg-green-500",
  sale: "bg-red-500",
};

export function ProductCard({ product, style }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const { addItem } = useCart();
  const { toggle, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  const totalStock = product.variants?.reduce((sum, v) => sum + v.stock, 0) ?? 0;
  const isSoldOut = totalStock === 0;
  const inWishlist = isInWishlist(product._id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSoldOut) return;

    const firstVariant = product.variants?.[0];
    addItem({
      productId: product._id,
      name: product.name,
      image: product.images[0] || "",
      price: product.price,
      originalPrice: product.originalPrice,
      variant: firstVariant ? `${firstVariant.color} / ${firstVariant.size}` : "Default",
      color: firstVariant?.color || "",
      size: firstVariant?.size || "",
      quantity: 1,
      slug: product.slug,
    });
    showToast(`${product.name} ditambahkan ke keranjang!`, "success");
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle({
      productId: product._id,
      name: product.name,
      image: product.images[0] || "",
      price: product.price,
      slug: product.slug,
    });
    showToast(inWishlist ? "Dihapus dari wishlist" : "Ditambahkan ke wishlist", "info");
  };

  return (
    <div
      className="product-card bg-white rounded-2xl overflow-hidden reveal"
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={`/product/${product.slug}`} className="block">
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-haifa-cream">
          <img
            src={
              hovered && product.images[1]
                ? product.images[1]
                : product.images[0] ||
                  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80"
            }
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />

          {/* Badge */}
          {product.badge && BADGE_LABELS[product.badge] && (
            <span
              className={`absolute top-3 left-3 ${BADGE_COLORS[product.badge]} text-white text-[10px] font-body font-500 px-2 py-0.5 rounded-full`}
            >
              {isSoldOut ? "Sold Out" : BADGE_LABELS[product.badge]}
            </span>
          )}
          {isSoldOut && !product.badge && (
            <span className="absolute top-3 left-3 bg-gray-500 text-white text-[10px] font-body px-2 py-0.5 rounded-full">
              Sold Out
            </span>
          )}

          {/* Wishlist btn */}
          <button
            onClick={handleWishlist}
            className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              inWishlist
                ? "bg-haifa-clay text-white"
                : "bg-white/80 text-haifa-charcoal hover:bg-haifa-clay hover:text-white"
            }`}
            aria-label="Tambah ke wishlist"
          >
            <Heart className={`w-4 h-4 ${inWishlist ? "fill-current" : ""}`} />
          </button>

          {/* Overlay Add to Cart (desktop hover) */}
          <div
            className={`absolute bottom-0 left-0 right-0 transition-all duration-300 ${
              hovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
            }`}
          >
            {isSoldOut ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  showToast("Kamu akan diberitahu ketika stok tersedia", "info");
                }}
                className="w-full bg-haifa-charcoal/90 text-white font-body text-xs py-3 flex items-center justify-center gap-2"
              >
                <Bell className="w-4 h-4" />
                Beritahu Saya
              </button>
            ) : (
              <button
                onClick={handleAddToCart}
                className="w-full bg-haifa-clay text-white font-body text-xs py-3 flex items-center justify-center gap-2 hover:bg-haifa-peach-dark transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                + Keranjang
              </button>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="p-3">
          <p className="font-body text-xs text-muted-foreground uppercase tracking-wide mb-1">
            {product.category}
          </p>
          <h3 className="font-body text-sm font-medium text-haifa-charcoal line-clamp-1">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="font-body text-sm font-600 text-haifa-clay">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="font-body text-xs text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Mobile add to cart */}
      <div className="px-3 pb-3 md:hidden">
        {isSoldOut ? (
          <button
            onClick={() => showToast("Kamu akan diberitahu ketika stok tersedia", "info")}
            className="w-full bg-haifa-charcoal text-white font-body text-xs py-2 rounded-full flex items-center justify-center gap-1.5"
          >
            <Bell className="w-3 h-3" />
            Beritahu Saya
          </button>
        ) : (
          <button
            onClick={handleAddToCart}
            className="w-full bg-haifa-clay text-white font-body text-xs py-2 rounded-full flex items-center justify-center gap-1.5 hover:bg-haifa-peach-dark transition-colors"
          >
            <ShoppingBag className="w-3 h-3" />
            + Keranjang
          </button>
        )}
      </div>
    </div>
  );
}
