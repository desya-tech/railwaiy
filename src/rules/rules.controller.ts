import { Controller, Get, Post, Body, Param, UseGuards, Put } from '@nestjs/common';

import { RulesService } from './rules.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RulesEntity } from '../entity/rules.entity';

@Controller('rules')
export class RulesController {
  constructor(private readonly rulesService: RulesService) {}

  @UseGuards(JwtAuthGuard)
  @Get('')
  getAll() {
    return this.rulesService.getAll();
  }

  @Get(':ID')
  show(@Param('ID') ID: string) {
    return this.rulesService.showById(ID);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  create(@Body() ruleData: RulesEntity){
    return this.rulesService.create(ruleData);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':ID')
  edit(@Param('ID') ID: number, @Body() ruleData: RulesEntity){
    return this.rulesService.edit(ID, ruleData);
  }

  @UseGuards(JwtAuthGuard)
  @Get('delete/:ID')
  delete(@Param('ID') ID: number) {
    return this.rulesService.delete(ID);
  }
}
