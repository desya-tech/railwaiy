import { Module } from '@nestjs/common';
import { VipPointService } from './vip-point.service';
import { VipPointController } from './vip-point.controller';

@Module({
  providers: [VipPointService],
  controllers: [VipPointController]
})
export class VipPointModule {}
