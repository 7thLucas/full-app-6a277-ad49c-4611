import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

interface WishlistItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  slug: string;
}

interface WishlistContextValue {
  items: WishlistItem[];
  count: number;
  toggle: (item: WishlistItem) => void;
  isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);
const WISHLIST_KEY = "haifa_wishlist";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_KEY);
      if (saved) setItems(JSON.parse(saved));
    } catch {}
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
  }, [items, mounted]);

  const toggle = useCallback((item: WishlistItem) => {
    setItems((prev) => {
      const exists = prev.find((i) => i.productId === item.productId);
      if (exists) return prev.filter((i) => i.productId !== item.productId);
      return [...prev, item];
    });
  }, []);

  const isInWishlist = useCallback(
    (productId: string) => items.some((i) => i.productId === productId),
    [items]
  );

  return (
    <WishlistContext.Provider value={{ items, count: items.length, toggle, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
