// Import global routes
import routes from "./routes";
import { initializeModels } from "./models";
import storeRoutes from "../store/routes/store.routes";
import { Router } from "express";

// Initialize models
await initializeModels();
// Register store models
await import("../store/models/product.model");
await import("../store/models/order.model");
await import("../store/models/promo.model");
await import("../store/models/blog.model");
await import("../store/models/newsletter.model");

const combinedRouter = Router();
combinedRouter.use(routes);
combinedRouter.use(storeRoutes);

export default combinedRouter;
