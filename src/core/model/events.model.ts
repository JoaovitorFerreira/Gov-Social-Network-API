import { Usuario } from '../model/user.model';

export interface Post {
  id: string;
  donoPost: Usuario;
  tipoPost?: tipoRealizacaoPost;
  comentarios?: ComentarioPost[];
  descricao: string;
  dataPost: Date;
  usuariosMarcados?: Usuario[];
  imagensAnexadas?: string;
  evento?: Evento;
  postRh: boolean;
}

export interface Evento {
  id: string;
  donoEvento: string;
  dataInicioEvento: Date;
  dataFimEvento: Date;
  horarioInicio: Date;
  horarioFim: Date;
  nomeEvento: string;
  participantes: Usuario[];
  linkTransmissaoEvento: string;
  linkInscricaoEvento: string;
  eventoRh: boolean;
}

export interface OnlineSystemPost extends Post {
  imagemCarregada?: string;
}

export enum tipoRealizacaoPost {
  judicial = 'Judicial',
  academica = 'Acadêmica',
  consultiva = 'Consultiva de Projeto',
}

export interface ComentarioPost {
  donoComentario: Usuario;
  comentario: string;
  dataComentario: Date;
  id?: string;
}
