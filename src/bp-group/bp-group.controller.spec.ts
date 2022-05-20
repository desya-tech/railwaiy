import { Test, TestingModule } from '@nestjs/testing';
import { BpGroupController } from './bp-group.controller';

describe('BpGroupController', () => {
  let controller: BpGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BpGroupController],
    }).compile();

    controller = module.get<BpGroupController>(BpGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
