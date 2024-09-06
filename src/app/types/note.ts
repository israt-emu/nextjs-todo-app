import {Color} from "./color";

export type Note = {
  id?: number;
  title: string;
  content?: string;
  coverImg?: string;
  colorId?: number;
  coverEmoji?: string;
  userId?: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  color?: Color;
};
