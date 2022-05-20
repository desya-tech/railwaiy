import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
import { ProductCategoryEntity } from './product_category.entity';

  @Entity("m_product")
  export class ProductEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    M_PRODUCT_ID: number;
  
    @Column()
    PRODUCT_ID: number;
    
    @Column()
    PRODUCT_NAME: string;
  
    @Column()
    PICTURE: string;
    
    @Column()
    DESCRIPTION: string;
    
    @Column()
    URL: string;

    @OneToMany(type => ProductCategoryEntity, fillProduct => fillProduct.ProductEntity, { cascade: ["insert", "update"], onDelete: 'CASCADE', eager: true })
    category_product_list: ProductCategoryEntity[];
  }