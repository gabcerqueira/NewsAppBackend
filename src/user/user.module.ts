import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './schema/user.schema';
import { UserRepository } from './user.repository';
import { UserProfileService } from 'src/user-profile/user-profile.service';
import { UserProfileModule } from 'src/user-profile/user-profile.module';
import { NewsModule } from 'src/news/news.module';
import { CategoryService } from 'src/category/category.service';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UserProfileModule,
    NewsModule,
    CategoryModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, CategoryService],
  exports: [UserRepository],
})
export class UserModule {}
