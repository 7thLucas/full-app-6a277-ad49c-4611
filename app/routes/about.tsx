import type { MetaFunction } from "react-router";
import { StorefrontLayout } from "~/components/haifa/StorefrontLayout";
import { useConfigurables } from "~/modules/configurables";
import { Heart, Star, Package } from "lucide-react";

export const meta: MetaFunction = () => [
  { title: "Tentang Kami — Haifa Official Store" },
];

export default function AboutPage() {
  const { config } = useConfigurables();

  return (
    <StorefrontLayout>
      <div className="pt-24 pb-20">
        {/* Hero */}
        <div className="relative h-60 md:h-80 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1529111290557-82f6d5c6cf85?w=1400&q=80"
            alt="Tentang Haifa"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h1 className="font-display text-3xl md:text-5xl text-white italic">Tentang Kami</h1>
            <p className="font-body text-sm text-white/80 mt-2">
              {config?.appName || "Haifa Official Store"}
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12">
          {/* Brand Story */}
          <div className="text-center reveal">
            <p
              className="font-arabic text-2xl text-haifa-clay mb-4"
              dir="rtl"
            >
              {config?.subTaglineArabic || "الحجاب نور، والنور جمال"}
            </p>
            <p className="font-body text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {config?.aboutStory ||
                "Haifa Official Store hadir untuk wanita Muslim Indonesia yang mendambakan tampilan anggun dan elegan. Kami percaya bahwa hijab bukan hanya kewajiban agama, tetapi juga ekspresi keindahan dan identitas diri. Setiap produk kami dirancang dengan cinta dan perhatian penuh terhadap detail, menggunakan material premium pilihan yang nyaman dan berkualitas."}
            </p>
          </div>

          {/* Values */}
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                icon: Heart,
                title: "Cinta & Dedikasi",
                desc: "Setiap produk dibuat dengan penuh cinta dan perhatian terhadap detail kualitas.",
              },
              {
                icon: Star,
                title: "Premium Quality",
                desc: "Kami hanya menggunakan bahan terbaik yang lulus seleksi ketat dari tim kami.",
              },
              {
                icon: Package,
                title: "Fast Delivery",
                desc: "Pengiriman ke seluruh Indonesia dengan layanan terpercaya dan tepat waktu.",
              },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div
                key={title}
                className="text-center bg-white rounded-2xl p-6 border border-border reveal"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-12 h-12 bg-haifa-cream rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-haifa-clay" />
                </div>
                <h3 className="font-display italic text-xl text-haifa-charcoal mb-2">{title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* Palestine commitment */}
          <div className="bg-haifa-charcoal rounded-3xl p-8 text-center reveal">
            <p className="font-arabic text-3xl text-haifa-peach mb-4" dir="rtl">فلسطين في قلبنا</p>
            <h3 className="font-display italic text-2xl text-white">Komitmen Kami untuk Palestina</h3>
            <p className="font-body text-sm text-white/70 mt-3 max-w-lg mx-auto leading-relaxed">
              {config?.palestineDonationPercent || 10}% dari setiap penjualan koleksi Palestine Series kami
              disumbangkan untuk bantuan kemanusiaan Palestina. Bersama-sama, fashion bisa menjadi
              jembatan kebaikan.
            </p>
          </div>
        </div>
      </div>
    </StorefrontLayout>
  );
}
