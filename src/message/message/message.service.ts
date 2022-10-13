import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TelegramService } from 'nestjs-telegram';
import { IMessage } from '../types/message.type';

@Injectable()
export class MessageService {
  constructor(private telegramBotService: TelegramService) {}

  sendTelegramMessage(message: IMessage) {
    this.telegramBotService.getUpdates({}).subscribe((data) => {
      if (data.length) {
        const chat = data[0]?.message?.chat ?? data[0]?.my_chat_member.chat;

        if (chat.username === 'zhannur19') {
          const text = `email: ${message.email},\ntext: '${message.message}'`;
          this.telegramBotService
            .sendMessage({ chat_id: chat.id, text })
            .subscribe(
              () => {},
              () => {
                // rejects(throw new HttpException('', HttpStatus.INTERNAL_SERVER_ERROR));
              },
            );
        }
      }
    });
  }
}
