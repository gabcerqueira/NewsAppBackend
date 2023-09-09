import { BadRequestException, Injectable } from '@nestjs/common';
import { UserProfileRepository } from './user-profile.repository';
import { UserProfile } from './schema/user-profile.schema';

@Injectable()
export class UserProfileService {
  constructor(private readonly userProfileRepository: UserProfileRepository) {}
  async create(createUserProfileDto: UserProfile) {
    try {
      let userProfile = new UserProfile();

      userProfile.userId = createUserProfileDto.userId;

      return await this.userProfileRepository.create(userProfile);
    } catch (error) {
      throw Error(error.message);
    }
  }

  async findAll() {
    try {
      return await this.userProfileRepository.findAll();
    } catch (error) {}
  }

  async findOne(id: string) {
    try {
      return await this.userProfileRepository.findById(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateUserProfileDto: UserProfile) {
    try {
      return await this.userProfileRepository.update(updateUserProfileDto);
    } catch (error) {}
  }

  async remove(id: string) {
    try {
      return await this.userProfileRepository.remove(id);
    } catch (error) {}
  }
}
