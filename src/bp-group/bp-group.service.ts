import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BpEntity } from 'src/entity/bp.entity';
import { mBpGroupEntity } from 'src/entity/m_bp_group.entity';
import { GroupPointEntity } from 'src/entity/group_point.entity';
import { getManager, Repository } from 'typeorm';
import { GroupPointBPEntity } from 'src/entity/group_point_bp.entity';

@Injectable()
export class BpGroupService {
    constructor(
        @InjectRepository(mBpGroupEntity) private bpGroupRepository: Repository<mBpGroupEntity>,
    ){}
    async readAll() {
        return await mBpGroupEntity.find();
    }

    async getbpgroupexcept(){
        //show bp_group except in grouppoint
        const group_point = await getManager()
        .createQueryBuilder(GroupPointEntity, 'dt')
        .select('gpb.BP_GROUP_ID as "BP_GROUP_ID"')
        .leftJoin(GroupPointBPEntity,'gpb', 'gpb.GROUP_POINT_ID=dt.GROUP_POINT_ID')
        .getRawMany()
        const result = group_point.map(a => a.BP_GROUP_ID);

        const bp_group = await this.bpGroupRepository
        .createQueryBuilder('bp')
        .select('bp.BP_GROUP_ID as "BP_GROUP_ID"')
        .addSelect('bp.BP_GROUP_NAME as "BP_GROUP_NAME"')
        .where("bp.BP_GROUP_ID NOT IN(:...ids)", { ids:result })
        .getRawMany()

        return await bp_group;
    }

    async create(bpgroup: mBpGroupEntity) {
        const bpgroup_data = mBpGroupEntity.create(bpgroup);
        await bpgroup_data.save();
        return bpgroup;
    }

    async update(id: number,point: mBpGroupEntity){
        return await mBpGroupEntity.update(id,point);
    }

    async getDetailById(id){
        return await mBpGroupEntity.findOne(id);
    }

    async delete(id) {
        return await mBpGroupEntity.delete(id);
    }

    async readAllbyGroupPoint() {
        //show bp_group except in grouppoint
        const group_point = await getManager()
        .createQueryBuilder(GroupPointEntity, 'gp')
        .select('gp.BP_GROUP_ID as "BP_GROUP_ID"')
        .getRawMany()
        const result = group_point.map(a => a.BP_GROUP_ID);

        const bp_group = await this.bpGroupRepository
        .createQueryBuilder('bp')
        .select('bp.BP_GROUP_ID as "BP_GROUP_ID"')
        .addSelect('bp.BP_GROUP_NAME as "BP_GROUP_NAME"')
        .where("bp.BP_GROUP_ID NOT IN(:...ids)", { ids:result })
        .getRawMany()

        return await bp_group;
    }

    async getgroupbycompany(company_id: number){
        try {
            const group_point = await getManager()
            .createQueryBuilder(mBpGroupEntity, 'gp')
            .select('gp.BP_GROUP_ID as "BP_GROUP_ID"')
            .addSelect('gp.BP_GROUP_NAME as "BP_GROUP_NAME"')
            .leftJoin(BpEntity, 'dt', 'gp.BP_GROUP_ID=dt.BP_GROUP_ID')
            .where(`dt.COMPANY_ID = :_company_id`, {_company_id: company_id })
            .getRawMany()
            if (group_point.length !== 0 ) {
                return group_point
            } else {
                return []
            }
            
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
