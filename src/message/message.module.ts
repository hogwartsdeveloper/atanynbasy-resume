import { Module } from '@nestjs/common';
import { MessageController } from './message/message.controller';
import { TelegramModule } from 'nestjs-telegram';
import { MessageService } from './message/message.service';

@Module({
  controllers: [MessageController],
  imports: [
    TelegramModule.forRoot({
      botKey: '5466333407:AAE8cndpOFrzmSjAp7acPhJfQPmMVClrU48',
    }),
  ],
  providers: [MessageService],
})
export class MessageModule {}
