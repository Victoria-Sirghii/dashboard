export interface User {
  firstName: string;
  lastName: string;
  gender: string;
  birthday: string;
  email: string;
  password: string;
  confirmation: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface NewUser {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
}
export interface NewPost {
  id: string;
  name: string;
  color: string;
  year: string;
  pantone_value: string;
}

export type IdParams = {
  id: string;
};
