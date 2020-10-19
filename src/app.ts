import express from 'express';
import {Telegraf} from 'telegraf';
import config from './config';

async function startServer() {
  const app = express();

  const port = process.env.PORT || 3000
  app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })

  const bot = new Telegraf(config.telegram.apiKey)
  bot.start((ctx) => ctx.reply('Добро пожаловать в сервис Bridge! Как вас зовут?'))
  bot.on('message', (ctx) =>  ctx.reply(`Привет, ${ctx.message.text}!`))
  bot.on('sticker', (ctx) => ctx.reply('👍')) 
  bot.launch()

}

startServer();
