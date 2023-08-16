import { Module } from '@nestjs/common';
import { UserService } from 'src/core/services/user.service';
import { authProviders } from '../auth/auth.provider';
import { DatabaseModule } from '../database/database.module';
import * as dotenv from 'dotenv';
import { MessageController } from './message.controller';
import { MessageService } from 'src/core/services/message.service';
import { MessageGateway } from './message.ws.gateway';

dotenv.config();

@Module({
  imports: [DatabaseModule],
  controllers: [MessageController],
  providers: [UserService, MessageGateway, MessageService, ...authProviders],
})
export class MessageModule {}
