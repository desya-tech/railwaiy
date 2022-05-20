import { Injectable } from '@nestjs/common';
import {ProductEntity} from 'src/entity/product.entity'
import { VProductEntity } from 'src/entity/v_product.entity';
import { ProductCategoryEntity } from 'src/entity/product_category.entity'
import { getManager } from 'typeorm';

@Injectable()
export class ProductService {
    async create(product: ProductEntity) {
        const product_data = ProductEntity.create(product);
        await product_data.save();
        return product;
    }
    
    async readAll() {
        return await ProductEntity.find();
    }

    async update(id: number,product: ProductEntity){
        try {
            const product_data = ProductEntity.create(product);
            await product_data.save();
            await getManager()
            .createQueryBuilder()
            .delete()
            .from(ProductCategoryEntity)
            .where(`M_PRODUCT_ID isnull`)
            .execute()
            return product_data;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getDetailById(m_product_id){
        return await ProductEntity.findOne(m_product_id);
    }

    async delete(id) {
        return await ProductEntity.delete(id);
    }
    
    async readAllProduct() {
        //select product except in m_product
        return await getManager().query(`
        select vp."PRODUCT_ID","PRODUCT_NAME"  from v_product vp 
        except 
        select mp."PRODUCT_ID", mp."PRODUCT_NAME"  from m_product mp order by "PRODUCT_NAME" asc `);
        // return await VProductEntity.find();
    }

    async getByCategory(id) {
        try {
            const model = await getManager()
            .createQueryBuilder(ProductEntity, 'dt')
            .select('dt.PRODUCT_NAME as "PRODUCT_NAME"')
            .addSelect('dt.DESCRIPTION as "DESCRIPTION"')
            .addSelect('dt.URL as "URL"')
            .addSelect('dt.PICTURE as "PICTURE"')
            .addSelect('pc.CATEGORY_PRODUCT_ID as "CATEGORY_PRODUCT_ID"')
            .addSelect('pc.CATEGORY_PRODUCT_NAME as "CATEGORY_PRODUCT_NAME"')
            .leftJoin(ProductCategoryEntity, 'pc', 'pc.M_PRODUCT_ID=dt.M_PRODUCT_ID')
            .where(`pc.CATEGORY_PRODUCT_ID = :_id`, { _id: id })
            .getRawMany()
            if (model.length !== 0 ) {
                return model
            } else {
                return []
            }
            
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getCategoryMProduct(id) {
        try {
            const model = await getManager()
            .createQueryBuilder(ProductCategoryEntity, 'dt')
            .select('dt.PRODUCT_CATEGORY_ID as "PRODUCT_CATEGORY_ID"')
            .addSelect('dt.M_PRODUCT_ID as "M_PRODUCT_ID"')
            .addSelect('dt.CATEGORY_PRODUCT_ID as "CATEGORY_PRODUCT_ID"')
            .addSelect('dt.CATEGORY_PRODUCT_NAME as "CATEGORY_PRODUCT_NAME"')
            .where(`dt.M_PRODUCT_ID = :_id`, { _id: id })
            .getRawMany()
            if (model.length !== 0 ) {
                return model
            } else {
                return []
            }
            
        } catch (error) {
            throw new Error(error.message);
        }
    }

}
