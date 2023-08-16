import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from 'src/core/services/user.service';
import { EventService } from 'src/core/services/event.service';
import { Evento, Post as Posts } from 'src/core/model/events.model';
import { PromotionInfo } from 'src/core/model/user.model';
import { AuthGuard } from '../auth/auth.guards';

@UseGuards(AuthGuard)
@Controller('gestao')
export class ManagementController {
  constructor(
    private readonly userService: UserService,
    private readonly eventService: EventService,
  ) {}

  @Get()
  async getAllEventsPGE(): Promise<Evento[]> {
    return this.eventService.findEvents(true);
  }
  @Get()
  async getEventById(@Body() eventId: string): Promise<Evento | null> {
    return this.eventService.getEventById(eventId);
  }

  @Post('promover')
  async promoteUser(@Body() promotionInfo: PromotionInfo): Promise<boolean> {
    return this.userService.promoteUser(promotionInfo);
  }
  @Post('criar-evento-pge')
  async createEventPGE(@Body() evento: Evento): Promise<Evento> {
    return this.eventService.createEvent(true, evento);
  }
  @Post('criar-post-pge')
  async createPostPGE(@Body() post: Posts): Promise<Posts> {
    return this.eventService.createPost(true, post);
  }
  @Put('editar-evento-pge')
  async editEventPGE(@Body() event: Evento): Promise<boolean> {
    return this.eventService.updateEvent(true, event);
  }
  @Put('editar-post-pge')
  async editPostPGE(@Body() post: Posts): Promise<boolean> {
    return this.eventService.updatePost(true, post);
  }
  @Delete('deletar-evento-pge')
  async deleteEventPGE(
    @Body() eventId: string,
    userId: string,
  ): Promise<boolean> {
    return this.eventService.deleteEvent(true, eventId, userId);
  }
  @Delete('deletar-post-pge')
  async deletePostPGE(
    @Body() postId: string,
    userId: string,
  ): Promise<boolean> {
    return this.eventService.deletePost(true, postId, userId);
  }
}
