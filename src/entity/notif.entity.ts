import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { NewsEntity } from './news.entity';

@Entity("m_notif")
export class NotifEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    NOTIF_ID: number;

    @Column()
    START_DATE_NOTIF: Date;
    
    @Column()
    END_DATE_NOTIF: Date;
    
    @Column()
    NOTIF_TYPE_ID: number;
    
    @Column()
    DATA_ID: number;
    
    @Column()
    DISCORD_ID: number;

    @OneToOne(() => NewsEntity, fillgroup => fillgroup.notif, { cascade: true, onDelete: 'CASCADE'})
    @JoinColumn({name: "DATA_ID"})
    news: NewsEntity;
}