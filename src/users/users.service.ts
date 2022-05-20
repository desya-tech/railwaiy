import { Injectable } from '@nestjs/common';

import { UsersEntity } from '../entity/users.entity';
import { UserDto } from './dto/users.dto';
import * as bcrypt from 'bcrypt'
import { getManager } from 'typeorm';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UsersService {
  constructor(
    private emailService: MailService
    ) {}
  async create(createUserDto: UserDto) {
    createUserDto.PASSWORD = await bcrypt.hash(createUserDto.PASSWORD, 8);
    const user = UsersEntity.create(createUserDto);
    this.emailService.sendEmailRegistration(createUserDto)
    await user.save();
    return user;
  }

  async edit(ID: number, createUserDto: UserDto) {
    delete createUserDto['TOKEN']
    if(!createUserDto.PASSWORD){
      delete createUserDto.PASSWORD;
    } else {
      createUserDto.PASSWORD = await bcrypt.hash(createUserDto.PASSWORD, 8);
    }
    const user = await UsersEntity.update(ID, createUserDto);
    return user;
  }

  async getAll(){
    const user = await UsersEntity.find();
    return user;
  }

  async getTopTen(){
      return await getManager().query(`SELECT * FROM "top10_revenue" ORDER BY "REVENUE" DESC LIMIT 10`);
      // return await getManager().query(`SELECT * FROM "m_user" ORDER BY "VIP_POINTS" DESC LIMIT 5`);
  }

  async getTopTenUser(company_id){
    try {
      const model = await getManager()
      .createQueryBuilder(UsersEntity, 'gp')
      .select('gp.USERNAME as "USERNAME"')
      .addSelect('gp.POINT as "POINT"')
      .addSelect('gp.COMPANY_NAME as "COMPANY_NAME"')
      .where(`gp.COMPANY_ID = :_company_id`, {_company_id: company_id })
      .andWhere(`gp."POINT" notnull`)
      .getRawMany()
      if (model.length !== 0 ) {
          return model
      } else {
          return []
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getTopTenAllCompany(group_id){
    return await getManager().query(`
    select mu."COMPANY_NAME",mbg."BP_GROUP_ID", mbg."BP_GROUP_NAME", sum(mu."POINT") as "POINT" from m_user mu
    join m_bp mb on mb."COMPANY_ID" = mu."COMPANY_ID"
    join m_bp_group mbg on mbg."BP_GROUP_ID" = mb."BP_GROUP_ID"
    where mu."POINT" notnull and mbg."BP_GROUP_ID" = ${group_id}
    group by mu."COMPANY_NAME", mbg."BP_GROUP_NAME",mbg."BP_GROUP_ID"
    order by "POINT" desc`);
  }

  async getTopTenAllUser(group_id){
    return await getManager().query(`
    select mu."COMPANY_NAME",mbg."BP_GROUP_ID" ,mbg."BP_GROUP_NAME" ,mu."USERNAME", mu."POINT" as "POINT" from m_user mu
    join m_bp mb on mb."COMPANY_ID" = mu."COMPANY_ID"
    join m_bp_group mbg on mbg."BP_GROUP_ID" = mb."BP_GROUP_ID"
    where mu."POINT" notnull and mbg."BP_GROUP_ID" = ${group_id}
    order by "POINT" desc`);
  }

  async getByUsername(username: string){
    try {
      const model = await getManager()
      .createQueryBuilder(UsersEntity, 'dt')
      .select('dt.ID as "ID"')
      .addSelect('dt.USERNAME as "USERNAME"')
      .addSelect('dt.PASSWORD as "PASSWORD"')
      .addSelect('dt.FIRST_NAME as "FIRST_NAME"')
      .addSelect('dt.LAST_NAME as "LAST_NAME"')
      .addSelect('dt.COMPANY_ID as "COMPANY_ID"')
      .addSelect('dt.COMPANY_NAME as "COMPANY_NAME"')
      .addSelect('dt.PHONE as "PHONE"')
      .addSelect('dt.BIO as "BIO"')
      .addSelect('dt.PICTURE as "PICTURE"')
      .addSelect('dt.VIP_POINTS as "VIP_POINTS"')
      .addSelect('dt.RULE_ID as "RULE_ID"')
      .addSelect('dt.DISCORD_ID as "DISCORD_ID"')
      .addSelect('dt.LAST_LOGIN as "LAST_LOGIN"')
      .addSelect('dt.POINT as "POINT"')
      .where(`dt.USERNAME = :_username`, { _username: username })
      .getRawMany()
      if (model.length !== 0 ) {
          return model
      } else {
          return []
      }
      
  } catch (error) {
      throw new Error(error.message);
  }
  }

  async showById(ID: number): Promise<UsersEntity> {
    const user = await this.findById(ID);

    delete user.PASSWORD;
    return user;
  }

  async findById(ID: number) {
    return await UsersEntity.findOne(ID);
  }

  async findByEmail(username: string) {
    return await UsersEntity.findOne({
      where: {
        USERNAME: username,
      },
    });
  }

  async deleteUser(ID: number) {
    return await UsersEntity.delete(ID);
  }
}
