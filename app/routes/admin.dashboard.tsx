import { useState, useEffect } from "react";
import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { redirect } from "react-router";
import {
  TrendingUp,
  ShoppingCart,
  Package,
  Users,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { AdminLayout } from "~/components/haifa/AdminLayout";
import { getUserFromRequest } from "~/modules/authentication/authentication.server";
import { Skeleton } from "~/components/haifa/Skeleton";

export const meta: MetaFunction = () => [
  { title: "Dashboard — Admin Haifa" },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const user = getUserFromRequest(request);
  if (!user || user.role !== "admin") return redirect("/auth/login");
  return null;
}

const MOCK_REVENUE_DATA = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  return {
    date: date.toLocaleDateString("id-ID", { month: "short", day: "numeric" }),
    revenue: Math.floor(Math.random() * 5000000) + 1000000,
    orders: Math.floor(Math.random() * 20) + 5,
  };
});

const MOCK_RECENT_ORDERS = [
  { orderNumber: "HF-20250101-AB1C2D", buyerName: "Siti Aisyah", total: 320000, status: "confirmed", createdAt: new Date() },
  { orderNumber: "HF-20250101-EF3G4H", buyerName: "Fatimah Zahra", total: 185000, status: "shipped", createdAt: new Date() },
  { orderNumber: "HF-20250101-IJ5K6L", buyerName: "Nur Hidayah", total: 475000, status: "pending", createdAt: new Date() },
  { orderNumber: "HF-20250101-MN7O8P", buyerName: "Rina Amalia", total: 145000, status: "delivered", createdAt: new Date() },
  { orderNumber: "HF-20250101-QR9S0T", buyerName: "Dewi Lestari", total: 285000, status: "processing", createdAt: new Date() },
];

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  processing: "bg-purple-100 text-purple-700",
  shipped: "bg-indigo-100 text-indigo-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-600",
};

const STATUS_LABELS: Record<string, string> = {
  pending: "Baru",
  confirmed: "Dikonfirmasi",
  processing: "Diproses",
  shipped: "Dikirim",
  delivered: "Selesai",
  cancelled: "Dibatalkan",
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/dashboard/stats")
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setStats(data.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const todayRevenue = stats?.todayRevenue || 0;
  const monthRevenue = stats?.monthRevenue || 0;
  const totalOrders = stats?.totalOrders || 0;
  const recentOrders = stats?.recentOrders || MOCK_RECENT_ORDERS;

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-6">
        {/* Stats cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: "Pendapatan Hari Ini",
              value: `Rp${todayRevenue.toLocaleString("id-ID")}`,
              icon: TrendingUp,
              color: "bg-haifa-clay/10 text-haifa-clay",
              trend: "+12%",
              up: true,
            },
            {
              label: "Pendapatan Bulan Ini",
              value: `Rp${monthRevenue.toLocaleString("id-ID")}`,
              icon: TrendingUp,
              color: "bg-green-50 text-green-600",
              trend: "+8%",
              up: true,
            },
            {
              label: "Total Pesanan",
              value: totalOrders.toString(),
              icon: ShoppingCart,
              color: "bg-blue-50 text-blue-600",
              trend: "+5%",
              up: true,
            },
            {
              label: "Produk Aktif",
              value: "48",
              icon: Package,
              color: "bg-purple-50 text-purple-600",
              trend: "+3",
              up: true,
            },
          ].map(({ label, value, icon: Icon, color, trend, up }) => (
            <div key={label} className="bg-white rounded-2xl p-4 border border-border">
              <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center mb-3`}>
                <Icon className="w-5 h-5" />
              </div>
              {loading ? (
                <Skeleton className="h-6 w-2/3 mb-1" />
              ) : (
                <p className="font-body font-medium text-haifa-charcoal text-lg">{value}</p>
              )}
              <p className="font-body text-xs text-muted-foreground">{label}</p>
              <p className={`font-body text-xs flex items-center gap-0.5 mt-1 ${up ? "text-green-600" : "text-red-500"}`}>
                {up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                {trend}
              </p>
            </div>
          ))}
        </div>

        {/* Revenue chart */}
        <div className="bg-white rounded-2xl border border-border p-5">
          <h3 className="font-body font-medium text-haifa-charcoal mb-4">
            Pendapatan 30 Hari Terakhir
          </h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MOCK_REVENUE_DATA} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0e8e0" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10, fontFamily: "Poppins" }}
                  tickLine={false}
                  interval={4}
                />
                <YAxis
                  tick={{ fontSize: 10, fontFamily: "Poppins" }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `${(v / 1000000).toFixed(1)}jt`}
                />
                <Tooltip
                  formatter={(v: any) => [`Rp${Number(v).toLocaleString("id-ID")}`, "Pendapatan"]}
                  contentStyle={{ fontFamily: "Poppins", fontSize: 12, borderRadius: 12, border: "1px solid #E8DDD5" }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#B17457"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: "#B17457" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Order status grid */}
        <div className="grid sm:grid-cols-2 gap-5">
          {/* Recent orders */}
          <div className="bg-white rounded-2xl border border-border p-5">
            <h3 className="font-body font-medium text-haifa-charcoal mb-4">Pesanan Terbaru</h3>
            <div className="space-y-3">
              {recentOrders.slice(0, 5).map((order: any) => (
                <div key={order.orderNumber} className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-body text-sm font-medium text-haifa-charcoal truncate">
                      {order.buyerName}
                    </p>
                    <p className="font-body text-xs text-muted-foreground truncate">
                      {order.orderNumber}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-body text-sm font-medium text-haifa-clay">
                      Rp{order.total?.toLocaleString("id-ID")}
                    </p>
                    <span className={`font-body text-[10px] px-2 py-0.5 rounded-full ${STATUS_COLORS[order.status] || "bg-gray-100 text-gray-600"}`}>
                      {STATUS_LABELS[order.status] || order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order status summary */}
          <div className="bg-white rounded-2xl border border-border p-5">
            <h3 className="font-body font-medium text-haifa-charcoal mb-4">Status Pesanan</h3>
            <div className="space-y-3">
              {Object.entries(STATUS_LABELS).map(([key, label]) => {
                const count =
                  stats?.statusCounts?.find((s: any) => s._id === key)?.count ||
                  Math.floor(Math.random() * 20);
                return (
                  <div key={key} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_COLORS[key]}`}>
                        {label}
                      </span>
                    </div>
                    <span className="font-body text-sm font-medium text-haifa-charcoal">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
