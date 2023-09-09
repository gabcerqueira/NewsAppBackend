import { BadRequestException } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ErrorMessages } from 'src/shared/messages/ErrorMessages';

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true, collection: 'Categories' })
export class Category {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ type: Boolean, default: true })
  active: boolean;

  _id: Types.ObjectId | string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

/*
CategorySchema.pre(
  'findByIdAndDelete' as any,
  async function (this, next: Function) {
    const newsCount = await this.$model('News').countDocuments({
      category: this._id,
    });
    if (newsCount > 0) {
      console.log('passaste aq ne PRE');
      throw new BadRequestException(
        ErrorMessages.category.CANNOT_DELETE_CATEGORY_WITH_NEWS,
      );
    }
    next();
  },
);

*/
