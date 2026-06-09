import { useState } from "react";
import type { MetaFunction } from "react-router";
import { MessageCircle, Mail, MapPin, Instagram, Send } from "lucide-react";
import { StorefrontLayout } from "~/components/haifa/StorefrontLayout";
import { useConfigurables } from "~/modules/configurables";
import { useToast } from "~/components/haifa/Toast";

export const meta: MetaFunction = () => [
  { title: "Hubungi Kami — Haifa Official Store" },
];

export default function ContactPage() {
  const { config } = useConfigurables();
  const { showToast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const whatsapp = config?.whatsappNumber || "6281234567890";
  const email = config?.email || "hello@haifaofficial.com";
  const instagram = config?.instagramHandle || "@haifa.official";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate sending
    await new Promise((r) => setTimeout(r, 1000));
    showToast("Pesan berhasil dikirim! Kami akan segera menghubungi Anda.", "success");
    setForm({ name: "", email: "", message: "" });
    setSubmitting(false);
  };

  return (
    <StorefrontLayout>
      <div className="pt-24 pb-24 md:pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <div className="text-center mb-10 reveal">
            <h1 className="font-display text-3xl md:text-4xl text-haifa-charcoal">
              Hubungi <em className="italic text-haifa-clay">Kami</em>
            </h1>
            <p className="font-body text-sm text-muted-foreground mt-2">
              Kami siap membantu Anda. Jangan ragu untuk menghubungi kami.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Contact info */}
            <div className="space-y-5 reveal">
              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-white rounded-2xl p-4 border border-border hover:border-haifa-clay transition-colors group"
              >
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center shrink-0">
                  <MessageCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="font-body text-sm font-medium text-haifa-charcoal">WhatsApp</p>
                  <p className="font-body text-xs text-muted-foreground group-hover:text-haifa-clay transition-colors">
                    +{whatsapp}
                  </p>
                </div>
              </a>

              <a
                href={`mailto:${email}`}
                className="flex items-center gap-4 bg-white rounded-2xl p-4 border border-border hover:border-haifa-clay transition-colors group"
              >
                <div className="w-12 h-12 bg-haifa-cream rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-haifa-clay" />
                </div>
                <div>
                  <p className="font-body text-sm font-medium text-haifa-charcoal">Email</p>
                  <p className="font-body text-xs text-muted-foreground group-hover:text-haifa-clay transition-colors">
                    {email}
                  </p>
                </div>
              </a>

              <a
                href={`https://instagram.com/${instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-white rounded-2xl p-4 border border-border hover:border-haifa-clay transition-colors group"
              >
                <div className="w-12 h-12 bg-pink-50 rounded-xl flex items-center justify-center shrink-0">
                  <Instagram className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <p className="font-body text-sm font-medium text-haifa-charcoal">Instagram</p>
                  <p className="font-body text-xs text-muted-foreground group-hover:text-haifa-clay transition-colors">
                    {instagram}
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4 bg-white rounded-2xl p-4 border border-border">
                <div className="w-12 h-12 bg-haifa-cream rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-haifa-clay" />
                </div>
                <div>
                  <p className="font-body text-sm font-medium text-haifa-charcoal">Alamat</p>
                  <p className="font-body text-xs text-muted-foreground">
                    {config?.address || "Jakarta, Indonesia"}
                  </p>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-6 border border-border reveal space-y-4"
              style={{ transitionDelay: "100ms" }}
            >
              <div>
                <label className="font-body text-xs text-muted-foreground block mb-1">Nama</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Nama lengkap"
                  className="w-full border border-border rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-haifa-clay transition-colors"
                  required
                />
              </div>
              <div>
                <label className="font-body text-xs text-muted-foreground block mb-1">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="email@contoh.com"
                  className="w-full border border-border rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-haifa-clay transition-colors"
                  required
                />
              </div>
              <div>
                <label className="font-body text-xs text-muted-foreground block mb-1">Pesan</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  placeholder="Tulis pesan Anda..."
                  rows={4}
                  className="w-full border border-border rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-haifa-clay transition-colors resize-none"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-haifa-clay text-white rounded-full py-3 font-body text-sm font-medium flex items-center justify-center gap-2 hover:bg-haifa-peach-dark transition-colors disabled:opacity-60"
              >
                <Send className="w-4 h-4" />
                {submitting ? "Mengirim..." : "Kirim Pesan"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </StorefrontLayout>
  );
}
