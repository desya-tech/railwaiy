import { Injectable, Logger  } from '@nestjs/common';
import { Message, ClientEvents, Client, Intents } from 'discord.js';
import { On, Middleware, DiscordClientProvider, Command, DiscordMiddleware, Once} from '@discord-nestjs/core';
import { getManager } from 'typeorm';
import { MCategoryProductEntity } from 'src/entity/m_category_product.entity';
// import { Content, Context, Once,OnCommand, On,  } from 'discord-nestjs';
// const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES] });


@Injectable()
export class DiscordService {
    constructor(private readonly discordProvider: DiscordClientProvider) {}
    private readonly logger = new Logger(DiscordService.name);

  @On('ready')
  onReady() {
    this.logger.log(`Logged in as ${this.discordProvider.getClient().user.tag}!`); 
  }

  async getAll(message: Message) {
      console.log('dasdsd')
      await message.reply("I'm watching you")
  }

  @On('messageCreate')
    public async message(message: Message, client: Client) {
      const model = await MCategoryProductEntity.find();
     
      if(message.content === 'ping'){
        model.forEach(element => {
          message.reply({content:element.CATEGORY_PRODUCT_NAME}) 
       });
      //  client.users.get('357108041755262989').send("someMessage");
      // console.log(client)
        // client.users.cache.get('357108041755262989').send("hai");
      }
    }

// @OnCommand({ name: 'start' })
//   async onCommand(
//     @Content() content: string,
//     @Context() [context]: [Message],
//   ): Promise<void> {
//     await context.reply('dasadasd');
//   }
    
}
