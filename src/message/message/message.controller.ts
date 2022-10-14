import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
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

  @Get()
  @ApiOperation({ summary: 'get messages' })
  @ApiResponse({ status: 200, description: 'get message' })
  getMessage() {
    return this.messageService.getMessages();
  }

  @Post()
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'send message' })
  @ApiResponse({ status: 200, description: 'send message' })
  async setMessage(@Body() messageDto: MessageDto) {
    await this.messageService.sendTelegramMessage(messageDto);
    return this.messageService.createMessage(messageDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete message' })
  @ApiResponse({ status: 200, description: 'delete message' })
  async deleteMessage(@Param('id', ParseIntPipe) id: number) {
    return await this.messageService.deleteMessage(id);
  }
}
