import { Mongoose } from 'mongoose';
import { UserSchema } from '../../core/schemas/user.schema';
import { MessageSchema } from 'src/core/schemas/message.schema';
import { EventSchema } from 'src/core/schemas/events.schema';
import { PostSchema } from 'src/core/schemas/post.schema';

export const authProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('User', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'MESSAGE_MODEL',
    useFactory: (mongoose: Mongoose) =>
      mongoose.model('MessageChat', MessageSchema),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'EVENT_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('Event', EventSchema),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'POST_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('Post', PostSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
