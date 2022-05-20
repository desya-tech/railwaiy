import { Module } from '@nestjs/common';
import { CategoryProductController } from './category_product..controller';
import { CategoryProductService } from './category_product.service';

@Module({
  controllers: [CategoryProductController],
  providers: [CategoryProductService]
})
export class CategoryProductModule {}
