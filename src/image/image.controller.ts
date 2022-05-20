import { Body, Controller, Delete, Get, Param, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { editFileName, imageFileFilter } from './utils/file-upload.utils';
import { diskStorage } from 'multer';
import { ImageService } from './image.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('image')
export class ImageController {
    constructor(
        private imageService: ImageService
    ){}
    @UseGuards(JwtAuthGuard)
    @Post()
    @UseInterceptors(
      FileInterceptor('image', {
        storage: diskStorage({
          destination: './image_file',
          filename: editFileName,
        }),
        fileFilter: imageFileFilter,
      }),
    )
    async uploadedFile(@UploadedFile() file) {
        const response = {
        originalname: file.originalname,
        filename: file.filename,
      };
      return response;
    }

    @Get(':imgpath')
    seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './image_file' });
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:filename')
    deletedata(@Param('filename') filename: string) {
      return this.imageService.delete(filename);
    }
}
