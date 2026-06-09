import { prop, getModelForClass, modelOptions } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export class OrderItem {
  @prop({ type: String, required: true })
  productId!: string;

  @prop({ type: String, required: true })
  productName!: string;

  @prop({ type: String, required: false })
  productImage?: string;

  @prop({ type: String, required: true })
  variant!: string;

  @prop({ type: Number, required: true })
  price!: number;

  @prop({ type: Number, required: true, min: 1 })
  quantity!: number;

  @prop({ type: Number, required: true })
  subtotal!: number;
}

export class ShippingAddress {
  @prop({ type: String, required: true })
  fullName!: string;

  @prop({ type: String, required: true })
  phone!: string;

  @prop({ type: String, required: true })
  addressLine!: string;

  @prop({ type: String, required: true })
  city!: string;

  @prop({ type: String, required: true })
  province!: string;

  @prop({ type: String, required: true })
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
  @prop({ type: String, required: true, unique: true })
  orderNumber!: string;

  @prop({ type: String, required: false })
  userId?: string;

  @prop({ type: String, required: true })
  buyerName!: string;

  @prop({ type: String, required: false })
  buyerEmail?: string;

  @prop({ type: String, required: true })
  buyerPhone!: string;

  @prop({ type: () => ShippingAddress, required: true })
  shippingAddress!: ShippingAddress;

  @prop({ type: () => [OrderItem], required: true })
  items!: OrderItem[];

  @prop({ type: Number, required: true })
  subtotal!: number;

  @prop({ type: Number, required: true, default: 0 })
  shippingCost!: number;

  @prop({ type: Number, required: false, default: 0 })
  discount!: number;

  @prop({ type: Number, required: true })
  total!: number;

  @prop({ type: String, required: false })
  promoCode?: string;

  @prop({
    type: String,
    required: true,
    enum: ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"],
    default: "pending",
  })
  status!: string;

  @prop({
    type: String,
    required: true,
    enum: ["transfer-bank", "qris", "cod"],
    default: "transfer-bank",
  })
  paymentMethod!: string;

  @prop({ type: String, required: false, enum: ["pending", "paid", "failed"], default: "pending" })
  paymentStatus?: string;

  @prop({ type: String, required: false })
  courierName?: string;

  @prop({ type: String, required: false })
  trackingNumber?: string;

  @prop({ type: String, required: false })
  shippingService?: string;

  @prop({ type: String, required: false })
  estimatedDelivery?: string;

  @prop({ type: String, required: false })
  notes?: string;

  @prop({ type: String, required: false })
  adminNotes?: string;

  @prop({ type: String, required: false })
  referralCode?: string;
}

export const OrderModel = getModelForClass(Order);
