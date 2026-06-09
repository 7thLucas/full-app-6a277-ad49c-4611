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
  @prop({ type: String, required: true })
  title!: string;

  @prop({ type: String, required: true, unique: true })
  slug!: string;

  @prop({ type: String, required: true })
  content!: string;

  @prop({ type: String, required: false })
  excerpt?: string;

  @prop({ type: String, required: false })
  thumbnail?: string;

  @prop({ type: String, required: false })
  category?: string;

  @prop({ type: String, required: false })
  author?: string;

  @prop({ type: String, required: true, default: "draft", enum: ["draft", "published"] })
  status!: string;

  @prop({ type: Date, required: false })
  publishedAt?: Date;

  @prop({ type: String, required: false })
  metaTitle?: string;

  @prop({ type: String, required: false })
  metaDescription?: string;

  @prop({ type: () => [String], default: [] })
  tags?: string[];
}

export const BlogPostModel = getModelForClass(BlogPost);
