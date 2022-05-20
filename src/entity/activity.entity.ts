import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity("m_activity")
export class ActivityEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    ID: number;
    
    @Column()
    ACTIVITY_NAME: string;

    @Column()
    ACTIVITY_DESC: string;

    @Column()
    PICTURE: string;
}