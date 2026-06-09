import { Link } from "react-router";
import { Instagram, MessageCircle } from "lucide-react";
import { useConfigurables } from "~/modules/configurables";

export function Footer() {
  const { config } = useConfigurables();

  const appName = config?.appName || "Haifa Official Store";
  const tagline = config?.tagline || "Anggun dalam Iman, Indah dalam Hijab";
  const whatsapp = config?.whatsappNumber || "6281234567890";
  const instagram = config?.instagramHandle || "@haifa.official";
  const email = config?.email || "hello@haifaofficial.com";

  return (
    <footer className="bg-haifa-charcoal text-white pt-16 pb-24 md:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
                <rect width="36" height="36" rx="8" fill="#E8A98A" />
                <text x="18" y="26" textAnchor="middle" fill="white" fontFamily="'DM Serif Display', serif" fontSize="20" fontStyle="italic">H</text>
              </svg>
              <span className="font-display text-2xl italic text-haifa-peach">haifa</span>
            </div>
            <p className="font-body text-sm text-white/70 leading-relaxed max-w-xs">
              {config?.aboutStory?.slice(0, 120) ||
                "Busana muslimah premium untuk wanita Indonesia yang anggun dan beriman."}
              {(config?.aboutStory?.length || 0) > 120 && "..."}
            </p>
            <p className="font-arabic text-base text-haifa-peach mt-3 text-right">
              {config?.subTaglineArabic || "الحجاب نور، والنور جمال"}
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href={`https://instagram.com/${instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 hover:bg-haifa-clay rounded-full flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={`https://tiktok.com/@${(config?.tiktokHandle || "@haifa.official").replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 hover:bg-haifa-clay rounded-full flex items-center justify-center transition-colors text-xs font-bold"
                aria-label="TikTok"
              >
                TT
              </a>
            </div>
          </div>

          {/* Produk */}
          <div>
            <h4 className="font-body font-600 text-sm uppercase tracking-wider mb-4 text-white/90">
              Produk
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Kerudung Premium", href: "/shop?category=kerudung" },
                { label: "Gamis", href: "/shop?category=gamis" },
                { label: "Palestine Series", href: "/shop?category=palestine" },
                { label: "Aksesoris Hijab", href: "/shop?category=aksesoris" },
                { label: "Semua Produk", href: "/shop" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="font-body text-sm text-white/60 hover:text-haifa-peach transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Informasi */}
          <div>
            <h4 className="font-body font-600 text-sm uppercase tracking-wider mb-4 text-white/90">
              Informasi
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Tentang Kami", href: "/about" },
                { label: "Blog", href: "/blog" },
                { label: "Lookbook", href: "/lookbook" },
                { label: "Panduan Ukuran", href: "/size-guide" },
                { label: "Palestine × Haifa", href: "/shop?category=palestine" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="font-body text-sm text-white/60 hover:text-haifa-peach transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Bantuan */}
          <div>
            <h4 className="font-body font-600 text-sm uppercase tracking-wider mb-4 text-white/90">
              Bantuan
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Lacak Pesanan", href: "/track" },
                { label: "Hubungi Kami", href: "/contact" },
                { label: "Kebijakan Pengiriman", href: "/shipping-policy" },
                { label: "Kebijakan Pengembalian", href: "/return-policy" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="font-body text-sm text-white/60 hover:text-haifa-peach transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 space-y-1">
              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm text-haifa-peach hover:text-white transition-colors flex items-center gap-1"
              >
                <MessageCircle className="w-3 h-3" />
                WhatsApp
              </a>
              <a
                href={`mailto:${email}`}
                className="font-body text-sm text-white/60 hover:text-haifa-peach transition-colors block"
              >
                {email}
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-sm text-white/40">
            &copy; {new Date().getFullYear()} {appName}. Semua hak dilindungi.
          </p>
          <p className="font-body text-sm text-white/40">
            Dibuat dengan cinta untuk wanita Muslim Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}
