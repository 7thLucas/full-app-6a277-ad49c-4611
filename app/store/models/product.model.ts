import { prop, getModelForClass, modelOptions, index } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export class ProductVariant {
  @prop({ required: true })
  color!: string;

  @prop({ required: true })
  colorHex!: string;

  @prop({ required: true })
  size!: string;

  @prop({ required: true, default: 0 })
  stock!: number;

  @prop({ required: false })
  sku?: string;
}

export class ProductReview {
  @prop({ required: true })
  reviewerName!: string;

  @prop({ required: false })
  reviewerAvatar?: string;

  @prop({ required: true, min: 1, max: 5 })
  rating!: number;

  @prop({ required: true })
  comment!: string;

  @prop({ type: () => [String], default: [] })
  photos!: string[];

  @prop({ required: true, default: () => new Date() })
  createdAt!: Date;

  @prop({ required: false })
  orderId?: string;
}

@modelOptions({
  schemaOptions: {
    collection: "tbl_products",
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: true,
  },
})
@index({ name: "text", description: "text" })
export class Product extends TimeStamps {
  @prop({ required: true })
  name!: string;

  @prop({ required: true, unique: true })
  slug!: string;

  @prop({ required: true })
  description!: string;

  @prop({ required: false })
  materialCare?: string;

  @prop({ required: true })
  price!: number;

  @prop({ required: false })
  originalPrice?: number;

  @prop({ required: true })
  category!: string;

  @prop({ required: false })
  subcategory?: string;

  @prop({ type: () => [String], default: [] })
  images!: string[];

  @prop({ type: () => [ProductVariant], default: [] })
  variants!: ProductVariant[];

  @prop({ type: () => [ProductReview], default: [] })
  reviews!: ProductReview[];

  @prop({ required: false, enum: ["best-seller", "new", "sale", ""] })
  badge?: string;

  @prop({ required: true, default: "published", enum: ["draft", "published"] })
  status!: string;

  @prop({ required: false, default: false })
  isPalestineSeries?: boolean;

  @prop({ required: false, default: 0 })
  soldCount?: number;

  @prop({ required: false })
  weight?: number;

  @prop({ type: () => [String], default: [] })
  tags?: string[];

  @prop({ required: false })
  metaTitle?: string;

  @prop({ required: false })
  metaDescription?: string;

  get totalStock(): number {
    return this.variants.reduce((sum, v) => sum + v.stock, 0);
  }

  get avgRating(): number {
    if (!this.reviews.length) return 0;
    return this.reviews.reduce((sum, r) => sum + r.rating, 0) / this.reviews.length;
  }
}

export const ProductModel = getModelForClass(Product);
