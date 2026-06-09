import type { Request, Response } from "express";
import { PromoModel } from "../models/promo.model";

export async function validatePromo(req: Request, res: Response) {
  try {
    const { code, cartTotal } = req.body;
    const now = new Date();

    const promo = await PromoModel.findOne({
      code: code.toUpperCase(),
      isActive: true,
      startDate: { $lte: now },
      endDate: { $gte: now },
    }).lean();

    if (!promo) {
      return res.status(404).json({ success: false, error: "Kode promo tidak valid atau sudah kedaluwarsa." });
    }

    if (promo.maxUsage && promo.usedCount && promo.usedCount >= promo.maxUsage) {
      return res.status(400).json({ success: false, error: "Kode promo sudah habis digunakan." });
    }

    if (promo.minPurchase && cartTotal < promo.minPurchase) {
      return res.status(400).json({
        success: false,
        error: `Minimum pembelian Rp${promo.minPurchase.toLocaleString("id-ID")} untuk kode ini.`,
      });
    }

    let discountAmount = 0;
    if (promo.type === "percentage") {
      discountAmount = Math.floor(cartTotal * (promo.discountValue! / 100));
      if (promo.maxDiscount) discountAmount = Math.min(discountAmount, promo.maxDiscount);
    } else if (promo.type === "fixed") {
      discountAmount = promo.discountValue || 0;
    } else if (promo.type === "free-shipping") {
      discountAmount = 0; // handled at frontend
    }

    res.json({
      success: true,
      data: {
        code: promo.code,
        type: promo.type,
        discountValue: promo.discountValue,
        discountAmount,
        name: promo.name,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to validate promo" });
  }
}

export async function getActiveFlashSale(req: Request, res: Response) {
  try {
    const now = new Date();
    const flashSale = await PromoModel.findOne({
      type: "flash-sale",
      isActive: true,
      startDate: { $lte: now },
      endDate: { $gte: now },
    }).lean();

    res.json({ success: true, data: flashSale || null });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to fetch flash sale" });
  }
}

export async function listPromos(req: Request, res: Response) {
  try {
    const promos = await PromoModel.find().sort({ createdAt: -1 }).lean();
    res.json({ success: true, data: promos });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to fetch promos" });
  }
}

export async function createPromo(req: Request, res: Response) {
  try {
    const body = req.body;
    body.code = body.code.toUpperCase();
    const promo = await PromoModel.create(body);
    res.status(201).json({ success: true, data: promo });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
}

export async function updatePromo(req: Request, res: Response) {
  try {
    const promo = await PromoModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!promo) return res.status(404).json({ success: false, error: "Promo not found" });
    res.json({ success: true, data: promo });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
}

export async function deletePromo(req: Request, res: Response) {
  try {
    await PromoModel.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Promo deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to delete promo" });
  }
}
