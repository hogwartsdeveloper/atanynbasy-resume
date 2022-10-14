import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { IMessage } from '../types/message.type';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Post()
  async setMessage(@Body() messageDto: IMessage) {
    // throw new HttpException('', 400);

    await this.messageService.sendTelegramMessage(messageDto);
  }
}
