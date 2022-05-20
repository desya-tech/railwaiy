import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RulesModule } from './rules/rules.module';
import { ActivityModule } from './activities/activity.module';
import { GroupsModule } from './groups/groups.module';
import { BpModule } from './bp/bp.module';
import { NewsModule } from './news/news.module';
import { IndustryModule } from './industry/industry.module';
import { ProductModule } from './product/product.module';
import { CategoryProductModule } from './category_product/category_product.module';
import { ContactModule } from './contact/contact.module';
import { ImageModule } from './image/image.module';
import { PointModule } from './point/point.module';
import { BadgeModule } from './badge/badge.module';
import { QueryViewModule } from './query-view/query-view.module';
import { GroupPointModule } from './group-point/group-point.module';
import { BpGroupModule } from './bp-group/bp-group.module';
// import { DiscorddModule } from './discord/discord.module';
import { MailModule } from './mail/mail.module';
import { PushNotifModule } from './push-notif/push-notif.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PipelineModule } from './pipeline/pipeline.module';
import { VipPointModule } from './vip-point/vip-point.module';
import { TargetModule } from './target/target.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],      
      useFactory: (configService: ConfigService) => ({
        type: 'postgres' as 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT')),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities:["src/**/**.entity{.ts,.js}"],
        synchronize: false,
        // ssl: {
        //   rejectUnauthorized: false,
        // }
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    RulesModule,
    ActivityModule,
    GroupsModule,
    BpModule,
    NewsModule,
    IndustryModule,
    ProductModule,
    CategoryProductModule,
    ContactModule,
    ImageModule,
    PointModule,
    BadgeModule,
    QueryViewModule,
    GroupPointModule,
    BpGroupModule,
    // DiscorddModule,
    MailModule,
    PushNotifModule,
    PipelineModule,
    VipPointModule,
    TargetModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
