import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ContactService } from './contact.service';

@Controller('contact')
export class ContactController {
    constructor(private readonly contactService: ContactService) {}
    @UseGuards(JwtAuthGuard)
    @Get('')
    getAll() {
        return this.contactService.getAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':ID')
    show(@Param('ID') ID: string) {
        return this.contactService.getByID(ID);
    }
    
    @UseGuards(JwtAuthGuard)
    @Get('getbycompany/:ID')
    getbyCompany(@Param('ID') ID: string) {
        return this.contactService.getByCompany(ID);
    }
}
