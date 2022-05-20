import { Test, TestingModule } from '@nestjs/testing';
import { GroupPointService } from './group-point.service';

describe('GroupPointService', () => {
  let service: GroupPointService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupPointService],
    }).compile();

    service = module.get<GroupPointService>(GroupPointService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
