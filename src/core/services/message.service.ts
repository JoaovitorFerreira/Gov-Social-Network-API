import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { MessageChat } from '../model/message.model';
import { CreateChatUserData } from '../model/user.model';

@Injectable()
export class MessageService {
  constructor(
    @Inject('MESSAGE_MODEL') private readonly messageModel: Model<MessageChat>,
  ) {}

  async createMessageChat(chatUserData: CreateChatUserData): Promise<boolean> {
    const chatId = `${chatUserData.reqUserId}${chatUserData.resUserId}`;
    if ((await this.messageModel.find({ msgId: chatId })).length > 0) {
      return true;
    }

    const getDate = new Date();
    const chatToCreate: MessageChat = {
      msgId: chatId,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      createdAt: getDate.toISOString(),
      usersId: [chatUserData.reqUserId, chatUserData.resUserId],
      usersName: [chatUserData.reqUsername, chatUserData.resUsername],
    };
    try {
      await this.messageModel.create(chatToCreate);
      return true;
    } catch (error) {
      return false;
    }
  }

  async getAllChatsByUser(userId: string): Promise<MessageChat[]> {
    const query = { $regex: new RegExp(userId, 'i') };
    return await this.messageModel.find({ msgId: query }).exec();
  }

  async getChatByChatId(chatId: string): Promise<MessageChat | null> {
    return await this.messageModel.findOne({ msgId: chatId });
  }
  async getAllChats(): Promise<MessageChat[]> {
    return await this.messageModel.find().exec();
  }
}
