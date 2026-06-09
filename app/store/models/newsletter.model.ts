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
  @prop({ required: true, unique: true })
  email!: string;

  @prop({ required: false })
  name?: string;

  @prop({ required: true, default: true })
  isActive!: boolean;

  @prop({ required: false })
  discountCode?: string;

  @prop({ required: false })
  discountUsedAt?: Date;
}

export const NewsletterModel = getModelForClass(Newsletter);
