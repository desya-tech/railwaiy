import { Injectable } from '@nestjs/common';
import { TargetEntity } from 'src/entity/target.entity';
import { getManager } from 'typeorm';

@Injectable()
export class TargetService {
    async readAll(curryear) {
        return await getManager().query(`SELECT mt."COMPANY_ID", mt."COMPANY_NAME", STRING_AGG(mt."PRODUCT_NAME" , ', ')  AS "PRODUCT_NAME", sum(mt."TARGET") as "TARGET" 
        FROM m_target mt 
        WHERE date_part('year',mt."YEAR") = '${curryear}'
        GROUP BY mt."COMPANY_NAME",mt."COMPANY_ID"`);
        // return await TargetEntity.find();
    }

    async create(targetdata: TargetEntity) {
        const target_data = TargetEntity.create(targetdata);
        await target_data.save();
        return target_data;
    }

    async update(id: number,targetdata: TargetEntity){
        return await TargetEntity.update(id,targetdata);
    }

    async delete(id) {
        return await TargetEntity.delete(id);
    }

    async getDetailById(targetid){
        return await TargetEntity.findOne(targetid);
    }

    async getTargetbyCompany(companyid: number, curryear: string){
        try {
            const model = await getManager().query(`
            select * from m_target mt
            where mt."COMPANY_ID" = ${companyid} 
            and date_part('year',mt."YEAR") = '${curryear}'`);
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
