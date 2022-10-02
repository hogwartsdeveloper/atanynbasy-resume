import { Body, Controller, Post } from '@nestjs/common';

@Controller('message')
export class MessageController {
  @Post()
  setMessage(@Body() messageDto: { email: string; message: string }) {
    console.log(messageDto);
  }
}
