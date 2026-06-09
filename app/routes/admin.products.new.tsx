import { useState } from "react";
import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { redirect, Link, useNavigate } from "react-router";
import { ArrowLeft, Plus, X, Upload } from "lucide-react";
import { AdminLayout } from "~/components/haifa/AdminLayout";
import { getUserFromRequest } from "~/modules/authentication/authentication.server";
import { ToastProvider, useToast } from "~/components/haifa/Toast";

export const meta: MetaFunction = () => [{ title: "Tambah Produk — Admin Haifa" }];

export async function loader({ request }: LoaderFunctionArgs) {
  const user = getUserFromRequest(request);
  if (!user || user.role !== "admin") return redirect("/auth/login");
  return null;
}

interface Variant {
  color: string;
  colorHex: string;
  size: string;
  stock: number;
}

function NewProductContent() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    materialCare: "",
    price: "",
    originalPrice: "",
    category: "kerudung",
    badge: "",
    status: "draft",
    isPalestineSeries: false,
    weight: "",
    tags: "",
  });
  const [variants, setVariants] = useState<Variant[]>([
    { color: "", colorHex: "#B17457", size: "All Size", stock: 0 },
  ]);
  const [images, setImages] = useState<string[]>([]);

  const addVariant = () => {
    setVariants((v) => [...v, { color: "", colorHex: "#B17457", size: "All Size", stock: 0 }]);
  };

  const removeVariant = (i: number) => {
    setVariants((v) => v.filter((_, idx) => idx !== i));
  };

  const handleSave = async () => {
    if (!form.name || !form.price) {
      showToast("Nama dan harga wajib diisi", "error");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price),
          originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : undefined,
          weight: form.weight ? parseFloat(form.weight) : undefined,
          tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
          variants,
          images: images.length ? images : ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"],
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast("Produk berhasil disimpan!", "success");
        navigate("/admin/products");
      } else {
        showToast(data.error || "Gagal menyimpan produk", "error");
      }
    } catch {
      showToast("Terjadi kesalahan", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout title="Tambah Produk">
      <div className="max-w-3xl space-y-5">
        <div className="flex items-center gap-3">
          <Link to="/admin/products" className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h2 className="font-body font-medium text-haifa-charcoal">Tambah Produk Baru</h2>
        </div>

        {/* Basic Info */}
        <div className="bg-white rounded-2xl border border-border p-5 space-y-4">
          <h3 className="font-body font-medium text-haifa-charcoal">Informasi Dasar</h3>
          <div>
            <label className="font-body text-xs text-muted-foreground block mb-1">Nama Produk *</label>
            <input type="text" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Nama produk" className="w-full border border-border rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-haifa-clay" />
          </div>
          <div>
            <label className="font-body text-xs text-muted-foreground block mb-1">Deskripsi</label>
            <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={3} placeholder="Deskripsi produk..." className="w-full border border-border rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-haifa-clay resize-none" />
          </div>
          <div>
            <label className="font-body text-xs text-muted-foreground block mb-1">Bahan & Perawatan</label>
            <textarea value={form.materialCare} onChange={(e) => setForm((f) => ({ ...f, materialCare: e.target.value }))} rows={2} placeholder="Material dan cara perawatan..." className="w-full border border-border rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-haifa-clay resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-body text-xs text-muted-foreground block mb-1">Harga *</label>
              <input type="number" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} placeholder="185000" className="w-full border border-border rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-haifa-clay" />
            </div>
            <div>
              <label className="font-body text-xs text-muted-foreground block mb-1">Harga Coret (opsional)</label>
              <input type="number" value={form.originalPrice} onChange={(e) => setForm((f) => ({ ...f, originalPrice: e.target.value }))} placeholder="225000" className="w-full border border-border rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-haifa-clay" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-body text-xs text-muted-foreground block mb-1">Kategori</label>
              <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} className="w-full border border-border rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-haifa-clay">
                <option value="kerudung">Kerudung</option>
                <option value="gamis">Gamis</option>
                <option value="palestine">Palestine Series</option>
                <option value="aksesoris">Aksesoris</option>
              </select>
            </div>
            <div>
              <label className="font-body text-xs text-muted-foreground block mb-1">Badge</label>
              <select value={form.badge} onChange={(e) => setForm((f) => ({ ...f, badge: e.target.value }))} className="w-full border border-border rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-haifa-clay">
                <option value="">Tidak ada</option>
                <option value="best-seller">Best Seller</option>
                <option value="new">New</option>
                <option value="sale">Sale</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.isPalestineSeries} onChange={(e) => setForm((f) => ({ ...f, isPalestineSeries: e.target.checked }))} className="accent-haifa-clay" />
              <span className="font-body text-sm text-haifa-charcoal">Palestine Series</span>
            </label>
            <div>
              <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))} className="border border-border rounded-xl px-4 py-2 font-body text-sm outline-none focus:border-haifa-clay">
                <option value="draft">Draft</option>
                <option value="published">Publish</option>
              </select>
            </div>
          </div>
        </div>

        {/* Variants */}
        <div className="bg-white rounded-2xl border border-border p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-body font-medium text-haifa-charcoal">Varian</h3>
            <button onClick={addVariant} className="flex items-center gap-1 text-haifa-clay font-body text-xs hover:text-haifa-peach-dark transition-colors">
              <Plus className="w-3 h-3" />
              Tambah Varian
            </button>
          </div>
          {variants.map((v, i) => (
            <div key={i} className="grid grid-cols-4 gap-2 items-center">
              <input type="text" value={v.color} onChange={(e) => setVariants((vs) => vs.map((vi, j) => j === i ? { ...vi, color: e.target.value } : vi))} placeholder="Warna" className="border border-border rounded-xl px-3 py-2 font-body text-xs outline-none focus:border-haifa-clay" />
              <input type="color" value={v.colorHex} onChange={(e) => setVariants((vs) => vs.map((vi, j) => j === i ? { ...vi, colorHex: e.target.value } : vi))} className="border border-border rounded-xl h-9 w-full cursor-pointer" title="Pilih warna" />
              <input type="text" value={v.size} onChange={(e) => setVariants((vs) => vs.map((vi, j) => j === i ? { ...vi, size: e.target.value } : vi))} placeholder="Ukuran" className="border border-border rounded-xl px-3 py-2 font-body text-xs outline-none focus:border-haifa-clay" />
              <div className="flex items-center gap-1">
                <input type="number" value={v.stock} onChange={(e) => setVariants((vs) => vs.map((vi, j) => j === i ? { ...vi, stock: parseInt(e.target.value) } : vi))} placeholder="Stok" className="flex-1 border border-border rounded-xl px-3 py-2 font-body text-xs outline-none focus:border-haifa-clay" />
                {variants.length > 1 && (
                  <button onClick={() => removeVariant(i)} className="text-muted-foreground hover:text-red-500 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Photo upload note */}
        <div className="bg-white rounded-2xl border border-border p-5">
          <h3 className="font-body font-medium text-haifa-charcoal mb-3">Foto Produk</h3>
          <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="font-body text-sm text-muted-foreground">
              Upload foto produk (maks. 5 foto, 2MB per foto)
            </p>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              id="photo-upload"
              onChange={(e) => {
                const files = e.target.files;
                if (!files) return;
                Array.from(files).forEach(async (file) => {
                  const formData = new FormData();
                  formData.append("file", file);
                  try {
                    const res = await fetch("/api/uploader/image", { method: "POST", body: formData });
                    const data = await res.json();
                    if (data.data?.url) {
                      setImages((imgs) => [...imgs, data.data.url]);
                    }
                  } catch {}
                });
              }}
            />
            <label htmlFor="photo-upload" className="mt-3 inline-block cursor-pointer bg-haifa-cream text-haifa-clay rounded-full px-4 py-2 font-body text-sm hover:bg-haifa-clay hover:text-white transition-colors">
              Pilih Foto
            </label>
          </div>
          {images.length > 0 && (
            <div className="flex gap-2 mt-3 flex-wrap">
              {images.map((img, i) => (
                <div key={i} className="relative">
                  <img src={img} alt="" className="w-16 h-16 rounded-xl object-cover" />
                  <button onClick={() => setImages((imgs) => imgs.filter((_, j) => j !== i))} className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link to="/admin/products" className="border border-border rounded-full px-6 py-3 font-body text-sm hover:bg-gray-50 transition-colors">
            Batal
          </Link>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-haifa-clay text-white rounded-full px-6 py-3 font-body text-sm font-medium hover:bg-haifa-peach-dark transition-colors disabled:opacity-60"
          >
            {saving ? "Menyimpan..." : form.status === "published" ? "Simpan & Publish" : "Simpan Draft"}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}

export default function AdminProductsNewPage() {
  return (
    <ToastProvider>
      <NewProductContent />
    </ToastProvider>
  );
}
