import { Module } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { UserProfileController } from './user-profile.controller';
import { UserProfile, UserProfileSchema } from './schema/user-profile.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserProfileRepository } from './user-profile.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserProfile.name, schema: UserProfileSchema },
    ]),
  ],
  controllers: [UserProfileController],
  providers: [UserProfileService, UserProfileRepository],
  exports: [UserProfileRepository, UserProfileService],
})
export class UserProfileModule {}
