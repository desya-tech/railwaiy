import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("m_user")
export class LoginEntity {
    @PrimaryGeneratedColumn()
    ID: string;

    @Column()
    EMAIL: string;

    @Column()
    PASSWORD: string;
}