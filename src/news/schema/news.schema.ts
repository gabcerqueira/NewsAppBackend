import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongoSchema, Types } from 'mongoose';
import { Category } from 'src/category/schema/category.schema';
import { Tag } from 'src/tag/schema/tag.schema';

export type NewsDocument = News & Document;

@Schema({ timestamps: true, collection: 'news' })
export class News {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  subtitle: string;

  @Prop({ required: true })
  body: string;

  @Prop({ required: true })
  images: string[];

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  source: string;

  @Prop({ type: MongoSchema.Types.ObjectId, ref: () => Category })
  category: Category;

  @Prop({ type: MongoSchema.Types.ObjectId, ref: () => Tag })
  tags: Tag[];

  @Prop({ type: Boolean, default: true })
  active: boolean;

  _id: Types.ObjectId | string;
}

export const NewsSchema = SchemaFactory.createForClass(News);
