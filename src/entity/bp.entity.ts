import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from 'typeorm';
import { IndustryEntity } from './industry_group.entity';

@Entity("m_bp")
export class BpEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    M_BP_ID: number;
  
    @Column()
    COMPANY_ID: number;

    @Column()
    COMPANY_NAME: string;
    
    @Column()
    BP_GROUP_ID: number;

    @OneToMany(type => IndustryEntity, fillBp => fillBp.BpEntity, { cascade: ["insert", "update"], onDelete: 'CASCADE', eager: true })
    industry_list: IndustryEntity[];
}