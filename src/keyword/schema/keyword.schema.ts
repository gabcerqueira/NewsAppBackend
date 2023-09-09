import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type KeywordDocument = Keyword & Document;

@Schema({ timestamps: true, collection: 'keyworlds' })
export class Keyword {
  @Prop({ required: true, unique: true })
  value: string;

  @Prop({ type: Boolean, default: true })
  active: boolean;

  _id: Types.ObjectId | string;
}

export const KeywordSchema = SchemaFactory.createForClass(Keyword);
