import { Injectable } from '@nestjs/common';
import { BadgeEntity } from 'src/entity/badge.entity';
import { getManager } from 'typeorm';

@Injectable()
export class BadgeService {
    async readAll() {
        try {
            const model = await getManager()
            .createQueryBuilder(BadgeEntity, 'dt')
            .select('dt.BADGE_ID as "BADGE_ID"')
            .addSelect('dt.BADGE_NAME as "BADGE_NAME"')
            .addSelect('dt.START_POINT as "START_POINT"')
            .addSelect('dt.END_POINT as "END_POINT"')
            .addSelect('dt.PICTURE as "PICTURE"')
            .orderBy('dt.START_POINT', 'DESC')
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

    async create(badge: BadgeEntity) {
        const badge_data = BadgeEntity.create(badge);
        await badge_data.save();
        return badge;
    }

    async update(id: number,point: BadgeEntity){
        return await BadgeEntity.update(id,point);
    }

    async getDetailById(id){
        return await BadgeEntity.findOne(id);
    }

    async delete(id) {
        return await BadgeEntity.delete(id);
    }
}
