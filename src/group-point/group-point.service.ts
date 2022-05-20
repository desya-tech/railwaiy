import { Injectable } from '@nestjs/common';
import { mBpGroupEntity } from 'src/entity/m_bp_group.entity';
import { GroupPointEntity } from 'src/entity/group_point.entity';
import { getManager, Repository } from 'typeorm';
import { GroupPointBPEntity } from 'src/entity/group_point_bp.entity';

@Injectable()
export class GroupPointService {
    async readAll(): Promise<GroupPointEntity[]> {
        try {
            const model = await GroupPointEntity.find();
            if (model) {
                return model
            } else {
                return []
            }
            
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async create(groupPoint: GroupPointEntity) {
        try {
            const groupPoint_data = GroupPointEntity.create(groupPoint);
            await groupPoint_data.save();
            await getManager()
            .createQueryBuilder()
            .delete()
            .from(GroupPointBPEntity)
            .where(`GROUP_POINT_ID isnull`)
            .execute()
            return groupPoint;
        } catch (error) {
            throw new Error(error.message);
        }
        
    }

    async update(id: number,point: GroupPointEntity){
        return await GroupPointEntity.update(id,point);
    }

    async getDetailById(id){
        try {
            const model = await getManager()
            .createQueryBuilder(GroupPointEntity, 'dt')
            .select('dt.GROUP_POINT_ID as "GROUP_POINT_ID"')
            .addSelect('dt.GROUP_POINT_NAME as "GROUP_POINT_NAME"')
            .addSelect('dt.ISACTIVE as "ISACTIVE"')
            .where(`dt.GROUP_POINT_ID = :_id`, { _id: id })
            .getRawOne()
            if (model.length !== 0 ) {
                return model
            } else {
                return []
            }
            
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getGroupPointBp(id){
        try {
            const model = await getManager()
            .createQueryBuilder(GroupPointBPEntity, 'dt')
            .select('dt.GROUP_POINT_BP_ID as "GROUP_POINT_BP_ID"')
            .addSelect('dt.GROUP_POINT_ID as "GROUP_POINT_ID"')
            .addSelect('dt.BP_GROUP_ID as "BP_GROUP_ID"')
            .addSelect('dt.BP_GROUP_NAME as "BP_GROUP_NAME"')
            .where(`dt.GROUP_POINT_ID = :_id`, { _id: id })
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

    async delete(id) {
        return await GroupPointEntity.delete(id);
    }
}
