import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProductEntity } from 'src/entity/product.entity'
import { VProductEntity } from 'src/entity/v_product.entity';
import { ProductService } from 'src/product/product.service'

@Controller('product')
export class ProductController {
    constructor(private ProductService: ProductService){   
    }

    @UseGuards(JwtAuthGuard)
    @Get('')
    read(): Promise<ProductEntity[]> {
      return this.ProductService.readAll();
    }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    create(@Body() productData: ProductEntity){
      return this.ProductService.create(productData);
    }

    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    edit(@Param('id') id: number, @Body() productData: ProductEntity){
      return this.ProductService.update(id,productData);
    }

    @UseGuards(JwtAuthGuard)
    @Get('getdetail/:id')
    show(@Param('id') id: number) {
      return this.ProductService.getDetailById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    deletedata(@Param('id') id: number) {
      return this.ProductService.delete(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('getproduct')
    getallproduct(): Promise<VProductEntity[]> {
      return this.ProductService.readAllProduct();
    }

    @UseGuards(JwtAuthGuard)
    @Get('getbycategory/:id')
    getbyvendor(@Param('id') id: number) {
      return this.ProductService.getByCategory(id);
    }
    
    @UseGuards(JwtAuthGuard)
    @Get('getcategorymproduct/:id')
    getCategoryMProduct(@Param('id') id: number) {
      return this.ProductService.getCategoryMProduct(id);
    }
}
