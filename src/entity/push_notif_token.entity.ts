import {
    BaseEntity,
    Column,
    Entity,
    PrimaryColumn,
  } from 'typeorm';

  @Entity("push_notif_token")
  export class NotifTokenEntity extends BaseEntity {
    @PrimaryColumn()
    TOKEN: string;

    @Column()
    USER_ID: number;
    
    @Column()
    COMPANY_ID: number;
  }