import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
import { BpEntity } from './bp.entity';

  @Entity("industry_group")
  export class IndustryEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    INDUSTRY_GROUP_ID: number;
  
    @Column()
    M_BP_ID: number;
    
    @Column()
    INDUSTRY_ID: number;
    
    @Column()
    INDUSTRY_NAME: string;

    @ManyToOne(type => BpEntity, fillVendor => fillVendor.industry_list, { cascade: true, onDelete: 'CASCADE'})
    @JoinColumn({name: "M_BP_ID"})
    BpEntity: BpEntity;
  }