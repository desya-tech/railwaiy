import { Injectable } from '@nestjs/common';
import { RulesDto } from './dto/rules.dto';
import { RulesEntity } from '../entity/rules.entity';

@Injectable()
export class RulesService {
    async getAll(){
      const rule = await RulesEntity.find();
      return rule;
    }
  
    async showById(ID: string): Promise<RulesEntity> {
      const rule = await RulesEntity.findOne(ID);
      return rule;
    }

    async delete(ID: number) {
      return await RulesEntity.delete(ID);
    }

    async create(ruleEntity: RulesEntity) {
      const rule = RulesEntity.create(ruleEntity);
      await rule.save();
      return rule;
    }
  
    async edit(ID: number, createRuleDto: RulesDto) {
      const rule = await RulesEntity.update(ID, createRuleDto);
      return rule;
    }
}
