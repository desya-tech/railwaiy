import { Injectable } from '@nestjs/common';
import {VindustryEntity} from 'src/entity/v_industry.entity'
import { IndustryEntity } from 'src/entity/industry_group.entity'
import { getManager } from 'typeorm';
import { BpEntity } from 'src/entity/bp.entity';

@Injectable()
export class IndustryService {
    async getIndustry() {
        return await VindustryEntity.find();
    }

    async readAll() {
        return await IndustryEntity.find();
    }

    async getDetailById(id){
        return await BpEntity.findOne(id);
    }

    async getByIndustryId(id: number){
        try {
            const model = await getManager()
            .createQueryBuilder(IndustryEntity, 'dt')
            .select('dt.INDUSTRY_GROUP_ID as "INDUSTRY_GROUP_ID"')
            .addSelect('dt.M_BP_ID as "M_BP_ID"')
            .addSelect('dt.INDUSTRY_ID as "INDUSTRY_ID"')
            .addSelect('dt.INDUSTRY_NAME as "INDUSTRY_NAME"')
            .where(`dt.M_BP_ID = :_id`, { _id: id })
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
        return await BpEntity.delete(id);
    }
    // async getListIndustry(){
    //     return await getManager().query(`select mb."M_BP_ID" , mb."COMPANY_ID", mb."COMPANY_NAME", mbg."BP_GROUP_NAME", string_agg(ig."INDUSTRY_NAME",', ') as "INDUSTRY_NAME" 
    //     from m_bp mb 
    //     join industry_group ig on mb."M_BP_ID" = ig."M_BP_ID"
    //     join m_bp_group mbg on mbg."BP_GROUP_ID"  = mb."BP_GROUP_ID" 
    //     group by  mb."M_BP_ID" , mb."COMPANY_ID", mb."COMPANY_NAME", mbg."BP_GROUP_NAME"`);
    // }
}
