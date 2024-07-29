import {Color} from "./color";
import {Todo} from "./todo";

export type Category = {
  id: number;
  name: string;
  colorId: number;
  color: Color;
};
export type TodoCategory = {
  todoId: number;
  categoryId: number;
  todo: Todo;
  category: Category;
};
