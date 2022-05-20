import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';

  @Entity("v_contact")
  export class VContactEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    CONTACT_ID: number;
  
    @Column()
    CONTACT_NAME: string;
    
    @Column()
    EMAIL: string;
    
    @Column()
    PHONE01: string;
    
    @Column()
    PHONE02: string;
    
    @Column()
    COMPANY_ID: string;
    
    @Column()
    COMPANY_NAME: string;
  }