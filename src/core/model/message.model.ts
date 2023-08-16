import { Date } from 'mongoose';

export class MessageChat {
  msgId: string;
  createdAt: Date;
  chat?: ChatMessage[];
  usersId: string[];
  lastMsg?: ChatMessage;
  usersName: string[];
}

/*export class OnlineSystemMessage extends Message {
  responseUser: string;
  responseId: string;
  requestUser: string;
  requestId: string;
  hasNewMsg?: boolean;
}
*/

export class ChatMessage {
  userName: string;
  userId: string;
  content: string;
  timestamp: Date;
}
