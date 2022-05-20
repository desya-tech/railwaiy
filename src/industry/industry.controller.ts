import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {VindustryEntity} from 'src/entity/v_industry.entity'
import {IndustryService} from 'src/industry/industry.service'
import { IndustryEntity }from 'src/entity/industry_group.entity'
import { VBpEntity } from 'src/entity/v_bp.entity';

@Controller('industry')
export class IndustryController {
    constructor(private IndustryService: IndustryService){}
    
    @UseGuards(JwtAuthGuard)
    @Get('')
    getall(): Promise<IndustryEntity[]> {
      return this.IndustryService.readAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('getindustry')
    getallIndustry(): Promise<VindustryEntity[]> {
      return this.IndustryService.getIndustry();
    }
    
    @UseGuards(JwtAuthGuard)
    @Get('getdetail/:id')
    show(@Param('id') id: number) {
      return this.IndustryService.getDetailById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    deletedata(@Param('id') id: number) {
      return this.IndustryService.delete(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('getbyindustry/:id')
    getbycompany(@Param('id') id: number) {
      return this.IndustryService.getByIndustryId(id);
    }
}
