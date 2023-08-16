export interface FiltroUsuario {
  filterType: FilterType;
  filter: string;
}

export enum FilterType {
  area = 'area',
  name = 'name',
  occupation = 'occupation',
  speciality = 'speciality',
}
