import { useState } from "react";
import type { MetaFunction } from "react-router";
import { useSearchParams } from "react-router";
import { Search, Package, Truck, CheckCircle, Clock } from "lucide-react";
import { StorefrontLayout } from "~/components/haifa/StorefrontLayout";

export const meta: MetaFunction = () => [
  { title: "Lacak Pesanan — Haifa Official Store" },
];

const STATUS_STEPS = [
  { key: "pending", label: "Pesanan Diterima", icon: Clock },
  { key: "confirmed", label: "Dikonfirmasi", icon: CheckCircle },
  { key: "processing", label: "Diproses", icon: Package },
  { key: "shipped", label: "Dikirim", icon: Truck },
  { key: "delivered", label: "Selesai", icon: CheckCircle },
];

export default function TrackPage() {
  const [searchParams] = useSearchParams();
  const [orderNumber, setOrderNumber] = useState(searchParams.get("order") || "");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) return;
    setLoading(true);
    setError("");
    setOrder(null);
    try {
      const res = await fetch(`/api/store/orders/track/${orderNumber.trim()}`);
      const data = await res.json();
      if (data.success) {
        setOrder(data.data);
      } else {
        setError("Pesanan tidak ditemukan. Pastikan nomor pesanan benar.");
      }
    } catch {
      setError("Terjadi kesalahan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const currentStepIndex = order
    ? STATUS_STEPS.findIndex((s) => s.key === order.status)
    : -1;

  return (
    <StorefrontLayout>
      <div className="pt-24 pb-24 md:pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h1 className="font-display text-3xl md:text-4xl text-haifa-charcoal">
              Lacak <em className="italic text-haifa-clay">Pesanan</em>
            </h1>
            <p className="font-body text-sm text-muted-foreground mt-2">
              Masukkan nomor pesanan Anda untuk melihat status pengiriman
            </p>
          </div>

          <form onSubmit={handleTrack} className="flex gap-2 mb-8">
            <input
              type="text"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="Contoh: HF-20250101-ABCDEF"
              className="flex-1 border border-border rounded-full px-5 py-3 font-body text-sm outline-none focus:border-haifa-clay transition-colors"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-haifa-clay text-white rounded-full px-6 py-3 font-body text-sm font-medium flex items-center gap-2 hover:bg-haifa-peach-dark transition-colors disabled:opacity-60"
            >
              <Search className="w-4 h-4" />
              Lacak
            </button>
          </form>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-center">
              <p className="font-body text-sm text-red-600">{error}</p>
            </div>
          )}

          {order && (
            <div className="bg-white rounded-3xl border border-border p-6 space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-body text-xs text-muted-foreground">Nomor Pesanan</p>
                  <p className="font-body font-medium text-haifa-charcoal">{order.orderNumber}</p>
                </div>
                <span
                  className={`font-body text-xs px-3 py-1 rounded-full ${
                    order.status === "delivered"
                      ? "bg-green-100 text-green-700"
                      : order.status === "cancelled"
                      ? "bg-red-100 text-red-600"
                      : "bg-haifa-cream text-haifa-clay"
                  }`}
                >
                  {STATUS_STEPS.find((s) => s.key === order.status)?.label || order.status}
                </span>
              </div>

              {/* Progress */}
              <div className="space-y-3">
                {STATUS_STEPS.filter((s) => s.key !== "cancelled").map((step, i) => {
                  const Icon = step.icon;
                  const done = i <= currentStepIndex;
                  const current = i === currentStepIndex;
                  return (
                    <div key={step.key} className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                          done
                            ? "bg-haifa-clay text-white"
                            : "bg-gray-100 text-muted-foreground"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span
                        className={`font-body text-sm ${
                          current ? "text-haifa-clay font-medium" : done ? "text-haifa-charcoal" : "text-muted-foreground"
                        }`}
                      >
                        {step.label}
                      </span>
                      {current && <span className="w-2 h-2 bg-haifa-clay rounded-full animate-pulse" />}
                    </div>
                  );
                })}
              </div>

              {order.trackingNumber && (
                <div className="bg-haifa-cream rounded-xl p-4">
                  <p className="font-body text-xs text-muted-foreground">No. Resi</p>
                  <p className="font-body font-medium text-haifa-charcoal">{order.trackingNumber}</p>
                  <p className="font-body text-xs text-muted-foreground mt-0.5">{order.courierName}</p>
                </div>
              )}

              <div className="space-y-1">
                <p className="font-body text-xs text-muted-foreground">Penerima</p>
                <p className="font-body text-sm text-haifa-charcoal">{order.buyerName}</p>
                <p className="font-body text-sm text-muted-foreground">
                  {order.shippingAddress?.addressLine}, {order.shippingAddress?.city}
                </p>
              </div>

              <div className="h-px bg-border" />

              <div className="flex justify-between font-body text-sm">
                <span className="text-muted-foreground">Total Pembayaran</span>
                <span className="font-medium text-haifa-clay">
                  Rp{order.total?.toLocaleString("id-ID")}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </StorefrontLayout>
  );
}
