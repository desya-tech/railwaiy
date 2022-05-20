import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersEntity } from 'src/entity/users.entity';
import { UsersService } from 'src/users/users.service';
import { AuthLoginDto } from './dto/auth-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(authLoginDto: AuthLoginDto) {
    const user = await this.validateUser(authLoginDto);

    const payload = {
      userId: user.ID,
    };

    return {
      ID: user.ID,
      USERNAME: user.USERNAME,
      FIRST_NAME: user.FIRST_NAME,
      LAST_NAME: user.LAST_NAME,
      COMPANY_ID: user.COMPANY_ID,
      COMPANY_NAME: user.COMPANY_NAME,
      PHONE: user.PHONE,
      BIO: user.BIO,
      PICTURE: user.PICTURE,
      RULE_ID: user.RULE_ID,
      VIP_POINTS: user.VIP_POINTS,
      DISCORD_ID: user.DISCORD_ID,
      LAST_LOGIN: user.LAST_LOGIN,
      TOKEN: this.jwtService.sign(payload),
      POINT: user.POINT,
    };
  }

  async validateUser(authLoginDto: AuthLoginDto): Promise<UsersEntity> {
    const { USERNAME, PASSWORD } = authLoginDto;

    const user = await this.usersService.findByEmail(USERNAME);
    if (!(await user?.validatePassword(PASSWORD))) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
