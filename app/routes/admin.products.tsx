import { useState, useEffect } from "react";
import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { redirect, Link } from "react-router";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Package,
} from "lucide-react";
import { AdminLayout } from "~/components/haifa/AdminLayout";
import { getUserFromRequest } from "~/modules/authentication/authentication.server";
import { TableRowSkeleton } from "~/components/haifa/Skeleton";
import { useToast } from "~/components/haifa/Toast";
import { ToastProvider } from "~/components/haifa/Toast";

export const meta: MetaFunction = () => [{ title: "Produk — Admin Haifa" }];

export async function loader({ request }: LoaderFunctionArgs) {
  const user = getUserFromRequest(request);
  if (!user || user.role !== "admin") return redirect("/auth/login");
  return null;
}

const MOCK_PRODUCTS = [
  { _id: "1", name: "Kerudung Voile Premium", category: "kerudung", price: 185000, badge: "best-seller", status: "published", images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&q=80"], variants: [{ stock: 50 }, { stock: 30 }] },
  { _id: "2", name: "Gamis Ceruti Polos", category: "gamis", price: 320000, badge: "new", status: "published", images: ["https://images.unsplash.com/photo-1529111290557-82f6d5c6cf85?w=80&q=80"], variants: [{ stock: 20 }] },
  { _id: "3", name: "Kerudung Palestine Keffiyeh", category: "palestine", price: 145000, badge: "best-seller", status: "published", images: ["https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=80&q=80"], variants: [{ stock: 30 }] },
  { _id: "4", name: "Aksesoris Hijab Set", category: "aksesoris", price: 95000, badge: "sale", status: "published", images: ["https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=80&q=80"], variants: [{ stock: 0 }] },
  { _id: "5", name: "Kerudung Satin Premium", category: "kerudung", price: 165000, badge: "new", status: "draft", images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&q=80"], variants: [{ stock: 40 }] },
];

function ProductsContent() {
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { showToast } = useToast();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string, name: string) => {
    if (!confirm(`Hapus produk "${name}"?`)) return;
    setProducts((prev) => prev.filter((p) => p._id !== id));
    showToast(`Produk "${name}" dihapus`, "info");
  };

  return (
    <AdminLayout title="Produk">
      <div className="space-y-4">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari produk..."
              className="w-full pl-9 pr-4 py-2 border border-border rounded-full font-body text-sm outline-none focus:border-haifa-clay transition-colors bg-white"
            />
          </div>
          <Link
            to="/admin/products/new"
            className="flex items-center gap-2 bg-haifa-clay text-white rounded-full px-4 py-2 font-body text-sm font-medium hover:bg-haifa-peach-dark transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            Tambah Produk
          </Link>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-gray-50">
                  <th className="px-4 py-3 text-left font-body text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Produk
                  </th>
                  <th className="px-4 py-3 text-left font-body text-xs font-medium text-muted-foreground uppercase tracking-wider hidden sm:table-cell">
                    Kategori
                  </th>
                  <th className="px-4 py-3 text-left font-body text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Harga
                  </th>
                  <th className="px-4 py-3 text-left font-body text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">
                    Stok
                  </th>
                  <th className="px-4 py-3 text-left font-body text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">
                    Status
                  </th>
                  <th className="px-4 py-3 text-right font-body text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {loading
                  ? Array.from({ length: 5 }).map((_, i) => <TableRowSkeleton key={i} cols={6} />)
                  : filtered.map((product) => {
                      const totalStock = product.variants.reduce((s, v) => s + v.stock, 0);
                      return (
                        <tr key={product._id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-10 h-10 rounded-xl object-cover shrink-0"
                              />
                              <span className="font-body text-sm text-haifa-charcoal line-clamp-1">
                                {product.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3 hidden sm:table-cell">
                            <span className="font-body text-xs text-muted-foreground capitalize">
                              {product.category}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="font-body text-sm text-haifa-charcoal">
                              Rp{product.price.toLocaleString("id-ID")}
                            </span>
                          </td>
                          <td className="px-4 py-3 hidden md:table-cell">
                            <span
                              className={`font-body text-sm ${
                                totalStock === 0
                                  ? "text-red-500 font-medium"
                                  : totalStock < 10
                                  ? "text-yellow-600"
                                  : "text-haifa-charcoal"
                              }`}
                            >
                              {totalStock === 0 ? "Habis" : totalStock}
                            </span>
                          </td>
                          <td className="px-4 py-3 hidden md:table-cell">
                            <span
                              className={`font-body text-xs px-2 py-0.5 rounded-full ${
                                product.status === "published"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-gray-100 text-gray-500"
                              }`}
                            >
                              {product.status === "published" ? "Aktif" : "Draft"}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-end gap-1">
                              <Link
                                to={`/product/${product._id}`}
                                className="p-1.5 rounded-lg hover:bg-gray-100 text-muted-foreground hover:text-haifa-charcoal transition-colors"
                                title="Preview"
                              >
                                {product.status === "published" ? (
                                  <Eye className="w-4 h-4" />
                                ) : (
                                  <EyeOff className="w-4 h-4" />
                                )}
                              </Link>
                              <Link
                                to={`/admin/products/${product._id}/edit`}
                                className="p-1.5 rounded-lg hover:bg-gray-100 text-muted-foreground hover:text-haifa-clay transition-colors"
                                title="Edit"
                              >
                                <Pencil className="w-4 h-4" />
                              </Link>
                              <button
                                onClick={() => handleDelete(product._id, product.name)}
                                className="p-1.5 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-500 transition-colors"
                                title="Hapus"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
              </tbody>
            </table>
          </div>

          {!loading && filtered.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="font-body text-sm text-muted-foreground">Produk tidak ditemukan</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default function AdminProductsPage() {
  return (
    <ToastProvider>
      <ProductsContent />
    </ToastProvider>
  );
}
