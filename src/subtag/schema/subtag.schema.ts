import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SubtagDocument = Subtag & Document;

@Schema({ timestamps: true, collection: 'Subtags' })
export class Subtag {
  @Prop({ required: true, unique: true })
  value: string;

  @Prop({ type: Boolean, default: true })
  active: boolean;

  _id: Types.ObjectId | string;
}

export const SubtagSchema = SchemaFactory.createForClass(Subtag);
