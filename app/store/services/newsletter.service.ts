import type { Request, Response } from "express";
import { NewsletterModel } from "../models/newsletter.model";

function generateDiscountCode(): string {
  return "HAIFA" + Math.random().toString(36).substr(2, 6).toUpperCase();
}

export async function subscribe(req: Request, res: Response) {
  try {
    const { email, name } = req.body;
    if (!email) return res.status(400).json({ success: false, error: "Email is required" });

    const existing = await NewsletterModel.findOne({ email });
    if (existing) {
      return res.json({
        success: true,
        message: "Email sudah terdaftar! Gunakan kode diskon Anda.",
        discountCode: existing.discountCode,
      });
    }

    const discountCode = generateDiscountCode();
    await NewsletterModel.create({ email, name, discountCode });

    res.json({
      success: true,
      message: "Selamat! Anda berhasil berlangganan newsletter Haifa.",
      discountCode,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: "Failed to subscribe" });
  }
}

export async function listSubscribers(req: Request, res: Response) {
  try {
    const subscribers = await NewsletterModel.find().sort({ createdAt: -1 }).lean();
    res.json({ success: true, data: subscribers });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to fetch subscribers" });
  }
}
