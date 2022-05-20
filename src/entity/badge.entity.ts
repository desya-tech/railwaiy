import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from 'typeorm';

@Entity("m_badge")
export class BadgeEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    BADGE_ID: number;

    @Column()
    BADGE_NAME: string;

    @Column()
    START_POINT: number;

    @Column()
    END_POINT: number;
    
    @Column()
    PICTURE: string;
}