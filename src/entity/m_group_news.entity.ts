import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { NewsEntity } from './news.entity';
import { NotifEntity } from './notif.entity';

@Entity("m_group_news")
export class GroupNewsEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    GROUP_NEWS_ID: number;

    @Column()
    NEWS_ID: number;
    
    @Column()
    INDUSTRY_ID: number;
    
    @Column()
    INDUSTRY_NAME: string;

    @ManyToOne(type => NewsEntity, fillVendor => fillVendor.group_news_list, { cascade: true, onDelete: 'CASCADE'})
    @JoinColumn({name: "NEWS_ID"})
    news: NewsEntity;
}