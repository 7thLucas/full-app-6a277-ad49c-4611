import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { StorefrontLayout } from "~/components/haifa/StorefrontLayout";
import { useConfigurables } from "~/modules/configurables";

export const meta: MetaFunction = () => [
  { title: "Koleksi — Haifa Official Store" },
];

export default function CollectionsPage() {
  const { config } = useConfigurables();

  const collections = config?.featuredCollections || [
    { name: "Kerudung Premium", count: "48 Produk", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", slug: "kerudung" },
    { name: "Gamis", count: "32 Produk", image: "https://images.unsplash.com/photo-1529111290557-82f6d5c6cf85?w=800&q=80", slug: "gamis" },
    { name: "Palestine Series", count: "16 Produk", image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800&q=80", slug: "palestine" },
    { name: "Aksesoris Hijab", count: "24 Produk", image: "https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=800&q=80", slug: "aksesoris" },
  ];

  return (
    <StorefrontLayout>
      <div className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="font-body text-xs uppercase tracking-widest text-haifa-clay">Koleksi Kami</span>
            <h1 className="font-display text-3xl md:text-5xl mt-2 text-haifa-charcoal">
              Semua <em className="italic text-haifa-clay">Koleksi</em>
            </h1>
            <p className="font-body text-sm text-muted-foreground mt-3 max-w-md mx-auto">
              Temukan koleksi busana muslimah premium pilihan Haifa untuk berbagai kesempatan
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {collections.map((col, i) => (
              <Link
                key={col.slug}
                to={`/shop?category=${col.slug}`}
                className="group relative rounded-3xl overflow-hidden aspect-[16/9] block reveal"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <img
                  src={col.image}
                  alt={col.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div>
                    <p className="font-display italic text-white text-2xl md:text-3xl">{col.name}</p>
                    <p className="font-body text-xs text-white/70 mt-1">{col.count}</p>
                  </div>
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-haifa-clay transition-colors">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </StorefrontLayout>
  );
}
