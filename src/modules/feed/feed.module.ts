import { Module } from '@nestjs/common';
import { UserService } from 'src/core/services/user.service';
import { authProviders } from '../auth/auth.provider';
import { DatabaseModule } from '../database/database.module';
import * as dotenv from 'dotenv';
import { FeedController } from './feed.controller';
import { FeedGateway } from './feed.ws.gateway';
import { EventService } from 'src/core/services/event.service';

dotenv.config();

@Module({
  imports: [DatabaseModule],
  controllers: [FeedController],
  providers: [UserService, FeedGateway, EventService, ...authProviders],
})
export class FeedModule {}
