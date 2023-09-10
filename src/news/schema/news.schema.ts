import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Schema as MongoSchema, Types } from 'mongoose';
import { Category } from 'src/category/schema/category.schema';
import { Tag } from 'src/tag/schema/tag.schema';

export type NewsDocument = News & Document;

@Schema({ timestamps: true, collection: 'news' })
export class News {
  @ApiProperty()
  @Prop({ required: true })
  title: string;

  @ApiProperty()
  @Prop({ required: true })
  subtitle: string;

  @ApiProperty()
  @Prop({ required: true })
  body: string;

  @ApiProperty()
  @Prop({ required: true })
  images: string[];

  @ApiProperty()
  @Prop({ required: true })
  date: string;

  @ApiProperty()
  @Prop({ required: true })
  source: string;

  @ApiProperty()
  @Prop({ type: MongoSchema.Types.ObjectId, ref: () => Category })
  category: Category;

  @ApiProperty()
  @Prop({ type: MongoSchema.Types.ObjectId, ref: () => Tag })
  tags: Tag[];

  @ApiProperty()
  @Prop({ type: Boolean, default: true })
  active: boolean;

  @ApiProperty()
  _id: Types.ObjectId | string;
}

export const NewsSchema = SchemaFactory.createForClass(News);
