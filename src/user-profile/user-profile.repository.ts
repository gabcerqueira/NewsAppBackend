import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hash } from 'bcrypt';
import { ErrorMessages } from 'src/shared/messages/ErrorMessages';
import { UserProfile, UserProfileDocument } from './schema/user-profile.schema';
import { IuserProfileRepository } from './interfaces/IuserProfileRepository';

@Injectable()
export class UserProfileRepository implements IuserProfileRepository {
  constructor(
    @InjectModel(UserProfile.name)
    private userProfileModel: Model<UserProfileDocument>,
  ) {}

  async create(userProfile: UserProfile): Promise<UserProfile> {
    try {
      const newUserProfile = new this.userProfileModel({
        ...userProfile,
      });
      return await newUserProfile.save();
    } catch (error) {
      console.log(error.message);
      throw new Error(ErrorMessages.userProfile.ERROR_CREATING_USER_PROFILE);
    }
  }

  async findAll() {
    try {
      const userProfiles: Array<UserProfile> = await this.userProfileModel
        .find()
        .exec();

      return userProfiles;
    } catch (error) {
      console.log(error.message);
      throw new Error(ErrorMessages.userProfile.USER_PROFILE_NOT_FOUND);
    }
  }

  async findById(id: string): Promise<UserProfile | null> {
    try {
      return this.userProfileModel.findById(id).exec();
    } catch (error) {
      throw new Error(ErrorMessages.userProfile.USER_PROFILE_NOT_FOUND);
    }
  }

  async update(userProfile: UserProfile): Promise<UserProfile | null> {
    try {
      return this.userProfileModel
        .findByIdAndUpdate(userProfile._id, userProfile, { new: true })
        .exec();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      let userProfile: UserProfile | null = await this.userProfileModel
        .findByIdAndDelete(id)
        .exec();

      if (!userProfile) {
        throw new Error(ErrorMessages.userProfile.USER_PROFILE_DOES_NOT_EXIST);
      }

      return !!userProfile;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
