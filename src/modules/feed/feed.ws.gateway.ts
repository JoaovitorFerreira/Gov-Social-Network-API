import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class FeedGateway implements OnGatewayConnection {
  @WebSocketServer()
  private server: Server;

  handleConnection(client: Socket, ...args: any[]) {
    console.log(client.id);
    console.log(args);
    this.server.emit('posts');
  }

  @SubscribeMessage('post-feed')
  handleMessage(@MessageBody() body: any): void {
    this.server.emit('feed', body);
  }
}
