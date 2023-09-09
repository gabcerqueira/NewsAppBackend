import { Types } from 'mongoose';
import { News } from 'src/news/schema/news.schema';
import { UserProfile } from '../schema/user-profile.schema';
import { Category } from 'src/category/schema/category.schema';

type SanitizedClass = Pick<
  UserProfile,
  | '_id'
  | 'userId'
  | 'active'
  | 'clickedNews'
  | 'likedNews'
  | 'ratedNews'
  | 'readedNews'
  | 'userReadingTime'
  | 'categories'
>;

export class SanitizedUserProfile implements SanitizedClass {
  categories: Category[];
  clickedNews: News[];
  userId: string;
  likedNews: News[];
  ratedNews: Map<string, number>;
  readedNews: News[];
  userReadingTime: Map<string, number>;
  _id: Types.ObjectId | string;
  name: string;
  active: boolean;
  email: string;
}
