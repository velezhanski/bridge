import {Telegraf, Context as TelegrafContext} from 'telegraf';
import {MenuTemplate, MenuMiddleware} from 'telegraf-inline-menu'
import config from '../config';
import {MongoClient} from 'mongodb';

export default class TelegramBotService {
  public async LaunchBotService(app) {
    const bot = new Telegraf(config.telegram.token)
    const users = []

    bot.start((ctx) => this.checkUserStatus(ctx, users, bot))
    bot.launch()

    return { delivered: 1, status: 'ok' };
  }

  public registerUser(telegram, users, bot) {
    const uri = "mongodb+srv://admin:<R@duga12>@telegram.zqx1v.mongodb.net/<dbname>?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
      const collection = client.db("test").collection("devices");
      // perform actions on the collection object
      client.close();
    });

    const menu = new MenuTemplate<TelegrafContext>(() => `Эй! Я тебя не знаю!`)

    menu.interact('Зарегестрироваться!', 'a', {
      do: async ctx => {
        await ctx.reply('Как мне тебя называть?')
        bot.on('message', (ctx) =>  {
          const user = {id: ctx.message.from.id, name: ctx.message.text}
          users.push(user)
          ctx.reply(`Приятно познакомиться ${user.name}`)
        })
        return false
      }
    })

    const menuMiddleware = new MenuMiddleware('/', menu)
    menuMiddleware.replyToContext(telegram)
    bot.use(menuMiddleware)

    bot.launch()
  }

  public checkUserStatus(telegram, users, bot) {
    console.log("Checking status")
    var found = false;
    for(var i = 0; i < users.length; i++) {
      if (users[i].id == telegram.message.from.id) {
          found = true;
          break;
      }
    }

    if (found == true) {
      telegram.reply(`Привет, ${telegram.message.from.first_name}`)
    } else {
      this.registerUser(telegram, users, bot)
    }
  }
}
