"use client";
import Cookies from "js-cookie";

import jwt from "jsonwebtoken";
import {findUserByEmail} from "./user";
export const getUserFromToken = async () => {
  const token = Cookies.get("accessToken");
  console.log(token);
  //   const value = token?.value;
  //   const decoded = jwt.decode(value as string);
  //   if (typeof decoded === "object") {
  //     const user = await findUserByEmail(decoded?.email);
  //     return user;
  //   }
  return null;
};
