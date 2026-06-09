import { prop, getModelForClass, modelOptions } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

@modelOptions({
  schemaOptions: {
    collection: "tbl_blog_posts",
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: true,
  },
})
export class BlogPost extends TimeStamps {
  @prop({ required: true })
  title!: string;

  @prop({ required: true, unique: true })
  slug!: string;

  @prop({ required: true })
  content!: string;

  @prop({ required: false })
  excerpt?: string;

  @prop({ required: false })
  thumbnail?: string;

  @prop({ required: false })
  category?: string;

  @prop({ required: false })
  author?: string;

  @prop({ required: true, default: "draft", enum: ["draft", "published"] })
  status!: string;

  @prop({ required: false })
  publishedAt?: Date;

  @prop({ required: false })
  metaTitle?: string;

  @prop({ required: false })
  metaDescription?: string;

  @prop({ type: () => [String], default: [] })
  tags?: string[];
}

export const BlogPostModel = getModelForClass(BlogPost);
