import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from 'typeorm';

@Entity("m_target")
export class TargetEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    TARGET_ID: number;

    @Column()
    COMPANY_ID: number;

    @Column()
    COMPANY_NAME: string;

    @Column()
    PRODUCT_ID: string;

    @Column()
    PRODUCT_NAME: string;

    @Column()
    TARGET: number;

    @Column()
    TOTAL: number;
    
    @Column()
    YEAR: Date;
}