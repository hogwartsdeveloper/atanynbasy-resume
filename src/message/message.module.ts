import { Module } from '@nestjs/common';
import { MessageController } from './message/message.controller';
import { TelegramModule } from 'nestjs-telegram';

@Module({
  controllers: [MessageController],
  imports: [
    TelegramModule.forRoot({
      botKey: '5466333407:AAE8cndpOFrzmSjAp7acPhJfQPmMVClrU48',
    }),
  ],
})
export class MessageModule {}
