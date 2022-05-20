import { Test, TestingModule } from '@nestjs/testing';
import { QueryViewController } from './query-view.controller';

describe('QueryViewController', () => {
  let controller: QueryViewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QueryViewController],
    }).compile();

    controller = module.get<QueryViewController>(QueryViewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
