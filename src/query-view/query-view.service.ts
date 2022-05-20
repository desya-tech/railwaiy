import { Injectable } from '@nestjs/common';
import { QueryViewEntity } from 'src/entity/query_view.entity';
import { getManager } from 'typeorm';

@Injectable()
export class QueryViewService {
    async readAll() {
        return await QueryViewEntity.find();
    }

    async create(query: QueryViewEntity) {
        const query_data = QueryViewEntity.create(query);
        await query_data.save();
        const view_query_drop = "DROP VIEW IF EXISTS "+query.QUERY_VIEW_NAME.toString()
        const view_query_create = "CREATE VIEW "+query.QUERY_VIEW_NAME.toString()+" AS "+query.QUERY.toString()
        await getManager().query(view_query_drop.toString())
        await getManager().query(view_query_create.toString())
        return query;
    }

    async update(id: number,query: QueryViewEntity){
        const view_query_drop = "DROP VIEW IF EXISTS "+query.QUERY_VIEW_NAME.toString()
        const view_query_create = "CREATE VIEW "+query.QUERY_VIEW_NAME.toString()+" AS "+query.QUERY.toString()
        await getManager().query(view_query_drop.toString())
        await getManager().query(view_query_create.toString())
        return await QueryViewEntity.update(id,query);
    }

    async getDetailById(id){
        return await QueryViewEntity.findOne(id);
    }

    async delete(id,table) {
        const view_query_drop = "DROP VIEW IF EXISTS "+table.toString()
        await getManager().query(view_query_drop.toString());
        return await QueryViewEntity.delete(id);
    }

    async querytesting(query: QueryViewEntity){
        try {
            const query_testing = getManager().query(query.QUERY.toString()+" limit 10");
            return await query_testing;    
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getbytablename(){
        try {
            const model = await getManager()
            .createQueryBuilder(QueryViewEntity, 'dt')
            .select('dt.QUERY_VIEW_ID as "QUERY_VIEW_ID"')
            .addSelect('dt.QUERY_VIEW_NAME as "QUERY_VIEW_NAME"')
            // .where(`dt.QUERY_VIEW_NAME = :_table_name`, { _table_name: table_name })
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
