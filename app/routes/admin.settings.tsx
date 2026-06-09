import { useState } from "react";
import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { redirect } from "react-router";
import { Save, Store, CreditCard, Truck, MessageCircle } from "lucide-react";
import { AdminLayout } from "~/components/haifa/AdminLayout";
import { getUserFromRequest } from "~/modules/authentication/authentication.server";
import { ToastProvider, useToast } from "~/components/haifa/Toast";
import { useConfigurables } from "~/modules/configurables";

export const meta: MetaFunction = () => [{ title: "Pengaturan — Admin Haifa" }];

export async function loader({ request }: LoaderFunctionArgs) {
  const user = getUserFromRequest(request);
  if (!user || user.role !== "admin") return redirect("/auth/login");
  return null;
}

function SettingsContent() {
  const { config } = useConfigurables();
  const { showToast } = useToast();

  const [form, setForm] = useState({
    appName: config?.appName || "Haifa Official Store",
    tagline: config?.tagline || "",
    whatsappNumber: config?.whatsappNumber || "",
    instagramHandle: config?.instagramHandle || "",
    tiktokHandle: config?.tiktokHandle || "",
    email: config?.email || "",
    bankName: config?.bankName || "",
    bankAccountNumber: config?.bankAccountNumber || "",
    bankAccountName: config?.bankAccountName || "",
    address: config?.address || "",
    palestineDonationPercent: config?.palestineDonationPercent || 10,
  });

  const handleSave = () => {
    showToast("Pengaturan berhasil disimpan", "success");
  };

  const sections = [
    {
      icon: Store,
      title: "Informasi Toko",
      fields: [
        { key: "appName", label: "Nama Toko", type: "text", placeholder: "Haifa Official Store" },
        { key: "tagline", label: "Tagline", type: "text", placeholder: "Anggun dalam Iman..." },
        { key: "email", label: "Email Kontak", type: "email", placeholder: "hello@haifaofficial.com" },
        { key: "address", label: "Alamat", type: "text", placeholder: "Jakarta, Indonesia" },
      ],
    },
    {
      icon: MessageCircle,
      title: "Media Sosial",
      fields: [
        { key: "whatsappNumber", label: "WhatsApp Business", type: "text", placeholder: "6281234567890" },
        { key: "instagramHandle", label: "Instagram", type: "text", placeholder: "@haifa.official" },
        { key: "tiktokHandle", label: "TikTok", type: "text", placeholder: "@haifa.official" },
      ],
    },
    {
      icon: CreditCard,
      title: "Rekening Bank",
      fields: [
        { key: "bankName", label: "Nama Bank", type: "text", placeholder: "BCA" },
        { key: "bankAccountNumber", label: "No. Rekening", type: "text", placeholder: "1234567890" },
        { key: "bankAccountName", label: "Atas Nama", type: "text", placeholder: "Haifa Official Store" },
      ],
    },
  ];

  return (
    <AdminLayout title="Pengaturan">
      <div className="max-w-2xl space-y-6">
        {sections.map(({ icon: Icon, title, fields }) => (
          <div key={title} className="bg-white rounded-2xl border border-border p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-haifa-cream rounded-xl flex items-center justify-center">
                <Icon className="w-5 h-5 text-haifa-clay" />
              </div>
              <h3 className="font-body font-medium text-haifa-charcoal">{title}</h3>
            </div>
            <div className="space-y-4">
              {fields.map(({ key, label, type, placeholder }) => (
                <div key={key}>
                  <label className="font-body text-xs text-muted-foreground block mb-1">{label}</label>
                  <input
                    type={type}
                    value={(form as any)[key]}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                    placeholder={placeholder}
                    className="w-full border border-border rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-haifa-clay transition-colors"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Palestine donation */}
        <div className="bg-white rounded-2xl border border-border p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center">
              <span className="text-red-600 text-sm font-bold">%</span>
            </div>
            <h3 className="font-body font-medium text-haifa-charcoal">Program Donasi Palestina</h3>
          </div>
          <div>
            <label className="font-body text-xs text-muted-foreground block mb-1">
              Persentase Donasi dari Palestine Series (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={form.palestineDonationPercent}
              onChange={(e) => setForm((f) => ({ ...f, palestineDonationPercent: parseInt(e.target.value) }))}
              className="w-32 border border-border rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-haifa-clay transition-colors"
            />
            <p className="font-body text-xs text-muted-foreground mt-1">
              {form.palestineDonationPercent}% dari setiap penjualan Palestine Series akan didonasikan
            </p>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-haifa-clay text-white rounded-full px-6 py-3 font-body text-sm font-medium hover:bg-haifa-peach-dark transition-colors"
        >
          <Save className="w-4 h-4" />
          Simpan Pengaturan
        </button>
      </div>
    </AdminLayout>
  );
}

export default function AdminSettingsPage() {
  return (
    <ToastProvider>
      <SettingsContent />
    </ToastProvider>
  );
}
