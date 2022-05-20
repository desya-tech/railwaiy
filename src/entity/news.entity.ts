import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
import { GroupNewsEntity } from './m_group_news.entity';
import { NotifEntity } from './notif.entity';

  @Entity("m_news")
  export class NewsEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    NEWS_ID: number;
  
    @Column()
    NEWS: string;
  
    @Column()
    START_DATE: Date;

    @Column()
    END_DATE: Date;
    
    @Column()
    PICTURE: string;
    
    @Column()
    DESCRIPTION: string;
    
    @Column()
    URL: string;

    @Column()
    ISACTIVE: Boolean;

    @Column()
    CATEGORY_NEWS_ID: number;
    
    @Column()
    CATEGORY_NEWS_NAME: string;

    @OneToOne(type => NotifEntity, fillBp => fillBp.news, { cascade: ["insert", "update"], onDelete: 'CASCADE', eager: true })
    notif: NotifEntity;

    @OneToMany(type => GroupNewsEntity, fillBp => fillBp.news, { cascade: ["insert", "update"], onDelete: 'CASCADE', eager: true })
    group_news_list: GroupNewsEntity[];
  }