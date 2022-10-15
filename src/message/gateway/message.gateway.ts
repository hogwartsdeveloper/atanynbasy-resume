import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: ['http://localhost:4200'] } })
export class MessageGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection() {
    console.log('Connection');
  }

  handleDisconnect() {
    console.log('disconnect');
  }

  @SubscribeMessage('sendMessage')
  handleMessage(socket: Socket, message: 'string') {
    this.server.emit('newMessage', message);
  }
}
