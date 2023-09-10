import { BadRequestException, Injectable } from '@nestjs/common';

import { User } from './schema/user.schema';
import { UserRepository } from './user.repository';
import { ErrorMessages } from 'src/shared/messages/ErrorMessages';
import { SanitizedUser } from './dto/sanitizedUser';
import { IuserService } from './interfaces/Iuser.service';
import { UserProfileService } from 'src/user-profile/user-profile.service';
import { UserProfile } from 'src/user-profile/schema/user-profile.schema';
import { RateNewsDto } from './dto/rateNewsDto';
import { ClickNewsDto } from './dto/clickNews';
import { NewsService } from 'src/news/news.service';
import { ReadingTimeDto } from './dto/readingTime';
import { SelectCategoriesDto } from './dto/categoriesDto';
import { CategoryService } from 'src/category/category.service';
import { Category } from 'src/category/schema/category.schema';

@Injectable()
export class UserService implements IuserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userProfileService: UserProfileService,
    private readonly newsService: NewsService,
    private readonly categoriesService: CategoryService,
  ) {}

  async create(createUserDto: User) {
    try {
      let user = new User();

      user.email = createUserDto.email;
      user.active = false;
      user.name = createUserDto.name;
      user.password = createUserDto.password;
      let createdUser = await this.userRepository.createUser(user);

      let newUserProfile = new UserProfile();

      newUserProfile.userId = createdUser._id!;

      createdUser.userProfile = await this.userProfileService.create(
        newUserProfile,
      );

      if (!createdUser.userProfile) {
        throw new Error(ErrorMessages.user.ERROR_CREATING_USER);
      }

      let updatedUser = await this.update(createdUser);

      if (!updatedUser) {
        throw new Error(ErrorMessages.user.ERROR_CREATING_USER);
      }

      let sanitizedUser = this.sanitizeUser(updatedUser);

      return sanitizedUser;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    let users: Array<User> = await this.userRepository.findAll();

    let sanitizedUsers: Array<SanitizedUser> = users.map((user) =>
      this.sanitizeUser(user),
    );

    return sanitizedUsers;
  }

  async findOne(id: string) {
    let user: User | null;

    user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error(ErrorMessages.user.USER_DOES_NOT_EXIST);
    }

    let userDto = this.sanitizeUser(user);

    return userDto;
  }

  async update(updateUserDto: User) {
    try {
      let updatedUser = await this.userRepository.update(updateUserDto);

      if (!updatedUser) {
        throw new Error(ErrorMessages.user.ERROR_UPDATING_USER);
      }

      let sanitizedUserDto: SanitizedUser = this.sanitizeUser(updatedUser);

      return sanitizedUserDto;
    } catch (error) {
      return null;
    }
  }

  async remove(id: string): Promise<boolean> {
    return await this.userRepository.remove(id);
  }

  async findByEmail(email: User['email']): Promise<User | null> {
    //Chamada da camada de rep

    let user: User | null;

    user = await this.userRepository.findByEmail(email);

    return user;
  }

  async rateNews(rateNews: RateNewsDto): Promise<User> {
    try {
      let userProfile = new UserProfile();

      userProfile = (await this.userProfileService.findOne(
        rateNews.userProfile,
      )) as UserProfile;

      if (!userProfile) {
        throw new Error(ErrorMessages.user.ERROR_RATING_NEWS);
      }

      (userProfile as UserProfile).ratedNews.set(rateNews.news, rateNews.rate);

      userProfile = (await this.userProfileService.update(
        rateNews.userProfile,
        userProfile,
      )) as UserProfile;

      if (!userProfile) {
        throw new Error(ErrorMessages.user.ERROR_RATING_NEWS);
      }

      let user = await this.findOne(userProfile.userId as string);

      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async addReadingTime(readingTime: ReadingTimeDto): Promise<User> {
    try {
      let userProfile = new UserProfile();

      userProfile = (await this.userProfileService.findOne(
        readingTime.userProfile,
      )) as UserProfile;

      if (!userProfile) {
        throw new Error(ErrorMessages.user.ERROR_RATING_NEWS);
      }

      (userProfile as UserProfile).userReadingTime.set(
        readingTime.news,
        readingTime.readingTime,
      );

      userProfile = (await this.userProfileService.update(
        readingTime.userProfile,
        userProfile,
      )) as UserProfile;

      if (!userProfile) {
        throw new Error(ErrorMessages.user.ERROR_RATING_NEWS);
      }

      let user = await this.findOne(userProfile.userId as string);

      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async selectCategories(categoriesDto: SelectCategoriesDto): Promise<User> {
    try {
      let userProfile = new UserProfile();

      userProfile = (await this.userProfileService.findOne(
        categoriesDto.userProfile,
      )) as UserProfile;

      if (!userProfile) {
        throw new Error(ErrorMessages.user.ERROR_RATING_NEWS);
      }

      let categoriesPromises = categoriesDto.categories.map(
        async (categoryId) => await this.categoriesService.findOne(categoryId),
      );

      if (!categoriesPromises) {
        throw new Error(ErrorMessages.category.CATEGORIES_NOT_FOUND);
      }

      let categories = await Promise.all(categoriesPromises);

      categories.forEach((category: Category) => {
        userProfile.categories.push(category);
      });

      userProfile.categories = userProfile.categories.filter(
        (item, idx) => userProfile.categories.indexOf(item) === idx,
      );

      userProfile = (await this.userProfileService.update(
        categoriesDto.userProfile,
        userProfile,
      )) as UserProfile;

      let user = await this.findOne(userProfile.userId as string);

      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async clickNews(click: ClickNewsDto): Promise<User> {
    try {
      let userProfile = new UserProfile();

      userProfile = (await this.userProfileService.findOne(
        click.userProfile,
      )) as UserProfile;

      if (!userProfile) {
        throw new Error(ErrorMessages.user.ERROR_CLICKING_NEWS);
      }

      let news = await this.newsService.findOne(click.news);

      if (!news) {
        throw new Error(ErrorMessages.news.NEWS_NOT_FOUND);
      }

      userProfile.clickedNews.unshift(news);

      userProfile.clickedNews = userProfile.clickedNews.filter(
        (item, idx) => userProfile.clickedNews.indexOf(item) === idx,
      );

      userProfile = (await this.userProfileService.update(
        click.userProfile,
        userProfile,
      )) as UserProfile;

      if (!userProfile) {
        throw new Error(ErrorMessages.user.ERROR_CLICKING_NEWS);
      }

      let user = await this.findOne(userProfile.userId as string);

      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  sanitizeUser(user: User): SanitizedUser {
    let sanitizedUser: SanitizedUser = {
      _id: user._id!,
      email: user.email,
      name: user.name,
      active: user.active,
      userProfile: user.userProfile!,

      //favoriteNews: user.favoriteNews,
      //likedNews: user.likedNews,
    };

    return sanitizedUser;
  }
}
