import { Module } from '@nestjs/common';
import { PushNotifService } from './push-notif.service';
import { PushNotifController } from './push-notif.controller';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot()
  ],
  providers: [PushNotifService],
  controllers: [PushNotifController]
})
export class PushNotifModule {}
