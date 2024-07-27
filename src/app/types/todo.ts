import {User} from "./user";

export type Todo = {
  id: number;
  title: string;
  createdAt: string;
  completed: boolean;
  updatedAt: string;
  userId: number | User;
};
