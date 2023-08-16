import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class MessageGateway implements OnGatewayConnection {
  @WebSocketServer()
  private server: Server;

  handleConnection(client: Socket, ...args: any[]) {
    console.log(client.id);
    console.log(args);
  }

  @SubscribeMessage('send-message')
  handleMessage(@MessageBody() body: any): void {
    this.server.emit('message', body);
  }
}
