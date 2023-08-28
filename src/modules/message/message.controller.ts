import {
  Controller,
  Body,
  Post,
  UseGuards,
  Delete,
  Get,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guards';
import { MessageService } from 'src/core/services/message.service';
import { CreateChatUserData } from 'src/core/model/user.model';
import { MessageChat } from 'src/core/model/message.model';

@UseGuards(AuthGuard)
@Controller('mensagens')
export class MessageController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    //private readonly userService: UserService,
    private readonly messageService: MessageService,
  ) {}

  @Post()
  async createChat(@Body() chatUserData: CreateChatUserData): Promise<boolean> {
    return this.messageService.createMessageChat(chatUserData);
  }
  @Get('chats/:id')
  async getAllChatsByUser(@Param('id') userId: string): Promise<MessageChat[]> {
    return this.messageService.getAllChatsByUser(userId);
  }
  @Get(':id')
  async getChatById(@Param('id') id: string): Promise<MessageChat | null> {
    return this.messageService.getChatByChatId(id);
  }

  //nao usar
  @Delete('delete-all')
  async deleteAllPosts(): Promise<boolean> {
    return this.messageService.deleteAllMsgs();
  }
}
