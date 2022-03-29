export interface User {
  users: UserData[];
}

export interface UserData {
  id?: number;
  sex: string;
  date_birthday: Date;
  name: string;
  last_name: string;
  email: string;
  addres: string;
  country: string;
  Deparment: string;
  City: string;
  comment: string;
  typeHome?: string;
}


