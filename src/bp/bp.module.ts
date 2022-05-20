import { Module } from '@nestjs/common';
import { BpController } from './bp.controller';
import { BpService } from './bp.service';

@Module({
  controllers: [BpController],
  providers: [BpService]
})
export class BpModule {}
