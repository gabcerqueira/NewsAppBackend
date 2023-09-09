import { Types } from 'mongoose';
import { User } from '../schema/user.schema';
import { News } from 'src/news/schema/news.schema';
import { UserProfile } from 'src/user-profile/schema/user-profile.schema';

type SanitizedClass = Pick<
  User,
  '_id' | 'name' | 'active' | 'email' | 'userProfile'
>;

export class SanitizedUser implements SanitizedClass {
  userProfile: UserProfile;
  _id: Types.ObjectId | string;
  name: string;
  active: boolean;
  email: string;
}
