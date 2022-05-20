import { Module } from '@nestjs/common';
import { QueryViewService } from './query-view.service';
import { QueryViewController } from './query-view.controller';

@Module({
  providers: [QueryViewService],
  controllers: [QueryViewController]
})
export class QueryViewModule {}
