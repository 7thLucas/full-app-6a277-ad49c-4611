import type { MetaFunction } from "react-router";
import { StorefrontLayout } from "~/components/haifa/StorefrontLayout";

export const meta: MetaFunction = () => [
  { title: "Lookbook — Haifa Official Store" },
];

const LOOKBOOK_IMAGES = [
  { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", alt: "Lookbook 1", span: "row-span-2" },
  { src: "https://images.unsplash.com/photo-1529111290557-82f6d5c6cf85?w=600&q=80", alt: "Lookbook 2" },
  { src: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=600&q=80", alt: "Lookbook 3" },
  { src: "https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=600&q=80", alt: "Lookbook 4", span: "col-span-2" },
  { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", alt: "Lookbook 5" },
  { src: "https://images.unsplash.com/photo-1529111290557-82f6d5c6cf85?w=600&q=80", alt: "Lookbook 6", span: "row-span-2" },
  { src: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=600&q=80", alt: "Lookbook 7" },
  { src: "https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=600&q=80", alt: "Lookbook 8" },
];

export default function LookbookPage() {
  return (
    <StorefrontLayout>
      <div className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 reveal">
            <span className="font-body text-xs uppercase tracking-widest text-haifa-clay">Visual Story</span>
            <h1 className="font-display text-3xl md:text-4xl mt-2 text-haifa-charcoal">
              Lookbook <em className="italic text-haifa-clay">2025</em>
            </h1>
            <p className="font-body text-sm text-muted-foreground mt-3">
              Inspirasi gaya busana muslimah premium dari koleksi terbaru Haifa
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[200px]">
            {LOOKBOOK_IMAGES.map((img, i) => (
              <div
                key={i}
                className={`rounded-2xl overflow-hidden reveal ${img.span || ""}`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </StorefrontLayout>
  );
}
