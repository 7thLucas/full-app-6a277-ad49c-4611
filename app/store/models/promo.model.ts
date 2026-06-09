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
  @prop({ required: true, unique: true })
  code!: string;

  @prop({ required: true })
  name!: string;

  @prop({ required: false })
  description?: string;

  @prop({
    required: true,
    enum: ["percentage", "fixed", "free-shipping", "flash-sale", "buy-x-get-y"],
  })
  type!: string;

  @prop({ required: false, default: 0 })
  discountValue?: number;

  @prop({ required: false, default: 0 })
  minPurchase?: number;

  @prop({ required: false })
  maxDiscount?: number;

  @prop({ required: false, default: 0 })
  maxUsage?: number;

  @prop({ required: false, default: 0 })
  usedCount?: number;

  @prop({ required: true })
  startDate!: Date;

  @prop({ required: true })
  endDate!: Date;

  @prop({ required: true, default: true })
  isActive!: boolean;

  @prop({ type: () => [String], default: [] })
  applicableProducts?: string[];

  @prop({ required: false })
  flashSaleProductId?: string;

  @prop({ required: false })
  flashSalePrice?: number;

  @prop({ required: false })
  buyQuantity?: number;

  @prop({ required: false })
  getQuantity?: number;
}

export const PromoModel = getModelForClass(Promo);
