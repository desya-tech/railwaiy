import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
import { ProductEntity } from './product.entity';

  @Entity("product_category")
  export class ProductCategoryEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    PRODUCT_CATEGORY_ID: number;
  
    @Column()
    M_PRODUCT_ID: number;
    
    @Column()
    CATEGORY_PRODUCT_ID: number;
    
    @Column()
    CATEGORY_PRODUCT_NAME: string;

    @ManyToOne(type => ProductEntity, fillCategory => fillCategory.category_product_list, { cascade: true, onDelete: 'CASCADE'})
    @JoinColumn({name: "M_PRODUCT_ID"})
    ProductEntity: ProductEntity;
  }