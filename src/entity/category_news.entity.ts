import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';

  @Entity("m_category_news")
  export class CategoryNewsEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    CATEGORY_NEWS_ID: number;

    @Column()
    CATEGORY_NEWS_NAME: string;
  }