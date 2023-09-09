import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongoSchema, Types } from 'mongoose';
import { News } from 'src/news/schema/news.schema';
import { UserProfile } from 'src/user-profile/schema/user-profile.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: true, collection: 'users' })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({
    required: true,
    index: true,
    unique: true,
  })
  email: string;

  @Prop()
  password?: string;

  @Prop({ type: Boolean, default: true })
  active: boolean;

  /*

    @Prop({ type: MongoSchema.Types.ObjectId, ref: () => News }) // Defina a referência à categoria
  favoriteNews: News[];

  @Prop({ type: MongoSchema.Types.ObjectId, ref: () => News }) // Defina a referência à categoria
  likedNews: News[];




    */
  @Prop({ type: MongoSchema.Types.ObjectId, ref: () => UserProfile }) // Defina a referência à categoria
  userProfile: UserProfile;

  _id: Types.ObjectId | string;
}

export const UserSchema = SchemaFactory.createForClass(User);
