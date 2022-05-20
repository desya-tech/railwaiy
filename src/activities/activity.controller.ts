import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ActivityEntity } from 'src/entity/activity.entity';
import { ActivityService } from './activity.service';

@Controller('activity')
export class ActivityController {

    constructor(private readonly activityService: ActivityService) {}

    @UseGuards(JwtAuthGuard)
    @Get('')
    getAll() {
        return this.activityService.getAll();
    }

    @Get(':ID')
    show(@Param('ID') ID: string) {
        return this.activityService.showById(ID);
    }

    @UseGuards(JwtAuthGuard)
    @Post('')
    create(@Body() activityData: ActivityEntity){
        return this.activityService.create(activityData);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':ID')
    edit(@Param('ID') ID: number, @Body() data: ActivityEntity){
        return this.activityService.edit(ID, data);
    }

    @UseGuards(JwtAuthGuard)
    @Get('delete/:ID')
    delete(@Param('ID') ID: number) {
    return this.activityService.delete(ID);
    }
}  