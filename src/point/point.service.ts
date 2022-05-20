import { Injectable } from '@nestjs/common';
import { BpEntity } from 'src/entity/bp.entity';
import { GroupPointEntity } from 'src/entity/group_point.entity';
import { GroupPointBPEntity } from 'src/entity/group_point_bp.entity';
import { mBpGroupEntity } from 'src/entity/m_bp_group.entity';
import { pointEntity } from 'src/entity/point.entity';
import { QueryViewEntity } from 'src/entity/query_view.entity';
import { getManager } from 'typeorm';

@Injectable()
export class PointService {
    async readAll(id) {
        try {
            const model = await getManager()
            .createQueryBuilder(pointEntity, 'dt')
            .select('dt.POINT_ID as "POINT_ID"')
            .addSelect('dt.POINT_CATEGORY_NAME as "POINT_CATEGORY_NAME"')
            .addSelect('dt.TARGET as "TARGET"')
            .addSelect('dt.PERCENTAGE as "PERCENTAGE"')
            .addSelect('qv.QUERY_VIEW_NAME as "TABLE_SOURCE"')
            .addSelect('dt.GROUP_POINT_ID as "GROUP_POINT_ID"')
            .addSelect('dt.GROUP_POINT_NAME as "GROUP_POINT_NAME"')
            .leftJoin(QueryViewEntity, 'qv', 'qv.QUERY_VIEW_NAME=dt.TABLE_SOURCE')
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

    async create(point: pointEntity) {
        const point_data = pointEntity.create(point);
        await point_data.save();
        return point;
    }

    async update(id: number,point: pointEntity){
        return await pointEntity.update(id,point);
    }

    async getDetailById(id){
        return await pointEntity.findOne(id);
    }

    async delete(id) {
        return await pointEntity.delete(id);
    }

    async readAlltable(id) {
        return await getManager().query(`select mqv."QUERY_VIEW_NAME" as "TABLE_NAME" from m_query_view mqv except select mp."TABLE_SOURCE"  from m_point mp where mp."GROUP_POINT_ID" = ${id}`);
    }

    async getpoint(company) {
        try {
            const model = 
            getManager().query(`
                select * from m_point mp 
                join m_query_view mqv on mp."TABLE_SOURCE" = mqv."QUERY_VIEW_NAME"
                join group_point_bp gpb on gpb."GROUP_POINT_ID" = mp."GROUP_POINT_ID" 
                join m_bp_group mbg on mbg."BP_GROUP_ID" = gpb."BP_GROUP_ID"
                join m_bp mb on mb."BP_GROUP_ID" = mbg."BP_GROUP_ID"
                where mb."COMPANY_NAME" = '${company}'
                order by mp."TABLE_SOURCE" ASC`
            );
            return model; 
            // await getManager()
            // .createQueryBuilder(BpEntity, 'dt')
            // .select('gpb.GROUP_POINT_ID as "GROUP_POINT_ID"')
            // .addSelect('mbg.BP_GROUP_NAME as "BP_GROUP_NAME"')
            // .leftJoin(mBpGroupEntity, 'mbg', 'mbg.BP_GROUP_ID=dt.BP_GROUP_ID')
            // .leftJoin(GroupPointBPEntity, 'gpb', 'gpb.BP_GROUP_ID=dt.BP_GROUP_ID')
            // .where(`dt.COMPANY_NAME = :_company`, { _company: company })
            // .getRawMany()
            // if (model.length !== 0 ) {
            //     return model
            // } else {
            //     return []
            // }
            
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getpoint2(company) {
        try {
            const model = 
            getManager().query(`
                select * from m_point mp 
                join m_query_view mqv on mp."TABLE_SOURCE" = mqv."QUERY_VIEW_NAME"
                join group_point_bp gpb on gpb."GROUP_POINT_ID" = mp."GROUP_POINT_ID" 
                join m_bp_group mbg on mbg."BP_GROUP_ID" = gpb."BP_GROUP_ID"
                join m_bp mb on mb."BP_GROUP_ID" = mbg."BP_GROUP_ID"
                where mb."COMPANY_NAME" = '${company}'`
            );
            return model;
            
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getPointByGroup(id) {
        try {
            const model = await getManager()
            .createQueryBuilder(pointEntity, 'dt')
            .select('dt.POINT_ID as "POINT_ID"')
            .addSelect('dt.POINT_CATEGORY_NAME as "POINT_CATEGORY_NAME"')
            .addSelect('dt.TARGET as "TARGET"')
            .addSelect('dt.PERCENTAGE as "PERCENTAGE"')
            .addSelect('dt.TABLE_SOURCE as "TABLE_SOURCE"')
            .addSelect('dt.GROUP_POINT_ID as "GROUP_POINT_ID"')
            .addSelect('gpe.GROUP_POINT_NAME as "GROUP_POINT_NAME"')
            .leftJoin(GroupPointEntity, 'gpe', 'gpe.GROUP_POINT_ID=dt.GROUP_POINT_ID')
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
}
