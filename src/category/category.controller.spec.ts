import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

describe('CategoryController', () => {
  let controller: CategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [CategoryService],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
  });
  /*

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  */

  describe('find one', () => {
    it('should return one user', async () => {
      const id = '64e22ea287610e89f2762be8';

      const result = await controller.findOne(id);

      expect(result!._id).toBe(id);
    });
  });
});
