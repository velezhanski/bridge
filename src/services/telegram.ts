import { ITelegram } from '../interfaces/ITelegram';
import {Telegraf} from 'telegraf';
import config from '../config';

export default class TelegramBotService {
  public async LaunchBotService(app) {
    const bot = new Telegraf(config.telegram.token)

    // bot.telegram.setWebhook(`${config.heroku.url}/bot${config.telegram.token}`);
    // app.use(bot.webhookCallback(`/bot${config.telegram.token}`));
    
    bot.start((ctx) => ctx.reply('Добро пожаловать в сервис Bridge! Как вас зовут?'))
    bot.on('message', (ctx) =>  ctx.reply(`Привет, ${ctx.message.text}!`))
    bot.on('sticker', (ctx) => ctx.reply('👍')) 
    bot.launch()

    app.get('/', (req, res) => {
      res.send('Hello World!');
    });
    app.listen(config.port, () => { 
      console.log(`Server running on port ${config.port}`);
    });

    return { delivered: 1, status: 'ok' };
  }
  public sendMessage(telegram: Partial<ITelegram>) {
    console.log("Placeholder" + telegram)
  }
}
