import { Model } from 'mongoose';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ChatMessage, MessageChat } from '../model/message.model';
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
      responseUser: chatUserData.resUsername,
      requestUser: chatUserData.reqUsername,
      requestUserId: chatUserData.reqUserId,
      responseUserId: chatUserData.resUserId,
      hasNewMsg: false,
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
  async deleteAllMsgs(): Promise<boolean> {
    const msgsToDelete = await this.messageModel.deleteMany();
    return msgsToDelete !== null || msgsToDelete == true ? true : false;
  }
  async updateMsgChat(chatId: string, newMsg: ChatMessage): Promise<boolean> {
    const chatFound = await this.messageModel.findOne({ msgId: chatId }).exec();
    if (!chatFound) {
      throw new InternalServerErrorException(
        'ERRO AO CONECTAR AO BANCO -- CONEXAO AO DOCUMENTO DE MENSAGEM',
      );
    } else {
      const listaChat =
        chatFound.chat == undefined || chatFound.chat.length == 0
          ? [newMsg]
          : [...chatFound.chat, newMsg];
      const updatedChat = await this.messageModel
        .findOneAndUpdate(
          { msgId: chatId },
          { chat: listaChat, lastMsg: newMsg, hasNewMsg: true },
        )
        .exec();
      return updatedChat !== null || updatedChat == true ? true : false;
    }
  }
}
