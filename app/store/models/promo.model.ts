import { prop, getModelForClass, modelOptions } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

@modelOptions({
  schemaOptions: {
    collection: "tbl_promos",
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: true,
  },
})
export class Promo extends TimeStamps {
  @prop({ type: String, required: true, unique: true })
  code!: string;

  @prop({ type: String, required: true })
  name!: string;

  @prop({ type: String, required: false })
  description?: string;

  @prop({
    type: String,
    required: true,
    enum: ["percentage", "fixed", "free-shipping", "flash-sale", "buy-x-get-y"],
  })
  type!: string;

  @prop({ type: Number, required: false, default: 0 })
  discountValue?: number;

  @prop({ type: Number, required: false, default: 0 })
  minPurchase?: number;

  @prop({ type: Number, required: false })
  maxDiscount?: number;

  @prop({ type: Number, required: false, default: 0 })
  maxUsage?: number;

  @prop({ type: Number, required: false, default: 0 })
  usedCount?: number;

  @prop({ type: Date, required: true })
  startDate!: Date;

  @prop({ type: Date, required: true })
  endDate!: Date;

  @prop({ type: Boolean, required: true, default: true })
  isActive!: boolean;

  @prop({ type: () => [String], default: [] })
  applicableProducts?: string[];

  @prop({ type: String, required: false })
  flashSaleProductId?: string;

  @prop({ type: Number, required: false })
  flashSalePrice?: number;

  @prop({ type: Number, required: false })
  buyQuantity?: number;

  @prop({ type: Number, required: false })
  getQuantity?: number;
}

export const PromoModel = getModelForClass(Promo);
