import { Test, TestingModule } from '@nestjs/testing';
import { CategoryProductService } from './category_product.service';

describe('VendorService', () => {
  let service: CategoryProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryProductService],
    }).compile();

    service = module.get<CategoryProductService>(CategoryProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
