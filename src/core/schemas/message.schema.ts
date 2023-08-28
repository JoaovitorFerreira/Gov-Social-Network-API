import * as mongoose from 'mongoose';
import { MessageChat } from '../model/message.model';

export const MessageSchema = new mongoose.Schema<MessageChat>({
  msgId: String,
  createdAt: Date,
  chat: [
    {
      userName: String,
      userId: String,
      content: String,
      timestamp: Date,
    },
  ],
  usersId: [String],
  lastMsg: {
    userName: String,
    userId: String,
    content: String,
    timestamp: Date,
  },
  usersName: [String],
  responseUser: String,
  requestUser: String,
  requestUserId: String,
  responseUserId: String,
  hasNewMsg: Boolean,
});
