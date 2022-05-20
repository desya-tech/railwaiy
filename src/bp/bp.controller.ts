import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BpEntity } from 'src/entity/bp.entity';
import { BpService } from './bp.service';

@Controller('bp')
export class BpController {
    constructor(private readonly bpService: BpService) {}
    @UseGuards(JwtAuthGuard)
    @Get('')
    getAll() {
        return this.bpService.getAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('/mbp')
    getAllMbp() {
        return this.bpService.getAllMBp();
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/mbp/delete/:id')
    deletedata(@Param('id') id: number) {
      return this.bpService.deletembp(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('getallbyuser')
    getallbyuser() {
        return this.bpService.getAllbyUser();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':ID')
    show(@Param('ID') ID: string) {
        return this.bpService.getByID(ID);
    }

    @UseGuards(JwtAuthGuard)
    @Get('getpoint/:table_source/:company')
    get(@Param('table_source') table_source: string,@Param('company') company: string) {
        return this.bpService.getpoint(table_source,company);
    
    }
    @UseGuards(JwtAuthGuard)
    @Get('getpointuser/:table_source/:company/:email')
    getpointuser(@Param('table_source') table_source: string, @Param('company') company: string, @Param('email') email: string) {
        return this.bpService.getpointuser(table_source,company,email);
    }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    create(@Body() bpData: BpEntity){
      return this.bpService.create(bpData);
    }
}
