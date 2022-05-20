import { Controller, Get, Post,Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsEntity } from  'src/entity/news.entity';
import { VProductEntity } from  'src/entity/v_product.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CategoryNewsEntity } from 'src/entity/category_news.entity'

@Controller('news')
export class NewsController {
    constructor(private NewsService: NewsService){
    }

    @UseGuards(JwtAuthGuard)
    @Get('')
    read(): Promise<NewsEntity[]> {
      return this.NewsService.readAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('getcategory')
    getcategory(): Promise<CategoryNewsEntity[]> {
      return this.NewsService.getCategoryNews();
    }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    create(@Body() newsData: NewsEntity){
      return this.NewsService.create(newsData);
    }

    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    edit(@Param('id') id: number, @Body() newsData: NewsEntity){
      return this.NewsService.update(id,newsData);
    }

    @UseGuards(JwtAuthGuard)
    @Get('getdetail/:id')
    show(@Param('id') id: number) {
      return this.NewsService.getDetailById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    deletedata(@Param('id') id: number) {
      return this.NewsService.delete(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('product')
    getallproduct(): Promise<VProductEntity[]> {
      return this.NewsService.readAllProduct();
    }

    @UseGuards(JwtAuthGuard)
    @Get('bannerevent')
    getBannerevent(): Promise<NewsEntity[]> {
      return this.NewsService.getBannerEvent();
    }
    @UseGuards(JwtAuthGuard)
    @Get('bannernews')
    getBannernews(): Promise<NewsEntity[]> {
      return this.NewsService.getBannerNews();
    }
    @UseGuards(JwtAuthGuard)
    @Get('bannerpromo')
    getBannerpromo(): Promise<NewsEntity[]> {
      return this.NewsService.getBannerPromo();
    }

    @UseGuards(JwtAuthGuard)
    @Get('getgroupnews/:id')
    getGroupNews(@Param('id') id: number) {
      return this.NewsService.getGroupNews(id);
    }
}
