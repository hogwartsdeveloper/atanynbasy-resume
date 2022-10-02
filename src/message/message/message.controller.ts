import { Body, Controller, Post } from '@nestjs/common';
import { TelegramService } from 'nestjs-telegram';

@Controller('message')
export class MessageController {
  constructor(private telegramBotService: TelegramService) {}

  @Post()
  setMessage(@Body() messageDto: { email: string; message: string }) {
    this.telegramBotService.getUpdates({}).subscribe((d) => {
      const chatId = d[0].message.chat.id;
      if (chatId) {
        this.telegramBotService
          .sendMessage({
            chat_id: chatId,
            text: messageDto.email,
          })
          .subscribe();

        this.telegramBotService
          .sendMessage({
            chat_id: chatId,
            text: messageDto.message,
          })
          .subscribe();
      }
    });
  }
}
