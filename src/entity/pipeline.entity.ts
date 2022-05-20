import { Entity, Column, BaseEntity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity("fact_pipeline")
export class PipelineEntity extends BaseEntity {
    @PrimaryColumn()
    pipelineid: number;
    
    @Column()
    pid: string;

    @Column()
    endusername: string;

    @Column()
    sictibpid: string;

    @Column()
    pic: string;

    @Column()
    initiator: string;

    @Column()
    pictamname: string;

    @Column()
    piccamname: string;

    @Column()
    picproductname: string;

    @Column()
    estdeliverydatekey: string;

    @Column()
    createddatekey: string;

    @Column()
    poreceiveddatekey: string;

    @Column()
    productname: string;

    @Column()
    totalpipelinerevenue: string;

    @Column()
    totalpipelinegp: string;

    @Column()
    totalnvoicedidr: string;

    @Column()
    totalsictirevenue: string;

    @Column()
    totalsictigp: string;

    @Column()
    totalsicticogs: string;

    @Column()
    pipelineproductrevenue: string;

    @Column()
    pipelineproductgp: string;

    @Column()
    sictiproductrevenue: string;

    @Column()
    sictiproductgp: string;

    @Column()
    sictiproductcogs: string;

    @Column()
    recognizeddatekey: string;

    @Column()
    recognitionstatus: string;

    @Column()
    status: string;

    @Column()
    projectdescription: string;

    @Column()
    initiatormaincompanycode: string;

    @Column()
    industryname: string;
}

@Entity("v_pipeline")
export class vPipelineEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    pipelineid: number;
    
    @Column()
    companyid: number;

    @Column()
    bp_name: string;

    @Column()
    status: string;

    @Column()
    endusername: string;

    @Column()
    productname: string;

    @Column()
    projectdescription: string;

    @Column()
    createddate: Date;

    @Column()
    estdeliverydate: Date;

    @Column()
    project_type: string;

    @Column()
    industryname: string;

    @Column()
    totalpipelinerevenue: string;
}