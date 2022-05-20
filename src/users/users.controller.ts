import { Controller, Get, Post, Body, Param, UseGuards, Put } from '@nestjs/common';

import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersEntity } from '../entity/users.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  create(@Body() userData: UsersEntity){
    return this.usersService.create(userData);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':ID')
  edit(@Param('ID') ID: number, @Body() userData: UsersEntity){
    return this.usersService.edit(ID, userData);
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  getAll() {
    return this.usersService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('gettopten')
  getTopTen() {
    return this.usersService.getTopTen();
  }

  @UseGuards(JwtAuthGuard)
  @Get('gettoptenuser/:companyid')
  getTopTenUser(@Param('companyid') companyid: number) {
    return this.usersService.getTopTenUser(companyid);
  }

  @UseGuards(JwtAuthGuard)
  @Get('gettoptenallcompany/:group_id')
  getTopTenAllCompany(@Param('group_id') group_id: number) {
    return this.usersService.getTopTenAllCompany(group_id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('gettoptenalluser/:group_id')
  getTopTenAllUser(@Param('group_id') group_id: number) {
    return this.usersService.getTopTenAllUser(group_id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getbyusername/:username')
  getByUsername(@Param('username') username: string){
    return this.usersService.getByUsername(username);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':ID')
  show(@Param('ID') ID: string) {
    return this.usersService.showById(+ID);
  }

  @UseGuards(JwtAuthGuard)
  @Get('delete/:ID')
  deleteUser(@Param('ID') ID: number) {
    return this.usersService.deleteUser(ID);
  }
}
