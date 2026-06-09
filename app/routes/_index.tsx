import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { StorefrontLayout } from "~/components/haifa/StorefrontLayout";
import { HeroSection } from "~/components/haifa/HeroSection";
import { MarqueeBar } from "~/components/haifa/MarqueeBar";
import { CollectionsGrid } from "~/components/haifa/CollectionsGrid";
import { FeaturedProducts } from "~/components/haifa/FeaturedProducts";
import { PalestineSection } from "~/components/haifa/PalestineSection";
import { StatsSection } from "~/components/haifa/StatsSection";
import { NewsletterSection } from "~/components/haifa/NewsletterSection";

export const meta: MetaFunction = () => {
  return [
    { title: "Haifa Official Store — Anggun dalam Iman, Indah dalam Hijab" },
    {
      name: "description",
      content:
        "Toko busana muslimah premium terpercaya. Kerudung, Gamis, Palestine Series. Free ongkir se-Indonesia.",
    },
    { property: "og:title", content: "Haifa Official Store" },
    {
      property: "og:description",
      content: "Busana muslimah premium untuk wanita Indonesia yang anggun dan beriman.",
    },
  ];
};

export default function Index() {
  return (
    <StorefrontLayout>
      <HeroSection />
      <MarqueeBar />
      <CollectionsGrid />
      <FeaturedProducts />

      {/* Editorial Banner */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1529111290557-82f6d5c6cf85?w=1400&q=80"
          alt="Editorial"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-haifa-charcoal/80 to-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h2 className="font-display text-2xl md:text-4xl text-white italic">
            Modest Fashion Tanpa Kompromi
          </h2>
          <p className="font-body text-sm text-white/80 mt-2 max-w-md">
            Tampil memukau dengan koleksi eksklusif yang memadukan keanggunan dan kesyariatan
          </p>
          <Link
            to="/shop"
            className="mt-5 btn-primary font-body text-sm"
          >
            Belanja Koleksi Terbaru
          </Link>
        </div>
      </section>

      <PalestineSection />
      <StatsSection />
      <NewsletterSection />
    </StorefrontLayout>
  );
}
