import { Injectable } from '@nestjs/common';
import { ActivityEntity } from '../entity/activity.entity';
import { ActivityDto } from './dto/activity.dto';

@Injectable()
export class ActivityService {
    async getAll(){
        const activity = await ActivityEntity.find();
        return activity;
    }

    async showById(ID: string): Promise<ActivityEntity> {
        const activity = await ActivityEntity.findOne(ID);
        return activity;
    }

    async edit(ID: number, createActivityDto: ActivityDto) {
        const activity = await ActivityEntity.update(ID, createActivityDto);
        return activity;
    }

    async delete(ID: number){
        return await ActivityEntity.delete(ID);
    }

    async create(createActivityDTO: ActivityDto){
        const activity = ActivityEntity.create(createActivityDTO);
        await activity.save();
        return activity;
    }
}
