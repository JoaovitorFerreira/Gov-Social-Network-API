import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatMessage } from 'src/core/model/message.model';
import { MessageService } from 'src/core/services/message.service';

@WebSocketGateway({ namespace: 'message-ws', cors: true })
export class MessageGateway {
  @WebSocketServer()
  private server: Server;
  constructor(private messageService: MessageService) {}

  @SubscribeMessage('chat')
  async onChat(client: Socket, msg: any) {
    //primeiro código recebido é um sinal emitido pelo front
    if (!msg.signal) {
      const chatMsgId = msg.msgId;
      const msgToEmit: ChatMessage = {
        userName: msg.msgToSent.userName,
        userId: msg.msgToSent.userId,
        content: msg.msgToSent.content,
        timestamp: msg.msgToSent.timestamp,
      };
      await this.messageService.updateMsgChat(chatMsgId, msgToEmit);
      client.broadcast.emit('chat', msgToEmit);
    }
  }
}
