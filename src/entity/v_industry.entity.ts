import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';

  @Entity("v_industry")
  export class VindustryEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    INDUSTRY_ID: number;
  
    @Column()
    INDUSTRY_NAME: string;
  }