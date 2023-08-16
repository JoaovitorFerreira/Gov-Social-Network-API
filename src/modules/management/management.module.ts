import { Module } from '@nestjs/common';
import { UserService } from 'src/core/services/user.service';
import { authProviders } from '../auth/auth.provider';
import { DatabaseModule } from '../database/database.module';
import * as dotenv from 'dotenv';
import { EventService } from 'src/core/services/event.service';
import { ManagementController } from './management.controller';

dotenv.config();

@Module({
  imports: [DatabaseModule],
  controllers: [ManagementController],
  providers: [UserService, EventService, ...authProviders],
})
export class ManagementModule {}
