import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TargetEntity } from 'src/entity/target.entity';
import { TargetService } from './target.service';

@Controller('target')
export class TargetController {
    constructor(private targetService: TargetService){
    }

    @UseGuards(JwtAuthGuard)
    @Get('getall/:year')
    read(@Param('year') year: string): Promise<TargetEntity[]> {
      return this.targetService.readAll(year);
    }


    @UseGuards(JwtAuthGuard)
    @Post('create')
    create(@Body() newsData: TargetEntity){
      return this.targetService.create(newsData);
    }

    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    edit(@Param('id') id: number, @Body() newsData: TargetEntity){
      return this.targetService.update(id,newsData);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    deletedata(@Param('id') id: number) {
      return this.targetService.delete(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('getdetail/:id')
    show(@Param('id') id: number) {
      return this.targetService.getDetailById(id);
    }
    @UseGuards(JwtAuthGuard)
    @Get('getdetailbycompany/:id/:year')
    getTargetbyCompany(@Param('id') id: number,@Param('year') year: string) {
      return this.targetService.getTargetbyCompany(id,year);
    }
}
