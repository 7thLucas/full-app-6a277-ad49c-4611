import { prop, getModelForClass, modelOptions, index } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export class ProductVariant {
  @prop({ type: String, required: true })
  color!: string;

  @prop({ type: String, required: true })
  colorHex!: string;

  @prop({ type: String, required: true })
  size!: string;

  @prop({ type: Number, required: true, default: 0 })
  stock!: number;

  @prop({ type: String, required: false })
  sku?: string;
}

export class ProductReview {
  @prop({ type: String, required: true })
  reviewerName!: string;

  @prop({ type: String, required: false })
  reviewerAvatar?: string;

  @prop({ type: Number, required: true, min: 1, max: 5 })
  rating!: number;

  @prop({ type: String, required: true })
  comment!: string;

  @prop({ type: () => [String], default: [] })
  photos!: string[];

  @prop({ type: Date, required: true, default: () => new Date() })
  createdAt!: Date;

  @prop({ type: String, required: false })
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
  @prop({ type: String, required: true })
  name!: string;

  @prop({ type: String, required: true, unique: true })
  slug!: string;

  @prop({ type: String, required: true })
  description!: string;

  @prop({ type: String, required: false })
  materialCare?: string;

  @prop({ type: Number, required: true })
  price!: number;

  @prop({ type: Number, required: false })
  originalPrice?: number;

  @prop({ type: String, required: true })
  category!: string;

  @prop({ type: String, required: false })
  subcategory?: string;

  @prop({ type: () => [String], default: [] })
  images!: string[];

  @prop({ type: () => [ProductVariant], default: [] })
  variants!: ProductVariant[];

  @prop({ type: () => [ProductReview], default: [] })
  reviews!: ProductReview[];

  @prop({ type: String, required: false, enum: ["best-seller", "new", "sale", ""] })
  badge?: string;

  @prop({ type: String, required: true, default: "published", enum: ["draft", "published"] })
  status!: string;

  @prop({ type: Boolean, required: false, default: false })
  isPalestineSeries?: boolean;

  @prop({ type: Number, required: false, default: 0 })
  soldCount?: number;

  @prop({ type: Number, required: false })
  weight?: number;

  @prop({ type: () => [String], default: [] })
  tags?: string[];

  @prop({ type: String, required: false })
  metaTitle?: string;

  @prop({ type: String, required: false })
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
