import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';

  @Entity("m_category_product")
  export class MCategoryProductEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    CATEGORY_PRODUCT_ID: number;
  
    @Column()
    CATEGORY_PRODUCT_NAME: string;
    
    @Column()
    PICTURE: string;
    
    @Column()
    DESCRIPTION: string;
    
    @Column()
    URL: string;

    @Column()
    ISACTIVE: Boolean;
  }