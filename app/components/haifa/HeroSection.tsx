import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { ChevronDown, Star, Package, Shield } from "lucide-react";
import { useConfigurables } from "~/modules/configurables";

export function HeroSection() {
  const { config } = useConfigurables();
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const rotateY = mousePos.x * 8;
  const rotateX = -mousePos.y * 5;

  const heroImage = config?.heroImage ||
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80";

  return (
    <section className="relative min-h-screen flex items-end md:items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Haifa Collection"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 md:bg-gradient-to-r md:from-black/70 md:via-black/30 md:to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full pb-16 pt-24 md:py-24">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left: Text Content */}
          <div className="space-y-5">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 animate-slideUp">
              <span className="w-8 h-0.5 bg-haifa-peach" />
              <span className="font-body text-xs font-500 uppercase tracking-widest text-haifa-peach">
                New Collection 2025
              </span>
            </div>

            {/* Main Heading */}
            <h1
              className="font-display text-4xl sm:text-5xl lg:text-6xl text-white leading-tight animate-slideUp"
              style={{ animationDelay: "0.1s" }}
            >
              {config?.heroHeading ? (
                config.heroHeading
              ) : (
                <>
                  Tampil{" "}
                  <em className="text-haifa-peach not-italic">Anggun</em>
                  <br />
                  dalam Balutan
                  <br />
                  <em className="text-haifa-peach">Fashion Muslim</em>
                </>
              )}
            </h1>

            {/* Arabic subtitle */}
            <p
              className="font-arabic text-xl text-haifa-peach/90 animate-slideUp"
              style={{ animationDelay: "0.2s", direction: "rtl" }}
            >
              {config?.subTaglineArabic || "الحجاب نور، والنور جمال"}
            </p>

            {/* Description */}
            <p
              className="font-body text-sm text-white/80 leading-relaxed max-w-sm animate-slideUp"
              style={{ animationDelay: "0.3s" }}
            >
              {config?.tagline || "Koleksi busana muslimah premium dengan material terbaik dan desain eksklusif untuk wanita Indonesia yang anggun."}
            </p>

            {/* CTAs */}
            <div
              className="flex flex-wrap items-center gap-3 animate-slideUp"
              style={{ animationDelay: "0.4s" }}
            >
              <Link
                to="/shop"
                className="btn-primary font-body text-sm"
              >
                {config?.heroCTAPrimary || "Belanja Sekarang"}
              </Link>
              <Link
                to="/collections"
                className="btn-ghost text-white border-white/50 hover:bg-white/10 hover:text-white font-body text-sm"
              >
                {config?.heroCTASecondary || "Lihat Koleksi"}
              </Link>
            </div>

            {/* Trust chips */}
            <div
              className="flex flex-wrap gap-2 animate-slideUp"
              style={{ animationDelay: "0.5s" }}
            >
              {[
                { icon: Star, label: "4.9/5 Rating" },
                { icon: Package, label: "Free Ongkir" },
                { icon: Shield, label: "100% Original" },
              ].map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white/90 text-xs font-body px-3 py-1.5 rounded-full border border-white/20"
                >
                  <Icon className="w-3 h-3 text-haifa-peach" />
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Right: 3D Product Card */}
          <div className="hidden md:flex justify-center items-center perspective-1000">
            <div
              ref={cardRef}
              className="relative w-64 rounded-3xl overflow-hidden shadow-2xl border border-white/10"
              style={{
                transform: `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
                transition: "transform 0.1s ease",
                transformStyle: "preserve-3d",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&q=80"
                alt="Featured Product"
                className="w-full aspect-[3/4] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="font-display italic text-white text-lg">Kerudung Voile</p>
                <p className="font-body text-xs text-haifa-peach">Palestine Series</p>
                <p className="font-body text-sm font-medium text-white mt-1">Rp 185.000</p>
              </div>
              <span className="absolute top-3 left-3 bg-haifa-clay text-white text-[10px] font-body px-2 py-0.5 rounded-full">
                Best Seller
              </span>
            </div>

            {/* Floating chips */}
            <div className="absolute top-1/4 right-16 float-chip-1">
              <span className="bg-white shadow-lg text-haifa-charcoal text-xs font-body px-3 py-2 rounded-full flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-400 rounded-full" />
                12K+ Pelanggan
              </span>
            </div>
            <div className="absolute top-1/3 right-4 float-chip-2">
              <span className="bg-haifa-clay text-white text-xs font-body px-3 py-2 rounded-full">
                Premium Quality
              </span>
            </div>
            <div className="absolute top-2/3 right-20 float-chip-3">
              <span className="bg-white shadow-lg text-haifa-charcoal text-xs font-body px-3 py-2 rounded-full">
                Free Ongkir
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50 animate-bounce">
        <span className="font-body text-[10px] uppercase tracking-widest">Scroll</span>
        <ChevronDown className="w-4 h-4" />
      </div>
    </section>
  );
}
