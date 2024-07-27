import {Category} from "./category";
import {Color} from "./color";
import {User} from "./user";

export type MultiSelectProps = {
  options: Category[];
  selected: Category[];
  onChange: (selected: Category[]) => void;
};
export type TodoAddProps = {
  categories: Category[];
  colors: Color[];
  user: User;
};
