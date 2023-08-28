import { Body, Controller, Delete, Post, Put, UseGuards } from '@nestjs/common';
import {
  Evento,
  Post as Posts,
  ComentarioDto,
} from 'src/core/model/events.model';
import { Usuario } from 'src/core/model/user.model';
import { EventService } from 'src/core/services/event.service';
import { AuthGuard } from '../auth/auth.guards';
import { FeedGateway } from './feed.ws.gateway';

@UseGuards(AuthGuard)
@Controller('feed')
export class FeedController {
  constructor(
    private readonly eventService: EventService,
    private readonly feedGateway: FeedGateway,
  ) {}

  @Post('criar-evento')
  async createEvent(@Body() evento: Evento): Promise<Evento> {
    return this.eventService.createEvent(false, evento);
  }
  @Post('criar-post')
  async createPost(@Body() post: Posts): Promise<Posts> {
    const createPost = await this.eventService
      .createPost(false, post)
      .then((result: Posts) => {
        this.feedGateway.sendUpdateSignal(result);
        return result;
      });
    return createPost;
  }
  @Post('criar-comentario')
  async createComment(
    @Body()
    dto: ComentarioDto,
  ): Promise<boolean> {
    return this.eventService.createComment(dto.comentario, dto.id);
  }
  @Post('participar')
  async joinEvent(
    @Body() eventId: string,
    user: Usuario,
    isJoining: boolean,
  ): Promise<boolean> {
    return this.eventService.joinEvent(eventId, user, isJoining);
  }
  @Put('editar-evento')
  async editEvent(@Body() evento: Evento): Promise<boolean> {
    return this.eventService.updateEvent(false, evento);
  }
  @Put('editar-post')
  async editPost(@Body() post: Posts): Promise<boolean> {
    return this.eventService.updatePost(false, post);
  }
  @Put('editar-comentario')
  async editComment(@Body() dto: ComentarioDto): Promise<boolean> {
    return this.eventService.updateComment(dto.comentario, dto.id);
  }
  @Delete('deletar-evento')
  async deleteEvent(@Body() eventId: string, userId: string): Promise<boolean> {
    return this.eventService.deleteEvent(false, eventId, userId);
  }

  //nao usar
  @Delete('delete-all')
  async deleteAllPosts(): Promise<boolean> {
    return this.eventService.deleteAllPosts();
  }

  @Delete('deletar-post')
  async deletePost(@Body() postId: string, userId: string): Promise<boolean> {
    return this.eventService.deletePost(false, postId, userId);
  }
  @Delete('deletar-comentario')
  async deleteComment(
    @Body() commentId: string,
    userId: string,
    postId: string,
  ): Promise<boolean> {
    return this.eventService.deleteComment(commentId, userId, postId);
  }
}
