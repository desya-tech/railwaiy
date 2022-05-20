import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserDto } from 'src/users/dto/users.dto';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
    constructor(
        private mailService: MailService
    ){}
    @UseGuards(JwtAuthGuard)
    @Post('resendemail')
    create(@Body() data: UserDto){
      return this.mailService.sendEmailReset(data);
    }
}
