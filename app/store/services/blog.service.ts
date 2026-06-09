import type { Request, Response } from "express";
import { BlogPostModel } from "../models/blog.model";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export async function listPosts(req: Request, res: Response) {
  try {
    const { page = "1", limit = "9", category, search } = req.query as Record<string, string>;
    const filter: Record<string, any> = { status: "published" };
    if (category) filter.category = category;
    if (search) filter.title = { $regex: search, $options: "i" };

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const [posts, total] = await Promise.all([
      BlogPostModel.find(filter, { content: 0 }).sort({ publishedAt: -1 }).skip(skip).limit(limitNum).lean(),
      BlogPostModel.countDocuments(filter),
    ]);

    res.json({ success: true, data: posts, total, page: pageNum, pages: Math.ceil(total / limitNum) });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to fetch posts" });
  }
}

export async function getPost(req: Request, res: Response) {
  try {
    const post = await BlogPostModel.findOne({ slug: req.params.slug, status: "published" }).lean();
    if (!post) return res.status(404).json({ success: false, error: "Post not found" });
    res.json({ success: true, data: post });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to fetch post" });
  }
}

export async function adminListPosts(req: Request, res: Response) {
  try {
    const { page = "1", limit = "20", search, status } = req.query as Record<string, string>;
    const filter: Record<string, any> = {};
    if (search) filter.title = { $regex: search, $options: "i" };
    if (status) filter.status = status;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const [posts, total] = await Promise.all([
      BlogPostModel.find(filter, { content: 0 }).sort({ createdAt: -1 }).skip(skip).limit(limitNum).lean(),
      BlogPostModel.countDocuments(filter),
    ]);

    res.json({ success: true, data: posts, total, page: pageNum, pages: Math.ceil(total / limitNum) });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to fetch posts" });
  }
}

export async function createPost(req: Request, res: Response) {
  try {
    const body = req.body;
    if (!body.slug) body.slug = generateSlug(body.title) + "-" + Date.now();
    if (body.status === "published" && !body.publishedAt) body.publishedAt = new Date();

    const post = await BlogPostModel.create(body);
    res.status(201).json({ success: true, data: post });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
}

export async function updatePost(req: Request, res: Response) {
  try {
    const body = req.body;
    if (body.status === "published" && !body.publishedAt) body.publishedAt = new Date();

    const post = await BlogPostModel.findByIdAndUpdate(req.params.id, body, { new: true });
    if (!post) return res.status(404).json({ success: false, error: "Post not found" });
    res.json({ success: true, data: post });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
}

export async function deletePost(req: Request, res: Response) {
  try {
    await BlogPostModel.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to delete post" });
  }
}
