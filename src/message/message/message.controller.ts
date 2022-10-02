import { Body, Controller, Post } from '@nestjs/common';
import { IMessage } from '../types/message.type';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Post()
  setMessage(@Body() messageDto: IMessage) {
    this.messageService.sendTelegramMessage(messageDto);
    // this.telegramBotService.getUpdates({}).subscribe((d) => {
    //   const chatId = d[0].message.chat.id;
    //   if (chatId) {
    //     this.telegramBotService
    //       .sendMessage({
    //         chat_id: chatId,
    //         text: messageDto.email,
    //       })
    //       .subscribe();
    //
    //     this.telegramBotService
    //       .sendMessage({
    //         chat_id: chatId,
    //         text: messageDto.message,
    //       })
    //       .subscribe();
    //   }
    // });
  }
}
