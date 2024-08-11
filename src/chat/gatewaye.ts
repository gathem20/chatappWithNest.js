import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway(8000, { cors: { origin: '*' } })
export class chatgateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  handleConnection(client: Socket) {
    console.log('new user is connected', client.id);
    client.broadcast.emit('user is joined', {
      message: `user joined the chat ${client.id}`,
    });
  }
  handleDisconnect(client: Socket) {
    console.log('user is disconnected', client.id);
    this.server.emit('user is left', {
      message: `user left the chat ${client.id}`,
    });
  }

  @SubscribeMessage('newMessage')
  HandleNewMessage(@MessageBody() message: string) {
    console.log(message);
    this.server.emit('replay', message);
  }
}

// socket.on()
