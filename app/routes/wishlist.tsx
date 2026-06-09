import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { Heart, ShoppingBag } from "lucide-react";
import { StorefrontLayout } from "~/components/haifa/StorefrontLayout";
import { useWishlist } from "~/components/haifa/WishlistContext";
import { useCart } from "~/components/haifa/CartContext";
import { useToast } from "~/components/haifa/Toast";

export const meta: MetaFunction = () => [
  { title: "Wishlist — Haifa Official Store" },
];

const formatPrice = (n: number) => "Rp " + n.toLocaleString("id-ID");

export default function WishlistPage() {
  const { items, toggle } = useWishlist();
  const { addItem } = useCart();
  const { showToast } = useToast();

  if (items.length === 0) {
    return (
      <StorefrontLayout>
        <div className="pt-24 pb-20 flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
          <Heart className="w-16 h-16 text-muted-foreground mb-4" />
          <h2 className="font-display text-2xl text-haifa-charcoal">Wishlist Kosong</h2>
          <p className="font-body text-sm text-muted-foreground mt-2 max-w-sm">
            Belum ada produk yang kamu simpan. Yuk mulai menjelajahi koleksi!
          </p>
          <Link to="/shop" className="mt-6 btn-primary font-body text-sm">
            Lihat Produk
          </Link>
        </div>
      </StorefrontLayout>
    );
  }

  return (
    <StorefrontLayout>
      <div className="pt-20 pb-24 md:pb-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <h1 className="font-display text-3xl text-haifa-charcoal mb-8">
            Wishlist ({items.length} item)
          </h1>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {items.map((item) => (
              <div key={item.productId} className="bg-white rounded-2xl overflow-hidden border border-border">
                <Link to={`/product/${item.slug}`} className="block">
                  <div className="relative aspect-[3/4] overflow-hidden bg-haifa-cream">
                    <img
                      src={item.image || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80"}
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggle(item);
                        showToast("Dihapus dari wishlist", "info");
                      }}
                      className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow hover:bg-red-50 transition-colors"
                      aria-label="Hapus dari wishlist"
                    >
                      <Heart className="w-4 h-4 text-haifa-clay fill-current" />
                    </button>
                  </div>
                </Link>
                <div className="p-3">
                  <Link to={`/product/${item.slug}`}>
                    <h3 className="font-body text-sm font-medium text-haifa-charcoal line-clamp-1 hover:text-haifa-clay transition-colors">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="font-body text-sm font-medium text-haifa-clay mt-1">
                    {formatPrice(item.price)}
                  </p>
                  <button
                    onClick={() => {
                      addItem({
                        productId: item.productId,
                        name: item.name,
                        image: item.image,
                        price: item.price,
                        variant: "Default",
                        color: "",
                        size: "",
                        quantity: 1,
                        slug: item.slug,
                      });
                      showToast(`${item.name} ditambahkan ke keranjang!`);
                    }}
                    className="mt-2 w-full bg-haifa-clay text-white text-xs font-body py-2 rounded-full flex items-center justify-center gap-1.5 hover:bg-haifa-peach-dark transition-colors"
                  >
                    <ShoppingBag className="w-3 h-3" />
                    + Keranjang
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StorefrontLayout>
  );
}
