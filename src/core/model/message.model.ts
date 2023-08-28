import { Date } from 'mongoose';

export class MessageChat {
  msgId: string;
  createdAt: Date;
  chat?: ChatMessage[];
  usersId: string[];
  lastMsg?: ChatMessage;
  usersName: string[];
  responseUser: string;
  requestUser: string;
  requestUserId: string;
  responseUserId: string;
  hasNewMsg: boolean;
}

export class ChatMessage {
  userName: string;
  userId: string;
  content: string;
  timestamp: Date;
}
