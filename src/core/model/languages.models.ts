export interface Idiomas {
  ingles?: nivelIdioma;
  portugues?: nivelIdioma;
  espanhol?: nivelIdioma;
  alemao?: nivelIdioma;
  frances?: nivelIdioma;
  outros?: { [key: string]: nivelIdioma };
}

export enum nivelIdioma {
  basico = 'Básico',
  intermediario = 'Intermediário',
  avancado = 'Avançado',
  fluente = 'Fluente',
}
