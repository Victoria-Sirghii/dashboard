export interface User {
  id?: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  avatar?: string;
}
export interface Post {
  id: number;
  age: number;
  bio: string;
  birthday: string;
  firstName: string;
  lastName: string;
  phone: string;
  sex: string;
}

export interface Sort {
  title: React.ReactNode;
  value: string;
}

export interface Checks {
  [index: number]: boolean;
}
