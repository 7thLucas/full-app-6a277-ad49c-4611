import { useState } from "react";
import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { redirect, Link } from "react-router";
import { Plus, Search, Pencil, Trash2, FileText } from "lucide-react";
import { AdminLayout } from "~/components/haifa/AdminLayout";
import { getUserFromRequest } from "~/modules/authentication/authentication.server";
import { ToastProvider, useToast } from "~/components/haifa/Toast";

export const meta: MetaFunction = () => [{ title: "Blog — Admin Haifa" }];

export async function loader({ request }: LoaderFunctionArgs) {
  const user = getUserFromRequest(request);
  if (!user || user.role !== "admin") return redirect("/auth/login");
  return null;
}

const MOCK_POSTS = [
  { _id: "1", title: "Tips Memilih Hijab yang Tepat untuk Berbagai Kesempatan", category: "tips", status: "published", publishedAt: "2025-01-10" },
  { _id: "2", title: "Trend Busana Muslimah 2025 yang Wajib Kamu Coba", category: "trend", status: "published", publishedAt: "2025-01-05" },
  { _id: "3", title: "Koleksi Palestine Series Haifa: Solidaritas lewat Fashion", category: "koleksi", status: "draft", publishedAt: null },
  { _id: "4", title: "Cara Merawat Kerudung Voile agar Tahan Lama", category: "tips", status: "published", publishedAt: "2024-12-28" },
];

function BlogContent() {
  const [posts, setPosts] = useState(MOCK_POSTS);
  const [search, setSearch] = useState("");
  const { showToast } = useToast();

  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string, title: string) => {
    if (!confirm(`Hapus artikel "${title}"?`)) return;
    setPosts((prev) => prev.filter((p) => p._id !== id));
    showToast("Artikel dihapus", "info");
  };

  return (
    <AdminLayout title="Blog">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari artikel..."
              className="w-full pl-9 pr-4 py-2 border border-border rounded-full font-body text-sm outline-none focus:border-haifa-clay bg-white"
            />
          </div>
          <Link
            to="/admin/blog/new"
            className="flex items-center gap-2 bg-haifa-clay text-white rounded-full px-4 py-2 font-body text-sm font-medium hover:bg-haifa-peach-dark transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            Tulis Artikel
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-gray-50">
                <th className="px-4 py-3 text-left font-body text-xs font-medium text-muted-foreground uppercase tracking-wider">Judul</th>
                <th className="px-4 py-3 text-left font-body text-xs font-medium text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Kategori</th>
                <th className="px-4 py-3 text-left font-body text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-right font-body text-xs font-medium text-muted-foreground uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((post) => (
                <tr key={post._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-body text-sm text-haifa-charcoal line-clamp-1 max-w-xs">{post.title}</p>
                    <p className="font-body text-xs text-muted-foreground">{post.publishedAt || "Belum dipublikasi"}</p>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="font-body text-xs text-muted-foreground capitalize">{post.category}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`font-body text-xs px-2 py-0.5 rounded-full ${post.status === "published" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {post.status === "published" ? "Terbit" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        to={`/admin/blog/${post._id}/edit`}
                        className="p-1.5 rounded-lg hover:bg-gray-100 text-muted-foreground hover:text-haifa-clay transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(post._id, post.title)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="font-body text-sm text-muted-foreground">Belum ada artikel</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default function AdminBlogPage() {
  return (
    <ToastProvider>
      <BlogContent />
    </ToastProvider>
  );
}
