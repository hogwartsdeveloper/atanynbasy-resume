import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TelegramService } from 'nestjs-telegram';
import { MessageDto } from '../dto/message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from '../../typeorm';
import { Repository } from 'typeorm';
import { MessageGateway } from '../message.gateway';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private telegramBotService: TelegramService,
    private messageGateway: MessageGateway,
  ) {}

  createMessage(messageDto: MessageDto) {
    const message = this.messageRepository.create(messageDto);
    return this.messageRepository.save(message);
  }

  deleteMessage(id: number) {
    return this.messageRepository.delete(id);
  }

  getMessages(): Promise<Message[]> {
    return this.messageRepository.find();
  }

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
                    resolve(null);
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
