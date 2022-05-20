import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { VipPointService } from './vip-point.service';

@Controller('vip-point')
export class VipPointController {
    constructor(private readonly vipPointService: VipPointService){}
    @UseGuards(JwtAuthGuard)
    @Get('getvippointbycompany/:companyname')
    getVipPoint(@Param('companyname') companyname: string) {
        return this.vipPointService.getvippointbyCompany(companyname);
    }

    @UseGuards(JwtAuthGuard)
    @Get('getallvippoint')
    getAll() {
        return this.vipPointService.getAllvippoint();
    }

    @UseGuards(JwtAuthGuard)
    @Get('getallrevenue')
    getAllrevenue() {
        return this.vipPointService.getAllRevenue();
    }

    @UseGuards(JwtAuthGuard)
    @Get('getalldatavip/:companyname')
    getAlldatavippoint(@Param('companyname') companyname: string) {
        return this.vipPointService.getalldatavip(companyname);
    }

    @UseGuards(JwtAuthGuard)
    @Get('getrevenuebycompany/:companyname')
    getrevenue(@Param('companyname') companyname: string) {
        return this.vipPointService.getrevenuebyCompany(companyname);
    }

    @UseGuards(JwtAuthGuard)
    @Post('filtervipdetail')
    filter(@Body() data: any){
      return this.vipPointService.filter(data);
    }
}
