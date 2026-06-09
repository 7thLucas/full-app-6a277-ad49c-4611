import { useState } from "react";
import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { redirect } from "react-router";
import { Plus, Tag, Pencil, Trash2, ToggleLeft, ToggleRight } from "lucide-react";
import { AdminLayout } from "~/components/haifa/AdminLayout";
import { getUserFromRequest } from "~/modules/authentication/authentication.server";
import { ToastProvider, useToast } from "~/components/haifa/Toast";

export const meta: MetaFunction = () => [{ title: "Promo — Admin Haifa" }];

export async function loader({ request }: LoaderFunctionArgs) {
  const user = getUserFromRequest(request);
  if (!user || user.role !== "admin") return redirect("/auth/login");
  return null;
}

const MOCK_PROMOS = [
  { _id: "1", code: "HAIFA15", name: "Diskon Newsletter 15%", type: "percentage", discountValue: 15, usedCount: 42, maxUsage: 100, isActive: true, endDate: "2025-12-31" },
  { _id: "2", code: "FREEONGKIR", name: "Gratis Ongkir", type: "free-shipping", discountValue: 0, usedCount: 18, maxUsage: 50, isActive: true, endDate: "2025-06-30" },
  { _id: "3", code: "FLASH50K", name: "Flash Sale 50ribu", type: "fixed", discountValue: 50000, usedCount: 30, maxUsage: 30, isActive: false, endDate: "2025-01-15" },
];

function TYPE_LABEL(type: string) {
  const labels: Record<string, string> = {
    percentage: "Persentase",
    fixed: "Nominal Tetap",
    "free-shipping": "Gratis Ongkir",
    "flash-sale": "Flash Sale",
    "buy-x-get-y": "Beli X Gratis Y",
  };
  return labels[type] || type;
}

function AddPromoModal({ onClose, onAdd }: { onClose: () => void; onAdd: (promo: any) => void }) {
  const [form, setForm] = useState({
    code: "",
    name: "",
    type: "percentage",
    discountValue: 10,
    minPurchase: 0,
    maxUsage: 100,
    endDate: "",
    isActive: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ ...form, _id: Date.now().toString(), usedCount: 0 });
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-50" onClick={onClose} />
      <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 bg-white rounded-2xl z-50 p-6 shadow-2xl max-w-md mx-auto max-h-[85vh] overflow-y-auto">
        <h3 className="font-body font-medium text-haifa-charcoal mb-4">Tambah Promo</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="font-body text-xs text-muted-foreground block mb-1">Kode Promo</label>
            <input type="text" required value={form.code} onChange={(e) => setForm((f) => ({ ...f, code: e.target.value.toUpperCase() }))} placeholder="HAIFA10" className="w-full border border-border rounded-xl px-4 py-2 font-body text-sm outline-none focus:border-haifa-clay" />
          </div>
          <div>
            <label className="font-body text-xs text-muted-foreground block mb-1">Nama Promo</label>
            <input type="text" required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Nama promo" className="w-full border border-border rounded-xl px-4 py-2 font-body text-sm outline-none focus:border-haifa-clay" />
          </div>
          <div>
            <label className="font-body text-xs text-muted-foreground block mb-1">Tipe</label>
            <select value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))} className="w-full border border-border rounded-xl px-4 py-2 font-body text-sm outline-none focus:border-haifa-clay">
              <option value="percentage">Persentase (%)</option>
              <option value="fixed">Nominal Tetap (Rp)</option>
              <option value="free-shipping">Gratis Ongkir</option>
            </select>
          </div>
          {form.type !== "free-shipping" && (
            <div>
              <label className="font-body text-xs text-muted-foreground block mb-1">Nilai Diskon</label>
              <input type="number" value={form.discountValue} onChange={(e) => setForm((f) => ({ ...f, discountValue: parseInt(e.target.value) }))} className="w-full border border-border rounded-xl px-4 py-2 font-body text-sm outline-none focus:border-haifa-clay" />
            </div>
          )}
          <div>
            <label className="font-body text-xs text-muted-foreground block mb-1">Batas Tanggal</label>
            <input type="date" required value={form.endDate} onChange={(e) => setForm((f) => ({ ...f, endDate: e.target.value }))} className="w-full border border-border rounded-xl px-4 py-2 font-body text-sm outline-none focus:border-haifa-clay" />
          </div>
          <div>
            <label className="font-body text-xs text-muted-foreground block mb-1">Maks. Penggunaan</label>
            <input type="number" value={form.maxUsage} onChange={(e) => setForm((f) => ({ ...f, maxUsage: parseInt(e.target.value) }))} className="w-full border border-border rounded-xl px-4 py-2 font-body text-sm outline-none focus:border-haifa-clay" />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 border border-border rounded-full py-2.5 font-body text-sm">Batal</button>
            <button type="submit" className="flex-1 bg-haifa-clay text-white rounded-full py-2.5 font-body text-sm font-medium hover:bg-haifa-peach-dark transition-colors">Simpan</button>
          </div>
        </form>
      </div>
    </>
  );
}

