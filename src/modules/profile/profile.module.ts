import { Module } from '@nestjs/common';
import { UserService } from 'src/core/services/user.service';
import { authProviders } from '../auth/auth.provider';
import { DatabaseModule } from '../database/database.module';
import * as dotenv from 'dotenv';
import { ProfileController } from './profile.controller';

dotenv.config();

@Module({
  imports: [DatabaseModule],
  controllers: [ProfileController],
  providers: [UserService, ...authProviders],
})
export class ProfileModule {}
