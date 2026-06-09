import { Router } from "express";
import { requireAdmin } from "~/modules/authentication/authentication.middleware";
import * as ProductCtrl from "../services/product.service";
import * as OrderCtrl from "../services/order.service";
import * as BlogCtrl from "../services/blog.service";
import * as PromoCtrl from "../services/promo.service";
import * as NewsletterCtrl from "../services/newsletter.service";

const router = Router();

// ─── Products (Public) ──────────────────────────────────────────────────────
router.get("/api/store/products", ProductCtrl.listProducts);
router.get("/api/store/products/:slug", ProductCtrl.getProduct);
router.post("/api/store/products/:id/reviews", ProductCtrl.addReview);
router.post("/api/store/products/stock-notify", ProductCtrl.stockNotify);

// ─── Products (Admin) ───────────────────────────────────────────────────────
router.get("/api/admin/products", requireAdmin, ProductCtrl.adminListProducts);
router.post("/api/admin/products", requireAdmin, ProductCtrl.createProduct);
router.put("/api/admin/products/:id", requireAdmin, ProductCtrl.updateProduct);
router.delete("/api/admin/products/:id", requireAdmin, ProductCtrl.deleteProduct);

// ─── Orders (Public) ────────────────────────────────────────────────────────
router.post("/api/store/orders", OrderCtrl.createOrder);
router.get("/api/store/orders/track/:orderNumber", OrderCtrl.trackOrder);

// ─── Orders (Admin) ─────────────────────────────────────────────────────────
router.get("/api/admin/orders", requireAdmin, OrderCtrl.listOrders);
router.get("/api/admin/orders/:id", requireAdmin, OrderCtrl.getOrder);
router.put("/api/admin/orders/:id", requireAdmin, OrderCtrl.updateOrder);
router.get("/api/admin/dashboard/stats", requireAdmin, OrderCtrl.getDashboardStats);

// ─── Blog (Public) ──────────────────────────────────────────────────────────
router.get("/api/store/blog", BlogCtrl.listPosts);
router.get("/api/store/blog/:slug", BlogCtrl.getPost);

// ─── Blog (Admin) ───────────────────────────────────────────────────────────
router.get("/api/admin/blog", requireAdmin, BlogCtrl.adminListPosts);
router.post("/api/admin/blog", requireAdmin, BlogCtrl.createPost);
router.put("/api/admin/blog/:id", requireAdmin, BlogCtrl.updatePost);
router.delete("/api/admin/blog/:id", requireAdmin, BlogCtrl.deletePost);

// ─── Promos (Public) ────────────────────────────────────────────────────────
router.post("/api/store/promos/validate", PromoCtrl.validatePromo);
router.get("/api/store/promos/flash-sale", PromoCtrl.getActiveFlashSale);

// ─── Promos (Admin) ─────────────────────────────────────────────────────────
router.get("/api/admin/promos", requireAdmin, PromoCtrl.listPromos);
router.post("/api/admin/promos", requireAdmin, PromoCtrl.createPromo);
router.put("/api/admin/promos/:id", requireAdmin, PromoCtrl.updatePromo);
router.delete("/api/admin/promos/:id", requireAdmin, PromoCtrl.deletePromo);

// ─── Newsletter ──────────────────────────────────────────────────────────────
router.post("/api/store/newsletter", NewsletterCtrl.subscribe);
router.get("/api/admin/newsletter", requireAdmin, NewsletterCtrl.listSubscribers);

export default router;
