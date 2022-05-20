import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from 'typeorm';

@Entity("v_bp")
export class VBpEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    COMPANY_ID: string;

    @Column()
    COMPANY_NAME: string;
}