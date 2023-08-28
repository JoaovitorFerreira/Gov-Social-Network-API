import { Model } from 'mongoose';
import {
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Evento, Post, ComentarioPost } from '../model/events.model';
import { Usuario } from '../model/user.model';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class EventService {
  constructor(
    @Inject('USER_MODEL') private readonly userModel: Model<Usuario>,
    @Inject('EVENT_MODEL') private readonly eventModel: Model<Evento>,
    @Inject('POST_MODEL') private readonly postModel: Model<Post>,
  ) {}

  async findEvents(isPGEAdmin: boolean): Promise<Evento[]> {
    return await this.eventModel.find({ eventoRh: isPGEAdmin });
  }

  async findAllEvents(): Promise<Evento[]> {
    return await this.eventModel.find().exec();
  }

  async getAllPostsAndEvents(): Promise<any[]> {
    const posts = await this.postModel
      .find()
      .sort({ dataPost: 'ascending' })
      .exec();
    const events = await this.eventModel
      .find()
      .sort({ dataEvento: 'ascending' })
      .exec();
    const postsAndEvents = [...posts, ...events];
    return postsAndEvents;
  }

  async getEventById(eventId: string): Promise<Evento | null> {
    return await this.eventModel.findOne({ id: eventId });
  }

  async joinEvent(
    eventId: string,
    user: Usuario,
    isJoining: boolean,
  ): Promise<boolean> {
    const event = await this.eventModel.findOne({ id: eventId });
    if (!event) throw new NotFoundException();

    if (isJoining) {
      event.participantes.push(user);
    } else {
      const userPosition = event.participantes.findIndex((userToDelete) => {
        return user.id === userToDelete.id;
      });
      event.participantes.slice(userPosition);
    }
    const eventUpdated = this.eventModel.findOneAndUpdate(
      { id: event.id },
      event,
      (err: any) => {
        if (err) {
          console.log(err);
          throw new InternalServerErrorException();
        }
      },
    );
    return eventUpdated !== null || eventUpdated == true ? true : false;
  }

  async createEvent(isPGEAdmin: boolean, event: Evento): Promise<Evento> {
    return await this.eventModel.create({ ...event, eventoRh: isPGEAdmin });
  }

  async createPost(isPGEAdmin: boolean, post: Post): Promise<Post> {
    const getDate = new Date(post.dataPost).toISOString();
    const newUid = uuidv4();
    const newPost = {
      ...post,
      id: newUid,
      postRh: isPGEAdmin,
      dataPost: getDate,
      evento:
        post.evento == null || post.evento == undefined ? null : post.evento,
    };
    return await this.postModel.create(newPost);
  }

  async createComment(
    comentario: ComentarioPost,
    id: string,
  ): Promise<boolean> {
    const postFound = await this.postModel.findOne({ id }).exec();
    if (postFound) {
      const newUid = uuidv4();
      const newComment: ComentarioPost = {
        id: newUid,
        ...comentario,
      };
      const listaComentarios =
        postFound.comentarios == undefined
          ? [newComment]
          : [...postFound.comentarios, newComment];
      const postUpdated = await this.postModel
        .findOneAndUpdate(
          { id },
          {
            comentarios: listaComentarios,
          },
        )
        .exec();
      return postUpdated !== null;
    } else {
      throw new NotFoundException('nao encontrado');
    }
  }

  async updateEvent(isPGEAdmin: boolean, event: Evento): Promise<boolean> {
    const eventUpdated = this.eventModel.findOneAndUpdate(
      { id: event.id },
      { ...event, eventoRh: isPGEAdmin },
      (err: any) => {
        if (err) {
          console.log(err);
          throw new InternalServerErrorException();
        }
      },
    );
    return eventUpdated !== null || eventUpdated == true ? true : false;
  }

  async updatePost(isPGEAdmin: boolean, post: Post): Promise<boolean> {
    const postUpdated = this.postModel.findOneAndUpdate(
      { id: post.id },
      { ...post, postRh: isPGEAdmin },
      (err: any) => {
        if (err) {
          console.log(err);
          throw new InternalServerErrorException();
        }
      },
    );
    return postUpdated !== null || postUpdated == true ? true : false;
  }

  async updateComment(
    comentario: ComentarioPost,
    postId: string,
  ): Promise<boolean> {
    const post = await this.postModel.findOne({ id: postId });
    if (post == null) {
      throw new NotFoundException();
    }
    const postPosition = post?.comentarios?.findIndex((comentToUpdate) => {
      return comentToUpdate.id === comentario.id;
    });
    if (!postPosition) {
      throw new NotFoundException();
    }
    post.comentarios?.splice(postPosition, 1, comentario);
    const postUpdated = await this.postModel.findOneAndReplace(
      { id: postId },
      post,
      (err: any) => {
        console.log(err);
        throw new InternalServerErrorException();
      },
    );
    return postUpdated !== null || postUpdated == true ? true : false;
  }

  async deleteEvent(
    isPGEAdmin: boolean,
    eventId: string,
    userId: string,
  ): Promise<boolean> {
    const eventToDelete = await this.eventModel.findOne({ id: eventId });
    if (!isPGEAdmin || eventToDelete?.donoEvento.id !== userId) {
      throw new ForbiddenException();
    }
    const postToDelete = await this.eventModel.findOneAndDelete(
      { id: eventId },
      (err: any) => {
        if (err) {
          console.log(err);
          throw new InternalServerErrorException();
        }
      },
    );

    return postToDelete !== null || postToDelete == true ? true : false;
  }

  async deletePost(isPGEAdmin: boolean, postId: string, userId: string) {
    const postToDelete = await this.postModel.findOne({ id: postId });
    if (!isPGEAdmin || postToDelete?.donoPost.id !== userId) {
      throw new ForbiddenException();
    }
    this.postModel.findOneAndDelete({ id: postId }, (err: any) => {
      console.log(err);
      throw new InternalServerErrorException();
    });
    return postToDelete !== null || postToDelete == true ? true : false;
  }

  async deleteAllPosts() {
    const postToDelete = await this.postModel.deleteMany();
    return postToDelete !== null || postToDelete == true ? true : false;
  }

  async deleteComment(
    commentId: string,
    userId: string,
    postId: string,
  ): Promise<boolean> {
    const postToDeleteComment = await this.postModel.findOne({ id: postId });
    if (
      postToDeleteComment == null ||
      postToDeleteComment.comentarios == null
    ) {
      throw new NotFoundException();
    }
    const commentPosition = postToDeleteComment?.comentarios?.findIndex(
      (commentToDelete: ComentarioPost) => {
        return (
          commentToDelete.id === commentId &&
          commentToDelete.donoComentario.id === userId
        );
      },
    );
    postToDeleteComment.comentarios.slice(commentPosition);
    const postUpdated = await this.postModel.findOneAndReplace(
      { id: postId },
      postToDeleteComment,
      (err: any) => {
        console.log(err);
        throw new InternalServerErrorException();
      },
    );
    return postUpdated !== null || postUpdated == true ? true : false;
  }
}
