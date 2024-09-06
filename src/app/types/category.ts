import {Color} from "./color";
import {Todo} from "./todo";
import {User} from "./user";

export type Category = {
  id: number;
  name: string;
  userId?: number;
  user?: User;
};
export type TodoCategory = {
  todoId: number;
  categoryId: number;
  todo: Todo;
  category: Category;
};
