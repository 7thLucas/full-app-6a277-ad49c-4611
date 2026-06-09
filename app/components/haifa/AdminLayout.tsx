import { type ReactNode, useState } from "react";
import { Link, useLocation, useFetcher } from "react-router";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  FileText,
  Tag,
  Settings,
  Home,
  Menu,
  X,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "~/modules/authentication/use-authentication";

const NAV_ITEMS = [
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/products", icon: Package, label: "Produk" },
  { href: "/admin/orders", icon: ShoppingCart, label: "Pesanan" },
  { href: "/admin/blog", icon: FileText, label: "Blog" },
  { href: "/admin/promos", icon: Tag, label: "Promo" },
  { href: "/admin/settings", icon: Settings, label: "Pengaturan" },
];

interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
}

export function AdminLayout({ children, title }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  const fetcher = useFetcher();

  const isActive = (href: string) => location.pathname.startsWith(href);

  const handleLogout = () => {
    fetcher.submit(null, { method: "POST", action: "/auth/logout" });
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-body">
      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-60 bg-white border-r border-border z-50 transform transition-transform duration-300 flex flex-col ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:z-auto`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
              <rect width="36" height="36" rx="8" fill="#B17457" />
              <text x="18" y="26" textAnchor="middle" fill="white" fontFamily="'DM Serif Display', serif" fontSize="20" fontStyle="italic">H</text>
            </svg>
            <span className="font-display italic text-haifa-clay text-xl">haifa</span>
          </Link>
          <button
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 overflow-y-auto">
          <ul className="space-y-1">
            {NAV_ITEMS.map(({ href, icon: Icon, label }) => (
              <li key={href}>
                <Link
                  to={href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                    isActive(href)
                      ? "bg-haifa-cream text-haifa-clay font-medium"
                      : "text-haifa-charcoal hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {label}
                  {isActive(href) && <ChevronRight className="w-3 h-3 ml-auto" />}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-4 pt-4 border-t border-border">
            <Link
              to="/"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:bg-gray-50 transition-all"
            >
              <Home className="w-4 h-4" />
              Lihat Storefront
            </Link>
          </div>
        </nav>

        {/* User */}
        <div className="p-3 border-t border-border">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 bg-haifa-clay rounded-full flex items-center justify-center text-white text-xs font-medium shrink-0">
              {user?.username?.charAt(0).toUpperCase() || "A"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-haifa-charcoal truncate">{user?.username || "Admin"}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email || ""}</p>
            </div>
            <button
              onClick={handleLogout}
              className="text-muted-foreground hover:text-red-500 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-border px-4 sm:px-6 h-14 flex items-center gap-4 sticky top-0 z-30">
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5 text-haifa-charcoal" />
          </button>
          {title && (
            <h1 className="font-body font-medium text-haifa-charcoal text-base">{title}</h1>
          )}
        </header>

        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
