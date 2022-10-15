import { Module } from '@nestjs/common';
import { MessageController } from './message/message.controller';
import { TelegramModule } from 'nestjs-telegram';
import { MessageService } from './message/message.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from '../typeorm';
import { MessageGateway } from './message.gateway';

@Module({
  controllers: [MessageController],
  imports: [
    TypeOrmModule.forFeature([Message]),
    TelegramModule.forRoot({
      botKey: '5466333407:AAE8cndpOFrzmSjAp7acPhJfQPmMVClrU48',
    }),
  ],
  providers: [MessageService, MessageGateway],
})
export class MessageModule {}
