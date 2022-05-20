import { Injectable } from '@nestjs/common';

@Injectable()
export class ImageService {
    
    async delete(file: string){
        //fs to delete file
        const fs = require('fs')
        fs.unlinkSync("./image_file/"+file);
        return file;
    }
}
