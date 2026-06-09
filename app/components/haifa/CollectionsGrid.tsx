import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { useConfigurables } from "~/modules/configurables";

export function CollectionsGrid() {
  const { config } = useConfigurables();

  const collections = config?.featuredCollections || [
    {
      name: "Kerudung Premium",
      count: "48 Produk",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
      slug: "kerudung",
    },
    {
      name: "Gamis",
      count: "32 Produk",
      image: "https://images.unsplash.com/photo-1529111290557-82f6d5c6cf85?w=600&q=80",
      slug: "gamis",
    },
    {
      name: "Palestine Series",
      count: "16 Produk",
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=600&q=80",
      slug: "palestine",
    },
    {
      name: "Aksesoris Hijab",
      count: "24 Produk",
      image: "https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=600&q=80",
      slug: "aksesoris",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 reveal">
          <span className="font-body text-xs uppercase tracking-widest text-haifa-clay">Koleksi Kami</span>
          <h2 className="font-display text-3xl md:text-4xl mt-2 text-haifa-charcoal">
            Jelajahi <em className="text-haifa-clay italic">Koleksi</em>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {collections.map((col, i) => (
            <Link
              key={col.slug}
              to={`/shop?category=${col.slug}`}
              className="collection-card relative rounded-2xl overflow-hidden aspect-[3/4] block reveal"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <img
                src={col.image}
                alt={col.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="font-display italic text-white text-lg md:text-xl">{col.name}</p>
                <p className="font-body text-xs text-white/70 mt-0.5">{col.count}</p>
              </div>
              <div className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="w-4 h-4 text-white" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
