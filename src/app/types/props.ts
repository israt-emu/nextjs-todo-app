import {Category} from "./category";
import {Color} from "./color";
import {Note} from "./note";
import {Todo} from "./todo";
import {User} from "./user";

export type MultiSelectProps = {
  options: Category[];
  selected: Category[];
  onChange: (selected: Category[]) => void;
};
export type TodoAddProps = {
  categories: Category[];
  user: User;
  handleClose: () => void;
};
export type TodoUpdateProps = {
  categories: Category[];
  todo: Todo;
  user?: User;
  setOpen: (open: boolean) => void;
  params?:
    | {
        [key: string]: string | string[] | undefined;
      }
    | undefined;
};

export type EditNoteProps = {colors: Color[]; note: Note; userId?: number};
export type NoteBannerProps = {colors: Color[]; singleNote?: Note};
export type SaveShareProps = {edit: boolean; noteId?: number; userId?: number};
