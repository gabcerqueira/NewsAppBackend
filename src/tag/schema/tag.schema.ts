import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TagDocument = Tag & Document;

@Schema({ timestamps: true, collection: 'tags' })
export class Tag {
  @Prop({ required: true, unique: true })
  value: string;

  @Prop({ type: Boolean, default: true })
  active: boolean;

  _id: Types.ObjectId | string;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
