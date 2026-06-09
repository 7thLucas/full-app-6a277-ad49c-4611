import { useState, useEffect } from "react";
import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { redirect } from "react-router";
import { Search, ShoppingCart, Eye } from "lucide-react";
import { AdminLayout } from "~/components/haifa/AdminLayout";
import { getUserFromRequest } from "~/modules/authentication/authentication.server";
import { TableRowSkeleton } from "~/components/haifa/Skeleton";
import { ToastProvider, useToast } from "~/components/haifa/Toast";

export const meta: MetaFunction = () => [{ title: "Pesanan — Admin Haifa" }];

export async function loader({ request }: LoaderFunctionArgs) {
  const user = getUserFromRequest(request);
  if (!user || user.role !== "admin") return redirect("/auth/login");
  return null;
}

const STATUS_FILTERS = ["", "pending", "confirmed", "processing", "shipped", "delivered", "cancelled"];
const STATUS_LABELS: Record<string, string> = {
  "": "Semua",
  pending: "Baru",
  confirmed: "Dikonfirmasi",
  processing: "Diproses",
  shipped: "Dikirim",
  delivered: "Selesai",
  cancelled: "Dibatalkan",
};
const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  processing: "bg-purple-100 text-purple-700",
  shipped: "bg-indigo-100 text-indigo-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-600",
};

const MOCK_ORDERS = [
  { _id: "1", orderNumber: "HF-20250101-AB1C2D", buyerName: "Siti Aisyah", buyerPhone: "08123456789", total: 320000, status: "confirmed", paymentMethod: "transfer-bank", createdAt: "2025-01-01" },
  { _id: "2", orderNumber: "HF-20250101-EF3G4H", buyerName: "Fatimah Zahra", buyerPhone: "08234567890", total: 185000, status: "shipped", paymentMethod: "qris", createdAt: "2025-01-02" },
  { _id: "3", orderNumber: "HF-20250101-IJ5K6L", buyerName: "Nur Hidayah", buyerPhone: "08345678901", total: 475000, status: "pending", paymentMethod: "cod", createdAt: "2025-01-03" },
  { _id: "4", orderNumber: "HF-20250101-MN7O8P", buyerName: "Rina Amalia", buyerPhone: "08456789012", total: 145000, status: "delivered", paymentMethod: "transfer-bank", createdAt: "2025-01-04" },
  { _id: "5", orderNumber: "HF-20250101-QR9S0T", buyerName: "Dewi Lestari", buyerPhone: "08567890123", total: 285000, status: "processing", paymentMethod: "qris", createdAt: "2025-01-05" },
];

