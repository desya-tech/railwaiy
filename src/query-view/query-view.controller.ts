import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { QueryViewEntity } from 'src/entity/query_view.entity';
import { QueryViewService } from './query-view.service';

@Controller('queryview')
export class QueryViewController {
    constructor(private readonly queryService: QueryViewService) {}
    @UseGuards(JwtAuthGuard)
    @Get('')
    read(){
      return this.queryService.readAll();
    }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    create(@Body() data: QueryViewEntity){
      return this.queryService.create(data);
    }

    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    edit(@Param('id') id: number, @Body() data: QueryViewEntity){
      return this.queryService.update(id,data);
    }

    @UseGuards(JwtAuthGuard)
    @Get('getdetail/:id')
    show(@Param('id') id: number) {
      return this.queryService.getDetailById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id/:table')
    deletedata(@Param('id') id: number,@Param('table') table: string) {
      return this.queryService.delete(id,table);
    }

    @UseGuards(JwtAuthGuard)
    @Post('querytesting')
    getview(@Body() data: QueryViewEntity){
      return this.queryService.querytesting(data);
    }

    @UseGuards(JwtAuthGuard)
    @Get('getbytablename')
    getbytablename() {
      return this.queryService.getbytablename();
    }
}
