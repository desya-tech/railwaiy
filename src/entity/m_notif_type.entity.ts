import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity("m_notif_type")
export class NotifTypeEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    NOTIF_TYPE_ID: number;
  
    @Column()
    NOTIF_TYPE_NAME: string;
}