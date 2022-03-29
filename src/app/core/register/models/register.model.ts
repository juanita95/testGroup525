export interface GenderSelect {
  id: number;
  gender: string;
}

export interface Locations {
  id: number;
  name: string;
  states: States[];
}

export interface States {
  id: number;
  name: string;
  cities: Cities[];
}

export interface Cities {
  id: number;
  name: string;
}

export enum GendersEnum {
  FEMALE = 'Femenino',
  MALE = 'Masculino',
}


