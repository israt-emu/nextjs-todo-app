import {TodoCategory} from "./category";
import {Color} from "./color";
import {User} from "./user";

export type Todo = {
  id: number;
  title: string;
  createdAt: string;
  completed: boolean;
  updatedAt: string;
  userId: number | User;
  reminder?: Date;
  categories?: TodoCategory[];
  priority: "LOW" | "MEDIUM" | "HIGH";
  dueDate?: Date;
};
