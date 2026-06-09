import { useState } from "react";
import { useConfigurables } from "~/modules/configurables";
import { useToast } from "./Toast";
import { Mail, ArrowRight } from "lucide-react";

export function NewsletterSection() {
  const { config } = useConfigurables();
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const discount = config?.newsletterDiscount || 15;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/store/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setDone(true);
        if (data.discountCode) {
          showToast(`Kode diskon Anda: ${data.discountCode}`, "success");
        }
      } else {
        showToast("Terjadi kesalahan. Coba lagi.", "error");
      }
    } catch {
      showToast("Terjadi kesalahan. Coba lagi.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-haifa-charcoal relative overflow-hidden">
      {/* Keffiyeh divider at top */}
      <div className="absolute top-0 left-0 right-0 keffiyeh-divider" />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <div className="reveal">
          <Mail className="w-10 h-10 text-haifa-peach mx-auto mb-4" />
          <h2 className="font-display text-3xl md:text-4xl text-white">
            Dapatkan Diskon{" "}
            <em className="text-haifa-peach italic">{discount}%</em>
          </h2>
          <p className="font-body text-sm text-white/70 mt-3 leading-relaxed">
            Daftar newsletter Haifa dan dapatkan diskon {discount}% untuk pembelian pertama Anda.
            Plus update koleksi terbaru dan eksklusif langsung ke inbox Anda.
          </p>
        </div>

        {done ? (
          <div className="mt-8 bg-white/10 rounded-2xl p-6 reveal">
            <p className="font-display italic text-white text-xl">Terima kasih!</p>
            <p className="font-body text-sm text-white/70 mt-2">
              Cek email Anda untuk kode diskon {discount}%.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 reveal" style={{ transitionDelay: "100ms" }}>
            <div className="flex items-center gap-0 bg-white rounded-full overflow-hidden shadow-lg max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan email Anda..."
                className="flex-1 px-5 py-3.5 text-sm font-body text-haifa-charcoal outline-none bg-transparent placeholder:text-muted-foreground"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-haifa-clay text-white px-5 py-3.5 hover:bg-haifa-peach-dark transition-colors flex items-center gap-2 font-body text-sm font-medium disabled:opacity-60"
              >
                {loading ? "..." : (
                  <>
                    Daftar
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
            <p className="font-body text-xs text-white/40 mt-3">
              Kami tidak akan spam. Berhenti berlangganan kapan saja.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
