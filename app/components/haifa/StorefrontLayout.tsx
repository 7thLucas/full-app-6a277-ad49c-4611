import { type ReactNode, useEffect } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CartProvider } from "./CartContext";
import { WishlistProvider } from "./WishlistContext";
import { ToastProvider } from "./Toast";

interface StorefrontLayoutProps {
  children: ReactNode;
  hideFooter?: boolean;
}

export function StorefrontLayout({ children, hideFooter = false }: StorefrontLayoutProps) {
  // Custom cursor (desktop only)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const dot = document.createElement("div");
    dot.className = "custom-cursor-dot";
    document.body.appendChild(dot);

    const ring = document.createElement("div");
    ring.className = "custom-cursor-ring";
    document.body.appendChild(ring);

    let ringX = 0;
    let ringY = 0;
    let dotX = 0;
    let dotY = 0;
    let animFrame: number;

    const onMove = (e: MouseEvent) => {
      dotX = e.clientX;
      dotY = e.clientY;
    };

    const animate = () => {
      dot.style.left = dotX + "px";
      dot.style.top = dotY + "px";

      ringX += (dotX - ringX) * 0.15;
      ringY += (dotY - ringY) * 0.15;
      ring.style.left = ringX + "px";
      ring.style.top = ringY + "px";

      animFrame = requestAnimationFrame(animate);
    };

    const onHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "A" || target.tagName === "BUTTON" || target.closest("a") || target.closest("button")) {
        ring.classList.add("hover");
      } else {
        ring.classList.remove("hover");
      }
    };

    // Only show custom cursor on desktop
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    if (mediaQuery.matches) {
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseover", onHover);
      document.body.style.cursor = "none";
      animFrame = requestAnimationFrame(animate);
    }

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onHover);
      document.body.style.cursor = "";
      cancelAnimationFrame(animFrame);
      if (dot.parentNode) dot.parentNode.removeChild(dot);
      if (ring.parentNode) ring.parentNode.removeChild(ring);
    };
  }, []);

  // Scroll reveal observer
  useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    const revealEls = document.querySelectorAll(".reveal");
    revealEls.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <CartProvider>
      <WishlistProvider>
        <ToastProvider>
          <div className="min-h-screen bg-background">
            <Navbar />
            <main>{children}</main>
            {!hideFooter && <Footer />}
          </div>
        </ToastProvider>
      </WishlistProvider>
    </CartProvider>
  );
}
