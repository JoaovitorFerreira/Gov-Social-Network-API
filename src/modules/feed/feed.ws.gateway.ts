import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { EventService } from 'src/core/services/event.service';

@WebSocketGateway({ namespace: 'feed-ws', cors: true })
export class FeedGateway {
  @WebSocketServer()
  private server: Server;
  constructor(private postService: EventService) {}

  @SubscribeMessage('getPosts')
  async handleMessage() {
    const posts = await this.postService.getAllPostsAndEvents();
    this.server.emit('getPosts', posts);
  }

  async sendUpdateSignal(newPost: any) {
    this.server.emit('newPosts', newPost);
  }
}
