import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult, DeleteResult, getManager } from  'typeorm';
import { NewsEntity } from  'src/entity/news.entity';
import { VProductEntity } from  'src/entity/v_product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryNewsEntity } from 'src/entity/category_news.entity'
import { GroupNewsEntity } from 'src/entity/m_group_news.entity';
import { NotifEntity } from 'src/entity/notif.entity';

@Injectable()
export class NewsService {
    async create(news: NewsEntity) {
        const news_data = NewsEntity.create(news);
        await news_data.save();
        await getManager()
            .createQueryBuilder()
            .delete()
            .from(GroupNewsEntity)
            .where(`NEWS_ID isnull`)
            .execute()
        return news;
    }
    
    async readAll() {
        return await NewsEntity.find();
    }

    async update(id: number,news: NewsEntity){
        return await NewsEntity.update(id,news);
    }

    async getDetailById(news_id){
        return await NewsEntity.findOne(news_id);
    }

    async delete(id) {
        return await NewsEntity.delete(id);
    }

    async readAllProduct() {
        return await VProductEntity.find();
    }

    async getCategoryNews(){
        return await CategoryNewsEntity.find();
    }

    async getBannerNews(){
        try {
            const model = await getManager()
            .createQueryBuilder(NewsEntity, 'dt')
            .select('dt.NEWS_ID as "NEWS_ID"')
            .addSelect('dt.NEWS as "NEWS"')
            .addSelect('dt.START_DATE as "START_DATE"')
            .addSelect('dt.END_DATE as "END_DATE"')
            .addSelect('dt.PICTURE as "PICTURE"')
            .addSelect('dt.DESCRIPTION as "DESCRIPTION"')
            .addSelect('dt.URL as "URL"')
            .addSelect('dt.ISACTIVE as "ISACTIVE"')
            .addSelect('dt.CATEGORY_NEWS_ID as "CATEGORY_NEWS_ID"')
            .addSelect('dt.CATEGORY_NEWS_NAME as "CATEGORY_NEWS_NAME"')
            .where(`dt.ISACTIVE = true`)
            .andWhere(`dt.CATEGORY_NEWS_ID=2`)
            .orderBy('dt.END_DATE','ASC')
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
    
    async getBannerPromo(){
        try {
            const model = await getManager()
            .createQueryBuilder(NewsEntity, 'dt')
            .select('dt.NEWS_ID as "NEWS_ID"')
            .addSelect('dt.NEWS as "NEWS"')
            .addSelect('dt.START_DATE as "START_DATE"')
            .addSelect('dt.END_DATE as "END_DATE"')
            .addSelect('dt.PICTURE as "PICTURE"')
            .addSelect('dt.DESCRIPTION as "DESCRIPTION"')
            .addSelect('dt.URL as "URL"')
            .addSelect('dt.ISACTIVE as "ISACTIVE"')
            .addSelect('dt.CATEGORY_NEWS_ID as "CATEGORY_NEWS_ID"')
            .addSelect('dt.CATEGORY_NEWS_NAME as "CATEGORY_NEWS_NAME"')
            .where(`dt.ISACTIVE = true`)
            .andWhere(`dt.END_DATE >= current_date`)
            .andWhere(`dt.CATEGORY_NEWS_ID = 3`)
            .orderBy('dt.END_DATE','ASC')
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

    async getBannerEvent(){
        try {
            const model = await getManager()
            .createQueryBuilder(NewsEntity, 'dt')
            .select('dt.NEWS_ID as "NEWS_ID"')
            .addSelect('dt.NEWS as "NEWS"')
            .addSelect('dt.START_DATE as "START_DATE"')
            .addSelect('dt.END_DATE as "END_DATE"')
            .addSelect('dt.PICTURE as "PICTURE"')
            .addSelect('dt.DESCRIPTION as "DESCRIPTION"')
            .addSelect('dt.URL as "URL"')
            .addSelect('dt.ISACTIVE as "ISACTIVE"')
            .addSelect('dt.CATEGORY_NEWS_ID as "CATEGORY_NEWS_ID"')
            .addSelect('dt.CATEGORY_NEWS_NAME as "CATEGORY_NEWS_NAME"')
            .where(`dt.ISACTIVE = true`)
            .andWhere(`dt.END_DATE >= current_date`)
            .andWhere(`dt.CATEGORY_NEWS_ID = 1`)
            .orderBy('dt.END_DATE','ASC')
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

    async getGroupNews(id: number){
        try {
            const model = await getManager()
            .createQueryBuilder(GroupNewsEntity, 'dt')
            .select('dt.GROUP_NEWS_ID as "GROUP_NEWS_ID"')
            .addSelect('dt.NEWS_ID as "NEWS_ID"')
            .addSelect('dt.INDUSTRY_ID as "INDUSTRY_ID"')
            .addSelect('dt.INDUSTRY_NAME as "INDUSTRY_NAME"')
            .where(`dt.NEWS_ID = :_id`, { _id: id })
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
