import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BadgeEntity } from 'src/entity/badge.entity';
import { BadgeService } from './badge.service';

@Controller('badge')
export class BadgeController {
    constructor(private badgeService: BadgeService){}

    @UseGuards(JwtAuthGuard)
    @Get('')
    read(): Promise<BadgeEntity[]> {
      return this.badgeService.readAll();
    }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    create(@Body() data: BadgeEntity){
      return this.badgeService.create(data);
    }

    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    edit(@Param('id') id: number, @Body() data: BadgeEntity){
      return this.badgeService.update(id,data);
    }

    @UseGuards(JwtAuthGuard)
    @Get('getdetail/:id')
    show(@Param('id') id: number) {
      return this.badgeService.getDetailById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    deletedata(@Param('id') id: number) {
      return this.badgeService.delete(id);
    }
}
