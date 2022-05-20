import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { mBpGroupEntity } from 'src/entity/m_bp_group.entity';
import { BpGroupService } from './bp-group.service';

@Controller('bpgroup')
export class BpGroupController {
    constructor(private bpgroup: BpGroupService){}
    @UseGuards(JwtAuthGuard)
    @Get('')
    read(): Promise<mBpGroupEntity[]> {
      return this.bpgroup.readAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('getbygroup')
    readbypoint(): Promise<mBpGroupEntity[]> {
      return this.bpgroup.readAllbyGroupPoint();
    }

    @UseGuards(JwtAuthGuard)
    @Get('getbygroupbp')
    readbpgroup(): Promise<mBpGroupEntity[]> {
      return this.bpgroup.getbpgroupexcept();
    }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    create(@Body() data: mBpGroupEntity){
      return this.bpgroup.create(data);
    }

    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    edit(@Param('id') id: number, @Body() data: mBpGroupEntity){
      return this.bpgroup.update(id,data);
    }

    @UseGuards(JwtAuthGuard)
    @Get('getdetail/:id')
    show(@Param('id') id: number) {
      return this.bpgroup.getDetailById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    deletedata(@Param('id') id: number) {
      return this.bpgroup.delete(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('getgroupbycompany/:id')
    getgroupbycompany(@Param('id') id: number) {
      return this.bpgroup.getgroupbycompany(id);
    }
}
