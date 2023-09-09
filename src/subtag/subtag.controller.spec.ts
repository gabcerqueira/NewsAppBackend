import { Test, TestingModule } from '@nestjs/testing';
import { SubtagController } from './subtag.controller';
import { SubtagService } from './subtag.service';

describe('SubtagController', () => {
  let controller: SubtagController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubtagController],
      providers: [SubtagService],
    }).compile();

    controller = module.get<SubtagController>(SubtagController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
