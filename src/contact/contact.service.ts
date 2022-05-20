import { Injectable } from '@nestjs/common';
import { UsersEntity } from 'src/entity/users.entity';
import { VContactEntity } from 'src/entity/v_contact.entity';
import { getManager } from 'typeorm';

@Injectable()
export class ContactService {
    async getAll(){
        const contact = await VContactEntity.find();
        return contact;
    }

    async getByID(id){
        const contact = await VContactEntity.findByIds(id);
        return contact;
    }

    async getByCompany(id) {
        try {
            const email = await getManager()
            .createQueryBuilder(UsersEntity, 'dt')
            .select('dt.USERNAME as "USERNAME"')
            .getRawMany()
            const result = email.map(a => a.USERNAME);

            const model = await getManager()
            .createQueryBuilder(VContactEntity, 'dt')
            .select('dt.CONTACT_ID as "CONTACT_ID"')
            .addSelect('dt.CONTACT_NAME as "CONTACT_NAME"')
            .addSelect('dt.EMAIL as "EMAIL"')
            .addSelect('dt.PHONE01 as "PHONE01"')
            .addSelect('dt.PHONE02 as "PHONE02"')
            .addSelect('dt.COMPANY_ID as "COMPANY_ID"')
            .addSelect('dt.COMPANY_NAME as "COMPANY_NAME"')
            .where(`dt.COMPANY_ID = :_id`, { _id: id })
            .andWhere("dt.EMAIL NOT IN(:...ids)", { ids:result })
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