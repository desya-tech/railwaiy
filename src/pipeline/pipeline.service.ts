import { Injectable } from '@nestjs/common';
import { VPipelineCatEntity } from 'src/entity/v_pipeline_cat.entity';
import { getManager } from 'typeorm';
import { PipelineEntity, vPipelineEntity } from '../entity/pipeline.entity';

@Injectable()
export class PipelineService {
    async getAll(){
        let ID;
        if(ID != 0){
            console.log("here");
            return vPipelineEntity.find();
        } else {
            return vPipelineEntity.find({ where: { companyid: ID }})
        }
    }

    async showById(ID: string): Promise<PipelineEntity> {
        const pipeline = await PipelineEntity.findOne(ID);
        return pipeline;
    }

    async getTopTen() {
        // const pipeline = await getManager().query("SELECT * FROM v_pipeline ORDER BY createddate DESC LIMIT 10;");
        const pipeline = await vPipelineEntity.find({ order : { createddate: "DESC" }, take: 10});
        return pipeline;
    }

    async getPipelineCategory(id: number){
        // const pipeline = await VPipelineCatEntity.find({ where: { company_id: id }});
        const pipeline = await getManager().query(`

        select * from (
            select distinct sictibpid
            company_id,
            productname,
            coalesce(delivered.Delivered,0) delivered,
            coalesce(entry.Entry,0) Entry,
            coalesce(ongoing.OnGoing,0) OnGoing,
            coalesce(poreceived.PORec,0) poreceived,
            r_delivered,
            r_entry,
            r_ongoing,
            r_porec

            from fact_pipeline fp
            left join (
                select productid, status, sum(totalpipelinerevenue) AS r_delivered, count(status) Delivered from fact_pipeline fp JOIN pipelinebp p ON fp.pipelineid = p.pipelineid where status = 'Delivered' and sictibpid = ${id} and iswinner = 1 group by productid,status
            ) delivered on fp.productid = delivered.productid
            left join (
                select productid, sum(totalpipelinerevenue) AS r_entry, count(status) Entry from fact_pipeline fp JOIN pipelinebp p ON fp.pipelineid = p.pipelineid where status = 'Entry' and sictibpid = ${id} and iswinner = 1 group by productid
            ) entry on fp.productid = entry.productid
            left join (
                select productid, sum(totalpipelinerevenue) AS r_ongoing, count(status) ongoing from fact_pipeline fp JOIN pipelinebp p ON fp.pipelineid = p.pipelineid where status = 'OnGoing' and sictibpid = ${id} and iswinner = 1 group by productid
            ) ongoing on fp.productid = ongoing.productid
            left join (
                select productid, sum(totalpipelinerevenue) AS r_porec, count(status) PORec from fact_pipeline fp JOIN pipelinebp p ON fp.pipelineid = p.pipelineid where status = 'PO Received' and sictibpid = ${id} and iswinner = 1 group by productid
            ) poreceived on fp.productid = poreceived.productid)a where company_id = ${id}

        `);
        return pipeline;
    }

    async getCompanyBasedTopTen(value: number){
        const pipeline = await vPipelineEntity.find({ order : { createddate: "DESC" }, where: { companyid: value}, take: 10});
        return pipeline;
    }

    async advancedSearch(filterBody: vPipelineEntity){
        // let filterArr = {
        //     "bp_name":filterBody.bp_name,
        //     "productname":filterBody.productname,
        //     "project_type":filterBody.project_type,
        //     "status":filterBody.status,
        //     "industryname":filterBody.industryname
        // };

        // if(!filterBody.bp_name){
        //     filterBody.splice(index, 1)
        // } else if(!filterBody.productname){
        //     delete filterBody[1];
        // } else if (!filterBody.project_type){
        //     delete filterBody[2];
        // } else if (!filterBody.status){
        //     delete filterBody[3];
        // } else if (!filterBody.industryname){
        //     delete filterBody[4];
        // }
        const pipeline = await vPipelineEntity.find(filterBody);
        return pipeline;
    }

    async getDistinctField(fieldName: string){
        if(fieldName=="bp_name"){
            return await getManager().query(`SELECT DISTINCT ${fieldName}, companyid FROM v_pipeline ORDER BY ${fieldName} ASC;`);
        } else {
            return await getManager().query(`SELECT DISTINCT ${fieldName} FROM v_pipeline ORDER BY ${fieldName} ASC;`);
        }
    }
}
