import {
    BaseEntity,
    Column,
    Entity,
    PrimaryColumn
  } from 'typeorm';

  @Entity("vti_bpperformance")
  export class VipPointEntity extends BaseEntity {
    @PrimaryColumn()
    customer_name: string;
  
    @Column()
    productname: string;
    
    @Column()
    status: string;
    
    @Column()
    revenue: number;

    @Column()
    vip_points: number;

    @Column()
    enduser: string;

    @Column()
    projectname: string;

    @Column()
    customerpo: number;

    @Column()
    deliverydate: Date;
    
    @Column()
    invoicedate: Date;
    
    @Column()
    paymentdate: Date;
    
    @Column()
    pid: string;

    @Column()
    special_bid: number;
  }