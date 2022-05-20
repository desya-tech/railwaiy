import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity("m_user")
export class UsersEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  USERNAME: string;

  @Column()
  PASSWORD: string;

  @Column()
  FIRST_NAME: string;

  @Column()
  LAST_NAME: string;

  @Column()
  COMPANY_ID: string;

  @Column()
  COMPANY_NAME: string;

  @Column()
  PHONE: string;

  @Column()
  BIO: string;

  @Column()
  PICTURE: string;

  @Column()
  VIP_POINTS: string;

  @Column()
  RULE_ID: string;

  @Column()
  DISCORD_ID: string;
  
  @Column()
  LAST_LOGIN: Date;
  
  @Column()
  POINT: number;

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.PASSWORD);
  }
}
