import type { Request, Response } from "express";
import { ProductModel } from "../models/product.model";

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export async function listProducts(req: Request, res: Response) {
  try {
    const {
      category,
      search,
      minPrice,
      maxPrice,
      size,
      color,
      inStock,
      sort = "createdAt",
      order = "desc",
      page = "1",
      limit = "12",
    } = req.query as Record<string, string>;

    const filter: Record<string, any> = { status: "published" };

    if (category && category !== "all") {
      filter.category = { $regex: category, $options: "i" };
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (size) {
      filter["variants.size"] = size;
    }
    if (color) {
      filter["variants.color"] = { $regex: color, $options: "i" };
    }
    if (inStock === "true") {
      filter["variants.stock"] = { $gt: 0 };
    }

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(48, parseInt(limit));
    const skip = (pageNum - 1) * limitNum;

    const sortObj: Record<string, 1 | -1> = {};
    if (sort === "price") {
      sortObj.price = order === "asc" ? 1 : -1;
    } else if (sort === "soldCount") {
      sortObj.soldCount = -1;
    } else {
      sortObj.createdAt = -1;
    }

    const [products, total] = await Promise.all([
      ProductModel.find(filter).sort(sortObj).skip(skip).limit(limitNum).lean(),
      ProductModel.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: products,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to fetch products" });
  }
}

export async function getProduct(req: Request, res: Response) {
  try {
    const product = await ProductModel.findOne({ slug: req.params.slug, status: "published" }).lean();
    if (!product) {
      return res.status(404).json({ success: false, error: "Product not found" });
    }
    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to fetch product" });
  }
}

export async function addReview(req: Request, res: Response) {
  try {
    const { reviewerName, rating, comment, photos, orderId } = req.body;
    if (!reviewerName || !rating || !comment) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    const product = await ProductModel.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, error: "Product not found" });

    product.reviews.push({
      reviewerName,
      rating: Math.min(5, Math.max(1, Number(rating))),
      comment,
      photos: photos || [],
      createdAt: new Date(),
      orderId,
    });
    await product.save();

    res.json({ success: true, message: "Review added" });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to add review" });
  }
}

export async function stockNotify(req: Request, res: Response) {
  try {
    const { email, productId } = req.body;
    // Simply acknowledge — full email notification would use the email module
    res.json({ success: true, message: "You will be notified when this product is back in stock." });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to register notification" });
  }
}

// Admin
export async function adminListProducts(req: Request, res: Response) {
  try {
    const { search, category, status, page = "1", limit = "20" } = req.query as Record<string, string>;
    const filter: Record<string, any> = {};
    if (search) filter.name = { $regex: search, $options: "i" };
    if (category) filter.category = category;
    if (status) filter.status = status;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const [products, total] = await Promise.all([
      ProductModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limitNum).lean(),
      ProductModel.countDocuments(filter),
    ]);

    res.json({ success: true, data: products, total, page: pageNum, pages: Math.ceil(total / limitNum) });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to fetch products" });
  }
}

export async function createProduct(req: Request, res: Response) {
  try {
    const body = req.body;
    if (!body.slug) {
      body.slug = generateSlug(body.name) + "-" + Date.now();
    }
    const product = await ProductModel.create(body);
    res.status(201).json({ success: true, data: product });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    const product = await ProductModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ success: false, error: "Product not found" });
    res.json({ success: true, data: product });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    await ProductModel.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to delete product" });
  }
}
