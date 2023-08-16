import * as mongoose from 'mongoose';
import { Post } from '../model/events.model';

export const PostSchema = new mongoose.Schema<Post>({
  id: String,
  donoPost: String,
  tipoPost: String,
  comentarios: [
    {
      donoComentario: String,
      comentario: String,
      dataComentario: Date,
    },
  ],
  descricao: String,
  dataPost: Date,
  usuariosMarcados: [String],
  imagensAnexadas: String,
  evento: String,
  postRh: Boolean,
});
