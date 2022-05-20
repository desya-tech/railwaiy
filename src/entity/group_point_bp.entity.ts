import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
import { GroupPointEntity } from './group_point.entity';


  @Entity("group_point_bp")
  export class GroupPointBPEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    GROUP_POINT_BP_ID: number;
  
    @Column()
    GROUP_POINT_ID: number;
    
    @Column()
    BP_GROUP_ID: number;
    
    @Column()
    BP_GROUP_NAME: string;

    @ManyToOne(type => GroupPointEntity, fillgroup => fillgroup.group_bp_list, { cascade: true, onDelete: 'CASCADE'})
    @JoinColumn({name: "GROUP_POINT_ID"})
    proupPointbp: GroupPointEntity;
  }