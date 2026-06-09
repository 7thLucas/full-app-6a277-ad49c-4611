import type { Request, Response } from "express";
import { OrderModel } from "../models/order.model";

function generateOrderNumber(): string {
  const date = new Date();
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, "");
  const random = Math.random().toString(36).substr(2, 6).toUpperCase();
  return `HF-${dateStr}-${random}`;
}

export async function createOrder(req: Request, res: Response) {
  try {
    const body = req.body;
    body.orderNumber = generateOrderNumber();

    const subtotal = body.items.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    );
    body.subtotal = subtotal;
    body.total = subtotal + (body.shippingCost || 0) - (body.discount || 0);
    body.items = body.items.map((item: any) => ({
      ...item,
      subtotal: item.price * item.quantity,
    }));

    const order = await OrderModel.create(body);
    res.status(201).json({ success: true, data: { orderNumber: order.orderNumber, id: order.id } });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
}

export async function trackOrder(req: Request, res: Response) {
  try {
    const order = await OrderModel.findOne(
      { orderNumber: req.params.orderNumber },
      { adminNotes: 0 }
    ).lean();
    if (!order) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }
    res.json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to track order" });
  }
}

export async function listOrders(req: Request, res: Response) {
  try {
    const { status, page = "1", limit = "20", search } = req.query as Record<string, string>;
    const filter: Record<string, any> = {};
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { orderNumber: { $regex: search, $options: "i" } },
        { buyerName: { $regex: search, $options: "i" } },
        { buyerPhone: { $regex: search, $options: "i" } },
      ];
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const [orders, total] = await Promise.all([
      OrderModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limitNum).lean(),
      OrderModel.countDocuments(filter),
    ]);

    res.json({ success: true, data: orders, total, page: pageNum, pages: Math.ceil(total / limitNum) });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to fetch orders" });
  }
}

export async function getOrder(req: Request, res: Response) {
  try {
    const order = await OrderModel.findById(req.params.id).lean();
    if (!order) return res.status(404).json({ success: false, error: "Order not found" });
    res.json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to fetch order" });
  }
}

export async function updateOrder(req: Request, res: Response) {
  try {
    const order = await OrderModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!order) return res.status(404).json({ success: false, error: "Order not found" });
    res.json({ success: true, data: order });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
}

export async function getDashboardStats(req: Request, res: Response) {
  try {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    // 30-day range for chart
    const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    const [
      todayOrders,
      monthOrders,
      totalOrders,
      statusCounts,
      recentOrders,
    ] = await Promise.all([
      OrderModel.find({ createdAt: { $gte: startOfDay } }).lean(),
      OrderModel.find({ createdAt: { $gte: startOfMonth } }).lean(),
      OrderModel.countDocuments(),
      OrderModel.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ]),
      OrderModel.find().sort({ createdAt: -1 }).limit(5).lean(),
    ]);

    const revenueByDay = await OrderModel.aggregate([
      { $match: { createdAt: { $gte: thirtyDaysAgo }, status: { $ne: "cancelled" } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          revenue: { $sum: "$total" },
          orders: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const todayRevenue = todayOrders
      .filter((o) => o.status !== "cancelled")
      .reduce((sum, o) => sum + o.total, 0);

    const monthRevenue = monthOrders
      .filter((o) => o.status !== "cancelled")
      .reduce((sum, o) => sum + o.total, 0);

    res.json({
      success: true,
      data: {
        todayRevenue,
        monthRevenue,
        totalOrders,
        statusCounts,
        recentOrders,
        revenueByDay,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to fetch stats" });
  }
}
