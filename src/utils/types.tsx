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
