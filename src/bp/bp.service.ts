import { Injectable } from '@nestjs/common';
import { VBpEntity } from 'src/entity/v_bp.entity';
import { BpEntity } from 'src/entity/bp.entity';
import { getManager } from 'typeorm';
import { IndustryEntity } from 'src/entity/industry_group.entity';
import { UsersEntity } from 'src/entity/users.entity';

@Injectable()
export class BpService {
    async getAll(){
        const bp = await VBpEntity.find();
        return bp;
    }

    async getAllMBp(){
        return await BpEntity.find();
    }

    async deletembp(id) {
        return await BpEntity.delete(id);
    }

    async getByID(id){
        const bp = await VBpEntity.findByIds(id);
        return bp;
    }

    async create(bp: BpEntity) {
        try {
            const bp_data = BpEntity.create(bp);
            await bp_data.save();
            await getManager()
            .createQueryBuilder()
            .delete()
            .from(IndustryEntity)
            .where(`M_BP_ID isnull`)
            .execute()
            return bp;            
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getAllbyUser(){
        const user_company = await getManager()
        .createQueryBuilder(BpEntity, 'usr')
        .select('usr.COMPANY_ID as "COMPANY_ID"')
        .distinct(true)
        .getRawMany()
        const user_compid = user_company.map(a => parseInt(a.COMPANY_ID));
        
        const m_bp = await getManager()
        .createQueryBuilder(UsersEntity, 'bp')
        .select('bp.COMPANY_ID as "COMPANY_ID"')
        .addSelect('bp.COMPANY_NAME as "COMPANY_NAME"')
        .distinct(true)
        .where('bp.COMPANY_ID NOT IN(:...ids)', { ids:user_compid })
        .getRawMany()

        return m_bp;
    }

    async getpoint(table_source, company){
        return await getManager().query(`select * from "${table_source}" where "COMPANY_NAME" = '${company}'`);
    }

    async getpointuser(table_source, company, email){
        return await getManager().query(`select * from "${table_source}" where "COMPANY_NAME" = '${company}' and "EMAIL" = '${email}'`);
    }
}
