import { Test, TestingModule } from '@nestjs/testing';
import { SubtagService } from './subtag.service';

describe('SubtagService', () => {
  let service: SubtagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubtagService],
    }).compile();

    service = module.get<SubtagService>(SubtagService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
