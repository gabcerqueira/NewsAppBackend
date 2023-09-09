import { UserProfile } from '../schema/user-profile.schema';

export interface IuserProfileRepository {
  create(userProfile: UserProfile): Promise<UserProfile>;

  findById(id: string): Promise<UserProfile | null>;

  findAll(): Promise<UserProfile[] | null>;

  update(userProfile: UserProfile): Promise<UserProfile | null>;

  remove(id: string): Promise<boolean>;
}
