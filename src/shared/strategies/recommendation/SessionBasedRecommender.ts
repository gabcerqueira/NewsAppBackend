import { News } from 'src/news/schema/news.schema';
import { Recommender } from './Recommender';
import { UserProfile } from 'src/user-profile/schema/user-profile.schema';

export class SessionBasedRecommender implements Recommender {
  execute(userProfile: UserProfile): News[] {
    // data collection (clicks,userReadingTime,rated,categories,)

    //SessionId

    //Data Processing

    //Data splitting

    //

    return [];
  }
}
