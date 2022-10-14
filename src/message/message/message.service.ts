import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TelegramService } from 'nestjs-telegram';
import { MessageDto } from './dto/message.dto';

@Injectable()
export class MessageService {
  constructor(private telegramBotService: TelegramService) {}

  sendTelegramMessage(message: MessageDto): Promise<null> {
    return new Promise((resolve, reject) => {
      this.telegramBotService.getUpdates({}).subscribe((data) => {
        try {
          if (data.length) {
            const chat = data[0]?.message?.chat ?? data[0]?.my_chat_member.chat;

            if (chat.username === 'zhannur19') {
              const text = `email: ${message.email},\ntext: '${message.content}'`;
              this.telegramBotService
                .sendMessage({ chat_id: chat.id, text })
                .subscribe(
                  () => {
                    reject(new HttpException('sent message', HttpStatus.OK));
                  },
                  () => {
                    reject(
                      new HttpException(
                        'no sent message',
                        HttpStatus.INTERNAL_SERVER_ERROR,
                      ),
                    );
                  },
                );
            } else {
              throw new HttpException('no chat admin', HttpStatus.BAD_REQUEST);
            }
          } else {
            throw new HttpException('no chat', HttpStatus.BAD_REQUEST);
          }
        } catch (e) {
          console.error(e);
          reject(e);
        }
      });
    });
  }
}
