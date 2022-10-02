import { Body, Controller, Post } from '@nestjs/common';
import { IMessage } from '../types/message.type';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Post()
  setMessage(@Body() messageDto: IMessage) {
    this.messageService.sendTelegramMessage(messageDto);
  }
}
