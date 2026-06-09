import { Link } from "react-router";
import { Check } from "lucide-react";
import { useConfigurables } from "~/modules/configurables";

export function PalestineSection() {
  const { config } = useConfigurables();
  const donationPct = config?.palestineDonationPercent || 10;

  const checkpoints = [
    `${donationPct}% dari setiap penjualan untuk donasi kemanusiaan Palestina`,
    "Motif keffiyeh eksklusif — simbol solidaritas abadi",
    "Material premium lokal pilihan tangan",
    "Mendukung pengrajin lokal Indonesia",
  ];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Keffiyeh pattern bg */}
      <div className="absolute inset-0 keffiyeh-pattern opacity-40" />
      <div className="absolute inset-0 bg-haifa-offwhite/80" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div className="reveal">
            <span className="font-body text-xs uppercase tracking-widest text-haifa-clay">
              Palestine × Haifa
            </span>
            <h2 className="font-display text-3xl md:text-4xl mt-2 text-haifa-charcoal leading-tight">
              Mode yang{" "}
              <em className="text-haifa-clay italic">Bermakna</em>
            </h2>
            <p
              className="font-arabic text-2xl text-haifa-clay mt-3 text-right"
              dir="rtl"
            >
              فلسطين في قلبنا
            </p>
            <p className="font-body text-sm text-muted-foreground mt-4 leading-relaxed">
              Setiap produk Palestine Series kami bukan sekadar busana — ini adalah pernyataan
              solidaritas. Kami percaya fashion bisa menjadi jembatan kebaikan.
            </p>

            <ul className="mt-6 space-y-3">
              {checkpoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-haifa-clay/15 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-haifa-clay" />
                  </div>
                  <span className="font-body text-sm text-haifa-charcoal">{point}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/shop?category=palestine"
              className="inline-flex btn-primary mt-8 font-body text-sm"
            >
              Lihat Koleksi Palestine
            </Link>
          </div>

          {/* Right: Photo with keffiyeh border */}
          <div className="reveal" style={{ transitionDelay: "150ms" }}>
            <div className="relative">
              {/* Keffiyeh border decoration */}
              <div
                className="absolute -inset-3 rounded-3xl opacity-40"
                style={{
                  background: "repeating-linear-gradient(45deg, rgba(192,57,43,0.15) 0px, rgba(192,57,43,0.15) 4px, transparent 4px, transparent 14px), repeating-linear-gradient(-45deg, rgba(192,57,43,0.15) 0px, rgba(192,57,43,0.15) 4px, transparent 4px, transparent 14px)",
                }}
              />
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=600&q=80"
                  alt="Palestine Series Collection"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                  <p className="font-display italic text-white text-xl">Palestine Series</p>
                  <p className="font-body text-xs text-haifa-peach mt-1">
                    {donationPct}% dari keuntungan untuk donasi
                  </p>
                </div>
              </div>

              {/* Badge */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-haifa-clay rounded-full flex flex-col items-center justify-center text-white shadow-lg">
                <span className="font-body text-xs font-bold">{donationPct}%</span>
                <span className="font-body text-[9px] text-center leading-tight">Donasi<br />Palestina</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
