import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';

  @Entity("v_product")
  export class VProductEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    PRODUCT_ID: number;
  
    @Column()
    PRODUCT_NAME: string;
  }