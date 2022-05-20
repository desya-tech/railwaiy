import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { MCategoryProductEntity } from 'src/entity/m_category_product.entity';
import { CategoryProductService } from './category_product.service';

@Controller('categoryproduct')
export class CategoryProductController {
    constructor(private categoryProductService: CategoryProductService){
    }
    
    @UseGuards(JwtAuthGuard)
    @Get('')
    read(): Promise<MCategoryProductEntity[]> {
      return this.categoryProductService.readAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('active')
    getallactive(): Promise<MCategoryProductEntity[]> {
      return this.categoryProductService.readAllActive();
    }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    create(@Body() data: MCategoryProductEntity){
      return this.categoryProductService.create(data);
    }

    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    edit(@Param('id') id: number, @Body() data: MCategoryProductEntity){
      return this.categoryProductService.update(id,data);
    }

    @UseGuards(JwtAuthGuard)
    @Get('getdetail/:id')
    show(@Param('id') id: number) {
      return this.categoryProductService.getDetailById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    deletedata(@Param('id') id: number) {
      return this.categoryProductService.delete(id);
    }
}
