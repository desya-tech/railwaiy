import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { NotifTypeEntity } from 'src/entity/m_notif_type.entity';
import { NotifEntity } from 'src/entity/notif.entity';
import { NotifTokenEntity } from 'src/entity/push_notif_token.entity';
import { PushNotifDto } from './dto/push-notif.dto';
import { PushNotifService } from './push-notif.service';

@Controller('push-notif')
export class PushNotifController {
    constructor(private pushNotifService: PushNotifService){   
    }

    @UseGuards(JwtAuthGuard)
    @Get('send')
    create(){
      return this.pushNotifService.send();
    }

    @UseGuards(JwtAuthGuard)
    @Post('createtoken')
    createtoken(@Body() token: NotifTokenEntity){
      return this.pushNotifService.createtoken(token);
    }

    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    updatetoken(@Param('id') id: string, @Body() token: NotifTokenEntity){
      return this.pushNotifService.updatetoken(id,token);
    }

    @UseGuards(JwtAuthGuard)
    @Get('')
    read(): Promise<NotifEntity[]> {
      return this.pushNotifService.readAll();
    }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    createnotif(@Body() newsData: NotifEntity){
      return this.pushNotifService.create(newsData);
    }

    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    edit(@Param('id') id: number, @Body() data: NotifEntity){
      return this.pushNotifService.update(id,data);
    }

    @UseGuards(JwtAuthGuard)
    @Get('getdetail/:id')
    show(@Param('id') id: number) {
      return this.pushNotifService.getDetailById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    deletedata(@Param('id') id: number) {
      return this.pushNotifService.delete(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('findtoken/:id')
    find(@Param('id') id: string) {
      return this.pushNotifService.findtoken(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('getnotifbyid/:id')
    getnotif(@Param('id') id: number) {
      return this.pushNotifService.getNotif(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('getnotiftype')
    gettype(): Promise<NotifTypeEntity[]> {
      return this.pushNotifService.getnotiftype();
    }
}
