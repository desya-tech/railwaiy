import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from 'typeorm';
import { GroupPointBPEntity } from './group_point_bp.entity';

@Entity("m_group_point")
export class GroupPointEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    GROUP_POINT_ID: number;
  
    @Column()
    GROUP_POINT_NAME: string;

    @Column()
    ISACTIVE: boolean;

    @OneToMany(type => GroupPointBPEntity, fillBp => fillBp.proupPointbp, { cascade: ["insert", "update"], onDelete: 'CASCADE', eager: true })
    group_bp_list: GroupPointBPEntity[];
}