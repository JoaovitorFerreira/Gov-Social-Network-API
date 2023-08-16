import { Date } from 'mongoose';

export interface Job {
  empresa: string;
  setor: string;
  cargo: string;
  descricao: string;
  dataInicio: Date;
  dataFim?: Date;
}
