import { Test, TestingModule } from '@nestjs/testing';
import { CategoryProductController } from './category_product..controller';

describe('VendorController', () => {
  let controller: CategoryProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryProductController],
    }).compile();

    controller = module.get<CategoryProductController>(CategoryProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
