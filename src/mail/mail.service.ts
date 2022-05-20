import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { UsersEntity } from './../entity/users.entity';
import { UserDto } from 'src/users/dto/users.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class MailService {
    constructor(
        private mailerService: MailerService) {}

  async sendEmailRegistration(user: UserDto) {
    const url = process.env.URLFE;
    
    await this.mailerService.sendMail({
        from: process.env.FROM,
        to: 'desya.kristianto@gmail.com',
        // to: user.USERNAME,
        subject: 'Welcome to Virtus Platform! Please Login',
        template: 'registration', // `.hbs` extension is appended automatically
        context: { // ✏️ filling curly brackets with content
            firstname: user.FIRST_NAME,
            lastname: user.LAST_NAME,
            email:user.USERNAME,
            company: user.COMPANY_NAME,
            url,
        },
    })
    .then((result) => {
        console.log('email has been send')
    })
    .catch((err) => {
        console.log(err.statusCode)
    })
  }

  async sendEmailReset(user: UserDto) {
    const url = process.env.URLFE;
    this.resetpasswordtodefault(user.ID,user);
    await this.mailerService.sendMail({
        from: process.env.FROM,
        to: 'desya.kristianto@gmail.com',
        // to: user.USERNAME,
        subject: 'Resend/Reset Password Virtus Platform',
        template: 'registration', // `.hbs` extension is appended automatically
        context: { // ✏️ filling curly brackets with content
            firstname: user.FIRST_NAME,
            lastname: user.LAST_NAME,
            email:user.USERNAME,
            company: user.COMPANY_NAME,
            url,
        },
    })
    .then((result) => {
        console.log('email has been send')
    })
    .catch((err) => {
        console.log(err.statusCode)
    })
  }

  async resetpasswordtodefault(ID: number, createUserDto: UserDto){
    if(!createUserDto.PASSWORD){
        delete createUserDto.PASSWORD;
      } else {
        createUserDto.PASSWORD = await bcrypt.hash(createUserDto.PASSWORD, 8);
      }
      await UsersEntity.update(ID, createUserDto);
  }
}
