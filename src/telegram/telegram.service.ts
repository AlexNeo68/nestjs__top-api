import { Inject, Injectable } from '@nestjs/common';
import { TelegramOptionsInterface } from 'src/telegram/telegram-options.interface';
import { TELEGRAM_MODULE_OPTIONS } from 'src/telegram/telegram.constants';
import { Telegraf } from 'telegraf';

@Injectable()
export class TelegramService {
  bot: Telegraf;
  options: TelegramOptionsInterface;

  constructor(
    @Inject(TELEGRAM_MODULE_OPTIONS) options: TelegramOptionsInterface,
  ) {
    this.bot = new Telegraf(options.token);
    this.options = options;
  }

  async sendMessage(message: string, chatId: string = this.options.chatId) {
    await this.bot.telegram.sendMessage(chatId, message);
  }
}
