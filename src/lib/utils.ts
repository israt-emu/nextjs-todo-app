import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";
import jwt, {Secret, SignOptions} from "jsonwebtoken";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const createToken = (payload: object, secret_key: Secret, options: SignOptions | undefined) => {
  const token = jwt.sign(payload, secret_key, options);
  return token;
};

export function areArraysEqual(arr1: any, arr2: any) {
  return arr1.length === arr2.length && arr1.every((value: any, index: number) => value === arr2[index]);
}
