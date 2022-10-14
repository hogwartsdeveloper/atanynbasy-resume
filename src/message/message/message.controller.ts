import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MessageDto } from '../dto/message.dto';

@ApiTags('message')
@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'send message' })
  @ApiResponse({ status: 200, description: 'send message' })
  async setMessage(@Body() messageDto: MessageDto) {
    await this.messageService.sendTelegramMessage(messageDto);
    return this.messageService.createMessage(messageDto);
  }
}
