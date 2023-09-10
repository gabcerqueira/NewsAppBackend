import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Schema as MongoSchema, Types } from 'mongoose';
import { Category } from 'src/category/schema/category.schema';
import { News } from 'src/news/schema/news.schema';

export type UserProfileDocument = UserProfile & Document;

@Schema({ timestamps: true, collection: 'userProfiles' })
export class UserProfile {
  @ApiProperty()
  @Prop({
    required: true,
    index: true,
    unique: true,
    type: MongoSchema.Types.ObjectId,
  })
  userId: Types.ObjectId | string;

  @ApiProperty()
  @Prop({ type: Boolean, default: true })
  active: boolean;

  //params : NewsId && time in ms
  @ApiProperty()
  @Prop({ type: Map, of: Number, default: new Map<string, number>() })
  userReadingTime: Map<string, number>;

  //params : NewsId && rate  1 to 5
  @ApiProperty()
  @Prop({ type: Map, of: Number, default: new Map<string, number>() })
  ratedNews: Map<string, number>;

  @ApiProperty()
  @Prop({ type: [MongoSchema.Types.ObjectId], default: [], ref: () => News })
  likedNews: News[];

  @ApiProperty()
  @Prop({ type: [MongoSchema.Types.ObjectId], default: [], ref: () => News })
  clickedNews: News[];

  @ApiProperty()
  @Prop({ type: [MongoSchema.Types.ObjectId], default: [], ref: () => News })
  readedNews: News[];

  @ApiProperty()
  @Prop({
    type: [MongoSchema.Types.ObjectId],
    default: [],
    ref: () => Category,
  })
  categories: Category[];

  @ApiProperty()
  _id: Types.ObjectId | string;
}

export const UserProfileSchema = SchemaFactory.createForClass(UserProfile);
