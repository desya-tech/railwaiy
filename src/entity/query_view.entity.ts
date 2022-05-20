import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from 'typeorm';

@Entity("m_query_view")
export class QueryViewEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    QUERY_VIEW_ID: number;

    @Column()
    QUERY_VIEW_NAME: string;

    @Column()
    QUERY: string;

    @Column()
    TYPE_ID: number;
}