import { Controller, Get, Param } from '@nestjs/common';
import { Message } from 'discord.js';
import { DiscordService } from './discord.service';

@Controller('discord')
export class DiscordController {
    constructor(private readonly discordService: DiscordService){}
    @Get()
    public message(message: Message) {
        console.log(message.content)
  
          message.reply('pong')
      
      }
    }
