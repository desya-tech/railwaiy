import { Injectable } from '@nestjs/common';
import { MCategoryProductEntity } from 'src/entity/m_category_product.entity';
import { getManager } from 'typeorm';

@Injectable()
export class CategoryProductService {
    async create(category: MCategoryProductEntity) {
        const category_data = MCategoryProductEntity.create(category);
        await category_data.save();
        return category;
    }
    
    async readAll() {
        return await MCategoryProductEntity.find();
    }

    async readAllActive() {
        try {
            const model = await getManager()
            .createQueryBuilder(MCategoryProductEntity, 'gp')
            .select('gp.CATEGORY_PRODUCT_ID as "CATEGORY_PRODUCT_ID"')
            .addSelect('gp.CATEGORY_PRODUCT_NAME as "CATEGORY_PRODUCT_NAME"')
            .addSelect('gp.PICTURE as "PICTURE"')
            .addSelect('gp.DESCRIPTION as "DESCRIPTION"')
            .addSelect('gp.URL as "URL"')
            .where(`gp.ISACTIVE = true`)
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

    async update(id: number,category: MCategoryProductEntity){
        return await MCategoryProductEntity.update(id,category);
    }

    async getDetailById(category_id){
        return await MCategoryProductEntity.findOne(category_id);
    }

    async delete(id) {
        return await MCategoryProductEntity.delete(id);
    }   
}
