import { Date } from 'mongoose';

export interface Formacao {
  tipo: TipoFormacao;
  instituicao: string;
  curso: string;
  descricao: string;
  dataInicio: Date;
  dataFim?: Date;
}

export type TipoFormacao =
  | 'Graduação'
  | 'Pós-Graduação'
  | 'Especialização'
  | 'Mestrado'
  | 'Doutorado'
  | 'Curso'
  | 'Certificado'
  | 'Palestra'
  | 'Workshop';
