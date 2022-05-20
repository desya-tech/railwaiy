import { Module } from '@nestjs/common';
import { BpGroupService } from './bp-group.service';
import { BpGroupController } from './bp-group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mBpGroupEntity } from 'src/entity/m_bp_group.entity';

@Module({
  imports:[TypeOrmModule.forFeature([mBpGroupEntity])],
  providers: [BpGroupService],
  controllers: [BpGroupController]
})
export class BpGroupModule {}
