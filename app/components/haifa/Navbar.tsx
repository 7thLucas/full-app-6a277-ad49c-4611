import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Home,
  Grid3x3,
  User,
} from "lucide-react";
import { useCart } from "./CartContext";
import { useWishlist } from "./WishlistContext";
import { useConfigurables } from "~/modules/configurables";

function HaifaLogo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`} aria-label="Haifa Official Store">
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="36" height="36" rx="8" fill="#B17457" />
        <text
          x="18"
          y="26"
          textAnchor="middle"
          fill="white"
          fontFamily="'DM Serif Display', serif"
          fontSize="20"
          fontStyle="italic"
        >
          H
        </text>
      </svg>
      <span
        className="font-display text-2xl italic"
        style={{ color: "#B17457", letterSpacing: "-0.02em" }}
      >
        haifa
      </span>
    </Link>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { count: cartCount } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { config, loading } = useConfigurables();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  const navLinks = config?.navLinks || [
    { label: "Beranda", href: "/" },
    { label: "Koleksi", href: "/collections" },
    { label: "Produk", href: "/shop" },
    { label: "Palestine Series", href: "/shop?category=palestine" },
    { label: "Tentang Kami", href: "/about" },
  ];

  const isActive = (href: string) =>
    href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);

  return (
    <>
      {/* Main Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-[24px] shadow-sm border-b border-border"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Left: Hamburger (mobile) + Logo */}
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 rounded-lg hover:bg-haifa-cream transition-colors"
              onClick={() => setDrawerOpen(true)}
              aria-label="Buka menu"
            >
              <Menu className="w-5 h-5 text-haifa-charcoal" />
            </button>
            <HaifaLogo />
          </div>

          {/* Center: Desktop nav links */}
          <ul className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className={`font-body text-sm font-medium transition-colors relative group ${
                    isActive(link.href)
                      ? "text-haifa-clay"
                      : "text-haifa-charcoal hover:text-haifa-clay"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-haifa-clay transition-all duration-200 ${
                      isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* Right: Icons */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-lg hover:bg-haifa-cream transition-colors hidden md:flex"
              aria-label="Cari produk"
            >
              <Search className="w-5 h-5 text-haifa-charcoal" />
            </button>
            <Link
              to="/wishlist"
              className="p-2 rounded-lg hover:bg-haifa-cream transition-colors relative hidden md:flex"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5 text-haifa-charcoal" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-haifa-clay text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount > 9 ? "9+" : wishlistCount}
                </span>
              )}
            </Link>
            <Link
              to="/cart"
              className="p-2 rounded-lg hover:bg-haifa-cream transition-colors relative flex"
              aria-label="Keranjang"
            >
              <ShoppingBag className="w-5 h-5 text-haifa-charcoal" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-haifa-clay text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </Link>
          </div>
        </nav>

        {/* Search bar overlay */}
        {searchOpen && (
          <div className="bg-white border-t border-border px-4 py-3 shadow-md">
            <div className="max-w-2xl mx-auto flex items-center gap-3">
              <Search className="w-5 h-5 text-muted-foreground shrink-0" />
              <input
                type="text"
                placeholder="Cari produk, koleksi..."
                className="flex-1 bg-transparent text-sm font-body outline-none placeholder:text-muted-foreground"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchQuery.trim()) {
                    window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`;
                  }
                }}
                autoFocus
              />
              <button onClick={() => setSearchOpen(false)} aria-label="Tutup">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Drawer Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50 md:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 transform transition-transform duration-300 md:hidden shadow-2xl ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <HaifaLogo />
          <button
            onClick={() => setDrawerOpen(false)}
            className="p-2 rounded-lg hover:bg-haifa-cream transition-colors"
            aria-label="Tutup menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-5">
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className={`flex items-center px-3 py-3 rounded-xl font-body text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? "bg-haifa-cream text-haifa-clay"
                      : "text-haifa-charcoal hover:bg-haifa-cream/60"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-6 pt-6 border-t border-border">
            <Link
              to="/shop?search="
              className="flex items-center gap-3 px-3 py-3 rounded-xl text-haifa-charcoal hover:bg-haifa-cream/60 font-body text-sm"
            >
              <Search className="w-4 h-4" />
              Cari Produk
            </Link>
            <Link
              to="/wishlist"
              className="flex items-center gap-3 px-3 py-3 rounded-xl text-haifa-charcoal hover:bg-haifa-cream/60 font-body text-sm relative"
            >
              <Heart className="w-4 h-4" />
              Wishlist
              {wishlistCount > 0 && (
                <span className="ml-auto w-5 h-5 bg-haifa-clay text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
          </div>
        </nav>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border z-30 md:hidden">
        <div className="flex items-center">
          {[
            { href: "/", icon: Home, label: "Beranda" },
            { href: "/collections", icon: Grid3x3, label: "Koleksi" },
            { href: "/shop", icon: Search, label: "Cari", onClick: () => {} },
            { href: "/wishlist", icon: Heart, label: "Wishlist", badge: wishlistCount },
            { href: "/cart", icon: ShoppingBag, label: "Keranjang", badge: cartCount },
          ].map(({ href, icon: Icon, label, badge }) => (
            <Link
              key={href}
              to={href}
              className={`flex-1 flex flex-col items-center py-2 gap-0.5 relative transition-colors ${
                isActive(href) ? "text-haifa-clay" : "text-muted-foreground"
              }`}
              aria-label={label}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {badge && badge > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-haifa-clay text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {badge > 9 ? "9+" : badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-body">{label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
