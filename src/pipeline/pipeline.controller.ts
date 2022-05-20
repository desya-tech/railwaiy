import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PipelineEntity, vPipelineEntity } from 'src/entity/pipeline.entity';
import { PipelineService } from './pipeline.service';

@Controller('pipeline')
export class PipelineController {

    constructor(private readonly pipelineService: PipelineService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    getAll() {
        return this.pipelineService.getAll();
    }
    
    @UseGuards(JwtAuthGuard)
    @Get('pipelinecat/:ID')
    getPipelineCat(@Param('ID') ID: number) {
        return this.pipelineService.getPipelineCategory(ID);
    }

    @UseGuards(JwtAuthGuard)
    @Get('topten')
    getTopTen() {
        return this.pipelineService.getTopTen();
    }

    @UseGuards(JwtAuthGuard)
    @Get('companybasedtopten/:ID')
    getCompanyBasedTopTen(@Param('ID') ID: number) {
        return this.pipelineService.getCompanyBasedTopTen(ID);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':ID')
    show(@Param('ID') ID: string) {
        return this.pipelineService.showById(ID);
    }

    @UseGuards(JwtAuthGuard)
    @Get('distinct/:FIELD')
    getDistinct(@Param('FIELD') FIELD: string){
        return this.pipelineService.getDistinctField(FIELD);
    }

    @UseGuards(JwtAuthGuard)
    @Post('applyfilter')
    create(@Body() filterBody: vPipelineEntity){
      return this.pipelineService.advancedSearch(filterBody);
    }
}