function OrderDetailModal({ order, onClose, onStatusChange }: { order: any; onClose: () => void; onStatusChange: (id: string, status: string) => void }) {
  const [status, setStatus] = useState(order.status);
  const [trackingNumber, setTrackingNumber] = useState("");
  const { showToast } = useToast();

  const handleSave = () => {
    onStatusChange(order._id, status);
    showToast("Status pesanan diperbarui", "success");
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-50" onClick={onClose} />
      <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 bg-white rounded-2xl z-50 p-6 shadow-2xl max-w-lg mx-auto max-h-[80vh] overflow-y-auto">
        <h3 className="font-body font-medium text-haifa-charcoal mb-4">Detail Pesanan</h3>
        <div className="space-y-3 text-sm font-body">
          <div className="flex justify-between">
            <span className="text-muted-foreground">No. Pesanan</span>
            <span className="font-medium">{order.orderNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Pembeli</span>
            <span>{order.buyerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">HP</span>
            <span>{order.buyerPhone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total</span>
            <span className="font-medium text-haifa-clay">Rp{order.total.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Pembayaran</span>
            <span className="capitalize">{order.paymentMethod.replace(/-/g, " ")}</span>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <div>
            <label className="font-body text-xs text-muted-foreground block mb-1">Update Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-border rounded-xl px-4 py-2 font-body text-sm outline-none focus:border-haifa-clay"
            >
              {Object.entries(STATUS_LABELS).filter(([k]) => k !== "").map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="font-body text-xs text-muted-foreground block mb-1">No. Resi (opsional)</label>
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="Masukkan nomor resi pengiriman"
              className="w-full border border-border rounded-xl px-4 py-2 font-body text-sm outline-none focus:border-haifa-clay"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-5">
          <button
            onClick={onClose}
            className="flex-1 border border-border rounded-full py-2.5 font-body text-sm hover:bg-gray-50 transition-colors"
          >
            Tutup
          </button>
          <button
            onClick={handleSave}
            className="flex-1 bg-haifa-clay text-white rounded-full py-2.5 font-body text-sm font-medium hover:bg-haifa-peach-dark transition-colors"
          >
            Simpan
          </button>
        </div>
      </div>
    </>
  );
}

function OrdersContent() {
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const filtered = orders.filter((o) => {
    if (statusFilter && o.status !== statusFilter) return false;
    if (search && !o.buyerName.toLowerCase().includes(search.toLowerCase()) && !o.orderNumber.includes(search)) return false;
    return true;
  });

  const handleStatusChange = (id: string, status: string) => {
    setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, status } : o)));
  };

  return (
    <AdminLayout title="Pesanan">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama atau no. pesanan..."
              className="w-full pl-9 pr-4 py-2 border border-border rounded-full font-body text-sm outline-none focus:border-haifa-clay bg-white"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto pb-1">
            {STATUS_FILTERS.map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-full font-body text-xs whitespace-nowrap transition-all ${
                  statusFilter === s
                    ? "bg-haifa-clay text-white"
                    : "bg-white border border-border text-muted-foreground hover:border-haifa-clay"
                }`}
              >
                {STATUS_LABELS[s]}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-gray-50">
                  <th className="px-4 py-3 text-left font-body text-xs font-medium text-muted-foreground uppercase tracking-wider">No. Pesanan</th>
                  <th className="px-4 py-3 text-left font-body text-xs font-medium text-muted-foreground uppercase tracking-wider">Pembeli</th>
                  <th className="px-4 py-3 text-left font-body text-xs font-medium text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Total</th>
                  <th className="px-4 py-3 text-left font-body text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-right font-body text-xs font-medium text-muted-foreground uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {loading
                  ? Array.from({ length: 5 }).map((_, i) => <TableRowSkeleton key={i} cols={5} />)
                  : filtered.map((order) => (
                      <tr key={order._id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-4 py-3">
                          <span className="font-body text-xs font-mono text-haifa-charcoal">{order.orderNumber}</span>
                        </td>
                        <td className="px-4 py-3">
                          <p className="font-body text-sm text-haifa-charcoal">{order.buyerName}</p>
                          <p className="font-body text-xs text-muted-foreground">{order.buyerPhone}</p>
                        </td>
                        <td className="px-4 py-3 hidden sm:table-cell">
                          <span className="font-body text-sm text-haifa-clay font-medium">
                            Rp{order.total.toLocaleString("id-ID")}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`font-body text-xs px-2 py-0.5 rounded-full ${STATUS_COLORS[order.status] || "bg-gray-100 text-gray-600"}`}>
                            {STATUS_LABELS[order.status]}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="p-1.5 rounded-lg hover:bg-gray-100 text-muted-foreground hover:text-haifa-clay transition-colors"
                            title="Detail"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>

          {!loading && filtered.length === 0 && (
            <div className="text-center py-12">
              <ShoppingCart className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="font-body text-sm text-muted-foreground">Tidak ada pesanan ditemukan</p>
            </div>
          )}
        </div>
      </div>

      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </AdminLayout>
  );
}

export default function AdminOrdersPage() {
  return (
    <ToastProvider>
      <OrdersContent />
    </ToastProvider>
  );
}
