import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupPointEntity } from 'src/entity/group_point.entity';
import { GroupPointController } from './group-point.controller';
import { GroupPointService } from './group-point.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      GroupPointEntity
    ])
  ],
  controllers: [GroupPointController],
  providers: [GroupPointService]
})
export class GroupPointModule {}
