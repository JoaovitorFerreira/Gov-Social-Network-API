import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './modules/database/database.module';
import { ProfileModule } from './modules/profile/profile.module';
import { MessageModule } from './modules/message/message.module';
import { FeedModule } from './modules/feed/feed.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    FeedModule,
    ProfileModule,
    MessageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
