import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from 'typeorm';

@Entity("m_point")
export class pointEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    POINT_ID: number;

    @Column()
    POINT_CATEGORY_NAME: string;

    @Column()
    TARGET: number;

    @Column()
    PERCENTAGE: number;
    
    @Column()
    TABLE_SOURCE: string;
    
    @Column()
    GROUP_POINT_ID: number;
    
    @Column()
    GROUP_POINT_NAME: string;
}