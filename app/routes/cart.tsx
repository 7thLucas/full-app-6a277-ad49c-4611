import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { StorefrontLayout } from "~/components/haifa/StorefrontLayout";
import { useCart } from "~/components/haifa/CartContext";
import { useToast } from "~/components/haifa/Toast";

export const meta: MetaFunction = () => [
  { title: "Keranjang Belanja — Haifa Official Store" },
];

const formatPrice = (n: number) => "Rp " + n.toLocaleString("id-ID");

export default function CartPage() {
  const { items, count, total, removeItem, updateQuantity } = useCart();
  const { showToast } = useToast();

  const shippingEstimate = total > 300000 ? 0 : 15000;
  const grandTotal = total + shippingEstimate;

  if (count === 0) {
    return (
      <StorefrontLayout>
        <div className="pt-24 pb-20 flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
          <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
          <h2 className="font-display text-2xl text-haifa-charcoal">Keranjang Kosong</h2>
          <p className="font-body text-sm text-muted-foreground mt-2 max-w-sm">
            Belum ada produk di keranjang Anda. Yuk mulai belanja!
          </p>
          <Link to="/shop" className="mt-6 btn-primary font-body text-sm">
            Mulai Belanja
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
            Keranjang Belanja ({count} item)
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl p-4 flex gap-4 border border-border">
                  <Link to={`/product/${item.slug}`} className="shrink-0">
                    <img
                      src={item.image || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&q=80"}
                      alt={item.name}
                      className="w-20 h-20 rounded-xl object-cover"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${item.slug}`}>
                      <h3 className="font-body text-sm font-medium text-haifa-charcoal line-clamp-1 hover:text-haifa-clay transition-colors">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="font-body text-xs text-muted-foreground mt-0.5">{item.variant}</p>
                    <p className="font-body text-sm font-medium text-haifa-clay mt-1">
                      {formatPrice(item.price)}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-border rounded-full overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-haifa-cream transition-colors"
                          aria-label="Kurangi"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center font-body text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-haifa-cream transition-colors"
                          aria-label="Tambah"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-body text-sm font-medium text-haifa-charcoal">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                        <button
                          onClick={() => {
                            removeItem(item.id);
                            showToast(`${item.name} dihapus dari keranjang`, "info");
                          }}
                          className="text-muted-foreground hover:text-red-500 transition-colors"
                          aria-label="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order summary */}
            <div>
              <div className="bg-white rounded-2xl p-5 border border-border sticky top-20">
                <h3 className="font-body font-medium text-haifa-charcoal mb-4">Ringkasan Pesanan</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-body">
                    <span className="text-muted-foreground">Subtotal ({count} item)</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-body">
                    <span className="text-muted-foreground">Estimasi Ongkir</span>
                    <span className={shippingEstimate === 0 ? "text-green-600" : ""}>
                      {shippingEstimate === 0 ? "Gratis" : formatPrice(shippingEstimate)}
                    </span>
                  </div>
                  {shippingEstimate === 0 && (
                    <p className="text-xs font-body text-green-600 bg-green-50 rounded-lg px-3 py-2">
                      Selamat! Kamu mendapat free ongkir
                    </p>
                  )}
                </div>
                <div className="h-px bg-border my-4" />
                <div className="flex justify-between font-body font-medium text-haifa-charcoal">
                  <span>Total</span>
                  <span className="text-haifa-clay text-lg">{formatPrice(grandTotal)}</span>
                </div>

                <Link
                  to="/checkout"
                  className="mt-5 w-full bg-haifa-clay text-white rounded-full py-3 font-body text-sm font-medium flex items-center justify-center gap-2 hover:bg-haifa-peach-dark transition-colors"
                >
                  Lanjut ke Checkout
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/shop"
                  className="mt-3 w-full text-center font-body text-sm text-muted-foreground hover:text-haifa-clay transition-colors block"
                >
                  Lanjut Belanja
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StorefrontLayout>
  );
}