function PromosContent() {
  const [promos, setPromos] = useState(MOCK_PROMOS);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const { showToast } = useToast();

  const handleToggle = (id: string) => {
    setPromos((prev) => prev.map((p) => (p._id === id ? { ...p, isActive: !p.isActive } : p)));
    showToast("Status promo diperbarui", "info");
  };

  const handleDelete = (id: string, code: string) => {
    if (!confirm(`Hapus promo "${code}"?`)) return;
    setPromos((prev) => prev.filter((p) => p._id !== id));
    showToast("Promo dihapus", "info");
  };

  return (
    <AdminLayout title="Promo & Diskon">
      <div className="space-y-4">
        <div className="flex items-center justify-end">
          <button
            onClick={() => setAddModalOpen(true)}
            className="flex items-center gap-2 bg-haifa-clay text-white rounded-full px-4 py-2 font-body text-sm font-medium hover:bg-haifa-peach-dark transition-colors"
          >
            <Plus className="w-4 h-4" />
            Tambah Promo
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-gray-50">
                <th className="px-4 py-3 text-left font-body text-xs font-medium text-muted-foreground uppercase">Kode</th>
                <th className="px-4 py-3 text-left font-body text-xs font-medium text-muted-foreground uppercase hidden sm:table-cell">Tipe</th>
                <th className="px-4 py-3 text-left font-body text-xs font-medium text-muted-foreground uppercase hidden md:table-cell">Penggunaan</th>
                <th className="px-4 py-3 text-left font-body text-xs font-medium text-muted-foreground uppercase">Aktif</th>
                <th className="px-4 py-3 text-right font-body text-xs font-medium text-muted-foreground uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {promos.map((promo) => (
                <tr key={promo._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-body text-sm font-mono font-medium text-haifa-clay">{promo.code}</p>
                    <p className="font-body text-xs text-muted-foreground">{promo.name}</p>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="font-body text-xs text-muted-foreground">{TYPE_LABEL(promo.type)}</span>
                    {promo.discountValue > 0 && (
                      <span className="ml-1 font-body text-xs text-haifa-clay">
                        {promo.type === "percentage" ? `${promo.discountValue}%` : `Rp${promo.discountValue.toLocaleString("id-ID")}`}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="font-body text-sm text-haifa-charcoal">
                      {promo.usedCount}/{promo.maxUsage}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => handleToggle(promo._id)}>
                      {promo.isActive ? (
                        <ToggleRight className="w-6 h-6 text-green-500" />
                      ) : (
                        <ToggleLeft className="w-6 h-6 text-gray-300" />
                      )}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 text-muted-foreground hover:text-haifa-clay transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(promo._id, promo.code)}
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
          {promos.length === 0 && (
            <div className="text-center py-12">
              <Tag className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="font-body text-sm text-muted-foreground">Belum ada promo</p>
            </div>
          )}
        </div>
      </div>

      {addModalOpen && (
        <AddPromoModal
          onClose={() => setAddModalOpen(false)}
          onAdd={(p) => {
            setPromos((prev) => [p, ...prev]);
            showToast("Promo berhasil ditambahkan", "success");
          }}
        />
      )}
    </AdminLayout>
  );
}

export default function AdminPromosPage() {
  return (
    <ToastProvider>
      <PromosContent />
    </ToastProvider>
  );
}
