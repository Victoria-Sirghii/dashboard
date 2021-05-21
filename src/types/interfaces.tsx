export interface User {
  id?: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  avatar?: string;
}
export interface Post {
  id: string;
  name: string;
  color: string;
  year: string;
  pantone_value: string;
}

export interface Sort {
  title: React.ReactNode;
  value: string;
}

export interface Checks {
  [index: number]: boolean;
}
