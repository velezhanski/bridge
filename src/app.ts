import express from 'express';
import {Telegraf} from 'telegraf';
import config from './config';

async function startServer() {
  const app = express();

  const bot = new Telegraf(config.telegram.apiKey)
  bot.start((ctx) => ctx.reply('Добро пожаловать в сервис Bridge! Как вас зовут?'))

  bot.help((ctx) => ctx.reply('Send me a sticker'))
  bot.on('sticker', (ctx) => ctx.reply('👍'))
  bot.on('message', (ctx) =>  ctx.reply(`Привет, ${ctx.message.text}!`)) 
  bot.launch()

}

startServer();
