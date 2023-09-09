import { News } from 'src/news/schema/news.schema';
import { UserProfile } from 'src/user-profile/schema/user-profile.schema';

export interface Recommender {
  execute(userProfile: UserProfile): Array<News>;
}
