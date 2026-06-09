import { prop, getModelForClass, modelOptions } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

@modelOptions({
  schemaOptions: {
    collection: "tbl_newsletters",
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: true,
  },
})
export class Newsletter extends TimeStamps {
  @prop({ type: String, required: true, unique: true })
  email!: string;

  @prop({ type: String, required: false })
  name?: string;

  @prop({ type: Boolean, required: true, default: true })
  isActive!: boolean;

  @prop({ type: String, required: false })
  discountCode?: string;

  @prop({ type: Date, required: false })
  discountUsedAt?: Date;
}

export const NewsletterModel = getModelForClass(Newsletter);
