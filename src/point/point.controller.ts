import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { pointEntity } from 'src/entity/point.entity';
import { PointService } from './point.service';

@Controller('point')
export class PointController {
    constructor(private pointService: PointService){}

    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    read(@Param('id') id: number): Promise<pointEntity[]> {
      return this.pointService.readAll(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('gettable/:id')
    readtable(@Param('id') id: number){
      return this.pointService.readAlltable(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    create(@Body() data: pointEntity){
      return this.pointService.create(data);
    }

    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    edit(@Param('id') id: number, @Body() data: pointEntity){
      return this.pointService.update(id,data);
    }

    @UseGuards(JwtAuthGuard)
    @Get('getdetail/:id')
    show(@Param('id') id: number) {
      return this.pointService.getDetailById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    deletedata(@Param('id') id: number) {
      return this.pointService.delete(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('getbygroup/:id')
    getbygroup(@Param('id') id: number) {
      return this.pointService.getPointByGroup(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('getpoint/:company')
    getpoint(@Param('company') company: string) {
      return this.pointService.getpoint(company);
    }
}
