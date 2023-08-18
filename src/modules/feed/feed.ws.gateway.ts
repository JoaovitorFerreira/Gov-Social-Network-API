import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { EventService } from 'src/core/services/event.service';

@WebSocketGateway({ namespace: 'feed-ws', cors: true })
export class FeedGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer()
  private server: Server;
  constructor(private postService: EventService) {}

  afterInit(server: any) {
    console.log('init server');
  }

  handleConnection(client: Socket, ...args: any[]) {
    process.nextTick(() => {
      console.log('conectou');
    });
  }
  handleDisconnect(client: Socket) {
    process.nextTick(() => {
      console.log('descnectou');
    });
  }

  @SubscribeMessage('getPosts')
  async handleMessage(args: any) {
    console.log(args);
    console.log('chegou aq');
    const posts = await this.postService.getAllPostsAndEvents();
    this.server.emit('getPosts', posts);
  }
}
