export interface User {
  id?: number;
  firstName?: string;
  lastName?: string;
  birthday?: string;
  email?: string;
  password?: string;
  confirmation?: string;
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

export interface Subtask {
  task: string;
  id: number;
  done: boolean;
}

export interface Task {
  id: number;
  user: "string";
  date: "string";
  tasks: Subtask[];
  comments: "string";
  deadline: "string";
  priority: "string";
}

export interface Sort {
  title: React.ReactNode;
  value: string;
}

export interface Checks {
  [index: number]: boolean;
}
