import { Test, TestingModule } from '@nestjs/testing';
import { QueryViewService } from './query-view.service';

describe('QueryViewService', () => {
  let service: QueryViewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QueryViewService],
    }).compile();

    service = module.get<QueryViewService>(QueryViewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
