import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from 'typeorm';

@Entity("m_bp_group")
export class mBpGroupEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    BP_GROUP_ID: number;
  
    @Column()
    BP_GROUP_NAME: string;
}