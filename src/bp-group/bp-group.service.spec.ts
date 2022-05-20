import { Test, TestingModule } from '@nestjs/testing';
import { BpGroupService } from './bp-group.service';

describe('BpGroupService', () => {
  let service: BpGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BpGroupService],
    }).compile();

    service = module.get<BpGroupService>(BpGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
