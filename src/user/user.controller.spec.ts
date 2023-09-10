import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './schema/user.schema';
import { faker } from '@faker-js/faker';
import { UserRepository } from './user.repository';
import { CategoryService } from 'src/category/category.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserProfileModule } from 'src/user-profile/user-profile.module';
import { NewsModule } from 'src/news/news.module';
import { CategoryModule } from 'src/category/category.module';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        UserProfileModule,
        NewsModule,
        CategoryModule,
      ],
      controllers: [UserController],
      providers: [UserService, UserRepository, CategoryService],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  /*

  describe('create', () => {
    it('should create a user', async () => {
      const DEFAULT_PASSWORD = '123456';
      const createUserDtoMock: User = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: DEFAULT_PASSWORD,
        active: false,
      };

      const result = await controller.create(createUserDtoMock);

      expect(result.email).toEqual(createUserDtoMock.email);
    });
  });

  */

  describe('find one', () => {
    it('should return one user', async () => {
      const id = '64f1fd4b1d5d8bc5650b85c3';

      const result = await controller.findOne(id);

      expect(result._id).toBe(id);
    });
  });
});
