import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GroupPointEntity } from 'src/entity/group_point.entity';
import { GroupPointService } from './group-point.service';

@Controller('grouppoint')
export class GroupPointController {
    constructor(private groupPoint: GroupPointService){}
    @UseGuards(JwtAuthGuard)
    @Get('')
    read(): Promise<GroupPointEntity[]> {
      return this.groupPoint.readAll();
    }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    create(@Body() data: GroupPointEntity){
      return this.groupPoint.create(data);
    }

    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    edit(@Param('id') id: number, @Body() data: GroupPointEntity){
      return this.groupPoint.create(data);
    }

    @UseGuards(JwtAuthGuard)
    @Get('getdetail/:id')
    show(@Param('id') id: number) {
      return this.groupPoint.getDetailById(id);
    }


    @UseGuards(JwtAuthGuard)
    @Get('getgrouppointbp/:id')
    getgroup(@Param('id') id: number) {
      return this.groupPoint.getGroupPointBp(id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    deletedata(@Param('id') id: number) {
      return this.groupPoint.delete(id);
    }
}
