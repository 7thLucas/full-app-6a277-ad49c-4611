import { prop, getModelForClass, modelOptions } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export class OrderItem {
  @prop({ required: true })
  productId!: string;

  @prop({ required: true })
  productName!: string;

  @prop({ required: false })
  productImage?: string;

  @prop({ required: true })
  variant!: string;

  @prop({ required: true })
  price!: number;

  @prop({ required: true, min: 1 })
  quantity!: number;

  @prop({ required: true })
  subtotal!: number;
}

export class ShippingAddress {
  @prop({ required: true })
  fullName!: string;

  @prop({ required: true })
  phone!: string;

  @prop({ required: true })
  addressLine!: string;

  @prop({ required: true })
  city!: string;

  @prop({ required: true })
  province!: string;

  @prop({ required: true })
  postalCode!: string;
}

@modelOptions({
  schemaOptions: {
    collection: "tbl_orders",
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: true,
  },
})
export class Order extends TimeStamps {
  @prop({ required: true, unique: true })
  orderNumber!: string;

  @prop({ required: false })
  userId?: string;

  @prop({ required: true })
  buyerName!: string;

  @prop({ required: false })
  buyerEmail?: string;

  @prop({ required: true })
  buyerPhone!: string;

  @prop({ type: () => ShippingAddress, required: true })
  shippingAddress!: ShippingAddress;

  @prop({ type: () => [OrderItem], required: true })
  items!: OrderItem[];

  @prop({ required: true })
  subtotal!: number;

  @prop({ required: true, default: 0 })
  shippingCost!: number;

  @prop({ required: false, default: 0 })
  discount!: number;

  @prop({ required: true })
  total!: number;

  @prop({ required: false })
  promoCode?: string;

  @prop({
    required: true,
    enum: ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"],
    default: "pending",
  })
  status!: string;

  @prop({
    required: true,
    enum: ["transfer-bank", "qris", "cod"],
    default: "transfer-bank",
  })
  paymentMethod!: string;

  @prop({ required: false, enum: ["pending", "paid", "failed"], default: "pending" })
  paymentStatus?: string;

  @prop({ required: false })
  courierName?: string;

  @prop({ required: false })
  trackingNumber?: string;

  @prop({ required: false })
  shippingService?: string;

  @prop({ required: false })
  estimatedDelivery?: string;

  @prop({ required: false })
  notes?: string;

  @prop({ required: false })
  adminNotes?: string;

  @prop({ required: false })
  referralCode?: string;
}

export const OrderModel = getModelForClass(Order);
