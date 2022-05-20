import { Test, TestingModule } from '@nestjs/testing';
import { GroupPointController } from './group-point.controller';

describe('GroupPointController', () => {
  let controller: GroupPointController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupPointController],
    }).compile();

    controller = module.get<GroupPointController>(GroupPointController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
