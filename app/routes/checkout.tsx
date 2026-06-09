import { useState } from "react";
import type { MetaFunction } from "react-router";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, CreditCard, Banknote, Truck } from "lucide-react";
import { StorefrontLayout } from "~/components/haifa/StorefrontLayout";
import { useCart } from "~/components/haifa/CartContext";
import { useToast } from "~/components/haifa/Toast";
import { useConfigurables } from "~/modules/configurables";

export const meta: MetaFunction = () => [
  { title: "Checkout — Haifa Official Store" },
];

const COURIERS = [
  { id: "jne-reg", name: "JNE REG", cost: 15000, estimate: "2-3 Hari" },
  { id: "jnt-ez", name: "J&T EZ", cost: 13000, estimate: "2-4 Hari" },
  { id: "sicepat-reg", name: "SiCepat REG", cost: 12000, estimate: "2-3 Hari" },
];

const PAYMENT_METHODS = [
  { id: "transfer-bank", label: "Transfer Bank", icon: Banknote, desc: "BCA / BRI / Mandiri / BNI" },
  { id: "qris", label: "QRIS", icon: CreditCard, desc: "Bayar dengan QRIS / GoPay / OVO / dll" },
  { id: "cod", label: "COD", icon: Truck, desc: "Bayar di tempat saat paket tiba" },
];

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const { showToast } = useToast();
  const { config } = useConfigurables();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    buyerName: "",
    buyerPhone: "",
    addressLine: "",
    city: "",
    province: "",
    postalCode: "",
  });
  const [courier, setCourier] = useState(COURIERS[0].id);
  const [payment, setPayment] = useState("transfer-bank");
  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoLoading, setPromoLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const selectedCourier = COURIERS.find((c) => c.id === courier)!;
  const grandTotal = total + selectedCourier.cost - promoDiscount;

  const handlePromoApply = async () => {
    if (!promoCode.trim()) return;
    setPromoLoading(true);
    try {
      const res = await fetch("/api/store/promos/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: promoCode, cartTotal: total }),
      });
      const data = await res.json();
      if (data.success) {
        setPromoDiscount(data.data.discountAmount);
        showToast(`Promo berhasil! Diskon Rp${data.data.discountAmount.toLocaleString("id-ID")}`, "success");
      } else {
        showToast(data.error || "Kode promo tidak valid", "error");
      }
    } catch {
      showToast("Gagal validasi promo", "error");
    } finally {
      setPromoLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.buyerName || !form.buyerPhone || !form.addressLine || !form.city) {
      showToast("Mohon lengkapi semua data pengiriman", "error");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/store/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          buyerName: form.buyerName,
          buyerPhone: form.buyerPhone,
          shippingAddress: form,
          items: items.map((i) => ({
            productId: i.productId,
            productName: i.name,
            productImage: i.image,
            variant: i.variant,
            price: i.price,
            quantity: i.quantity,
          })),
          shippingCost: selectedCourier.cost,
          discount: promoDiscount,
          promoCode,
          paymentMethod: payment,
          courierName: selectedCourier.name,
          shippingService: selectedCourier.name,
          estimatedDelivery: selectedCourier.estimate,
        }),
      });
      const data = await res.json();
      if (data.success) {
        clearCart();
        showToast(`Pesanan berhasil! No. Pesanan: ${data.data.orderNumber}`, "success");

        if (payment === "transfer-bank") {
          showToast(`Transfer ke ${config?.bankName || "BCA"} a.n. ${config?.bankAccountName || "Haifa Official"}`, "info");
        }

        navigate(`/track?order=${data.data.orderNumber}`);
      } else {
        showToast("Gagal membuat pesanan. Coba lagi.", "error");
      }
    } catch {
      showToast("Terjadi kesalahan. Coba lagi.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <StorefrontLayout>
        <div className="pt-24 pb-20 flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
          <p className="font-display text-2xl text-muted-foreground">Keranjang kosong</p>
          <Link to="/shop" className="mt-4 btn-primary font-body text-sm">Mulai Belanja</Link>
        </div>
      </StorefrontLayout>
    );
  }

  return (
    <StorefrontLayout>
      <div className="pt-20 pb-24 md:pb-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-center gap-3 mb-6">
            <Link to="/cart" className="p-2 rounded-lg hover:bg-haifa-cream transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="font-display text-3xl text-haifa-charcoal">Checkout</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left: Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Shipping info */}
                <div className="bg-white rounded-2xl p-5 border border-border">
                  <h3 className="font-body font-medium text-haifa-charcoal mb-4">Informasi Pengiriman</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="font-body text-xs font-medium text-muted-foreground block mb-1">
                        Nama Lengkap *
                      </label>
                      <input
                        type="text"
                        value={form.buyerName}
                        onChange={(e) => setForm((f) => ({ ...f, buyerName: e.target.value }))}
                        placeholder="Nama penerima"
                        className="w-full border border-border rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-haifa-clay transition-colors"
                        required
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="font-body text-xs font-medium text-muted-foreground block mb-1">
                        Nomor HP *
                      </label>
                      <input
                        type="tel"
                        value={form.buyerPhone}
                        onChange={(e) => setForm((f) => ({ ...f, buyerPhone: e.target.value }))}
                        placeholder="08xxxxxxxxxx"
                        className="w-full border border-border rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-haifa-clay transition-colors"
                        required
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="font-body text-xs font-medium text-muted-foreground block mb-1">
                        Alamat Lengkap *
                      </label>
                      <textarea
                        value={form.addressLine}
                        onChange={(e) => setForm((f) => ({ ...f, addressLine: e.target.value }))}
                        placeholder="Jl. Contoh No. 1, RT/RW, Kelurahan, Kecamatan"
                        rows={2}
                        className="w-full border border-border rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-haifa-clay transition-colors resize-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="font-body text-xs font-medium text-muted-foreground block mb-1">
                        Kota *
                      </label>
                      <input
                        type="text"
                        value={form.city}
                        onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                        placeholder="Jakarta Selatan"
                        className="w-full border border-border rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-haifa-clay transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="font-body text-xs font-medium text-muted-foreground block mb-1">
                        Provinsi
                      </label>
                      <input
                        type="text"
                        value={form.province}
                        onChange={(e) => setForm((f) => ({ ...f, province: e.target.value }))}
                        placeholder="DKI Jakarta"
                        className="w-full border border-border rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-haifa-clay transition-colors"
                      />
                    </div>
                    <div>
                      <label className="font-body text-xs font-medium text-muted-foreground block mb-1">
                        Kode Pos
                      </label>
                      <input
                        type="text"
                        value={form.postalCode}
                        onChange={(e) => setForm((f) => ({ ...f, postalCode: e.target.value }))}
                        placeholder="12345"
                        className="w-full border border-border rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-haifa-clay transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Courier */}
                <div className="bg-white rounded-2xl p-5 border border-border">
                  <h3 className="font-body font-medium text-haifa-charcoal mb-4">Pilih Kurir</h3>
                  <div className="space-y-2">
                    {COURIERS.map((c) => (
                      <label
                        key={c.id}
                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                          courier === c.id
                            ? "border-haifa-clay bg-haifa-cream/50"
                            : "border-border hover:border-haifa-clay/50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="courier"
                            value={c.id}
                            checked={courier === c.id}
                            onChange={() => setCourier(c.id)}
                            className="accent-haifa-clay"
                          />
                          <div>
                            <p className="font-body text-sm font-medium text-haifa-charcoal">{c.name}</p>
                            <p className="font-body text-xs text-muted-foreground">Estimasi {c.estimate}</p>
                          </div>
                        </div>
                        <span className="font-body text-sm font-medium text-haifa-clay">
                          Rp{c.cost.toLocaleString("id-ID")}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Payment */}
                <div className="bg-white rounded-2xl p-5 border border-border">
                  <h3 className="font-body font-medium text-haifa-charcoal mb-4">Metode Pembayaran</h3>
                  <div className="space-y-2">
                    {PAYMENT_METHODS.map((pm) => {
                      const Icon = pm.icon;
                      return (
                        <label
                          key={pm.id}
                          className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                            payment === pm.id
                              ? "border-haifa-clay bg-haifa-cream/50"
                              : "border-border hover:border-haifa-clay/50"
                          }`}
                        >
                          <input
                            type="radio"
                            name="payment"
                            value={pm.id}
                            checked={payment === pm.id}
                            onChange={() => setPayment(pm.id)}
                            className="accent-haifa-clay"
                          />
                          <Icon className="w-5 h-5 text-haifa-clay shrink-0" />
                          <div>
                            <p className="font-body text-sm font-medium text-haifa-charcoal">{pm.label}</p>
                            <p className="font-body text-xs text-muted-foreground">{pm.desc}</p>
                          </div>
                        </label>
                      );
                    })}
                  </div>

                  {payment === "transfer-bank" && (
                    <div className="mt-4 bg-haifa-cream rounded-xl p-4">
                      <p className="font-body text-sm font-medium text-haifa-charcoal">
                        Rekening Tujuan:
                      </p>
                      <p className="font-body text-sm text-haifa-charcoal mt-1">
                        {config?.bankName || "BCA"} — {config?.bankAccountNumber || "1234567890"}
                      </p>
                      <p className="font-body text-xs text-muted-foreground">
                        a.n. {config?.bankAccountName || "Haifa Official Store"}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Summary */}
              <div>
                <div className="bg-white rounded-2xl p-5 border border-border sticky top-20 space-y-4">
                  <h3 className="font-body font-medium text-haifa-charcoal">Ringkasan Pesanan</h3>

                  {/* Items */}
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center gap-2">
                        <img
                          src={item.image || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=60&q=80"}
                          alt={item.name}
                          className="w-10 h-10 rounded-lg object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-body text-xs text-haifa-charcoal line-clamp-1">{item.name}</p>
                          <p className="font-body text-xs text-muted-foreground">{item.variant} × {item.quantity}</p>
                        </div>
                        <span className="font-body text-xs font-medium shrink-0">
                          Rp{(item.price * item.quantity).toLocaleString("id-ID")}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Promo code */}
                  <div>
                    <label className="font-body text-xs text-muted-foreground block mb-1">Kode Promo</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                        placeholder="Masukkan kode"
                        className="flex-1 border border-border rounded-full px-3 py-2 font-body text-xs outline-none focus:border-haifa-clay"
                      />
                      <button
                        type="button"
                        onClick={handlePromoApply}
                        disabled={promoLoading}
                        className="bg-haifa-charcoal text-white rounded-full px-3 py-2 font-body text-xs hover:bg-haifa-clay transition-colors disabled:opacity-50"
                      >
                        Terapkan
                      </button>
                    </div>
                  </div>

                  <div className="h-px bg-border" />

                  {/* Totals */}
                  <div className="space-y-2 font-body text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>Rp{total.toLocaleString("id-ID")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Ongkir ({selectedCourier.name})</span>
                      <span>Rp{selectedCourier.cost.toLocaleString("id-ID")}</span>
                    </div>
                    {promoDiscount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Diskon</span>
                        <span>-Rp{promoDiscount.toLocaleString("id-ID")}</span>
                      </div>
                    )}
                    <div className="h-px bg-border" />
                    <div className="flex justify-between font-medium text-haifa-charcoal text-base">
                      <span>Total</span>
                      <span className="text-haifa-clay">Rp{grandTotal.toLocaleString("id-ID")}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-haifa-clay text-white rounded-full py-3 font-body text-sm font-medium hover:bg-haifa-peach-dark transition-colors disabled:opacity-60"
                  >
                    {submitting ? "Memproses..." : "Konfirmasi Pesanan"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </StorefrontLayout>
  );
}
