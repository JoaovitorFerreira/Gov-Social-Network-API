import { Especialidades } from './specialities.model';
import { Formacao } from './scholarship.model';
import { Hobbies } from './hobbies.model';
import { IdealLocation } from './idealLocation.model';
import { Idiomas } from './languages.models';
import { Job } from './job.model';

export interface Usuario {
  id: string;
  username: string;
  firstAccess: boolean;
  especialidades?: Especialidades;
  hobbies?: Hobbies;
  profilePicture: string;
  currentJob: Job;
  jobs?: Job[];
  formacao?: Formacao[];
  genero: string;
  idiomas?: Idiomas;
  idealLocations?: IdealLocation;
  funcionarioRh: boolean;
  email: string;
  password: string;
  setor: string;
}

export interface UserLoginRequest {
  email: string;
  password: string;
}

export interface CreateChatUserData {
  resUserId: string;
  resUsername: string;
  reqUserId: string;
  reqUsername: string;
}

export interface PromotionInfo {
  userId: string;
  newRole: Job;
}

export interface RecoverPasswordInterface {
  userId: string;
  passToChange: string;
}
