import { Body, Controller, Delete, Post, Put, UseGuards } from '@nestjs/common';
import {
  Evento,
  ComentarioPost,
  Post as Posts,
} from 'src/core/model/events.model';
import { Usuario } from 'src/core/model/user.model';
import { EventService } from 'src/core/services/event.service';
import { AuthGuard } from '../auth/auth.guards';

@UseGuards(AuthGuard)
@Controller('feed')
export class FeedController {
  constructor(private readonly eventService: EventService) {}

  @Post('criar-evento')
  CreateEvent(@Body() evento: Evento): Promise<Evento> {
    return this.eventService.createEvent(false, evento);
  }
  @Post('criar-post')
  CreatePost(@Body() post: Posts): Promise<Posts> {
    return this.eventService.createPost(false, post);
  }
  @Post('criar-comentario')
  createComment(
    @Body() comentario: ComentarioPost,
    postId: string,
  ): Promise<boolean> {
    return this.eventService.createComment(comentario, postId);
  }
  @Post('participar')
  joinEvent(
    @Body() eventId: string,
    user: Usuario,
    isJoining: boolean,
  ): Promise<boolean> {
    return this.eventService.joinEvent(eventId, user, isJoining);
  }
  @Put('editar-evento')
  editEvent(@Body() evento: Evento): Promise<boolean> {
    return this.eventService.updateEvent(false, evento);
  }
  @Put('editar-post')
  editPost(@Body() post: Posts): Promise<boolean> {
    return this.eventService.updatePost(false, post);
  }
  @Put('editar-comentario')
  editComment(
    @Body() comentario: ComentarioPost,
    postId: string,
  ): Promise<boolean> {
    return this.eventService.updateComment(comentario, postId);
  }
  @Delete('deletar-evento')
  async deleteEvent(@Body() eventId: string, userId: string): Promise<boolean> {
    return this.eventService.deleteEvent(false, eventId, userId);
  }
  @Delete('deletar-post')
  async deletePost(@Body() postId: string, userId: string): Promise<boolean> {
    return this.eventService.deletePost(false, postId, userId);
  }
  @Delete('deletar-comentario')
  deleteComment(
    @Body() commentId: string,
    userId: string,
    postId: string,
  ): Promise<boolean> {
    return this.eventService.deleteComment(commentId, userId, postId);
  }
}
