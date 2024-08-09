"use client";
import Cookies from "js-cookie";

import jwt from "jsonwebtoken";
// import {findUserByEmail} from "./user";
export const getUserFromTokenClient = () => {
  const token = Cookies.get("accessToken");

  const decoded = jwt.decode(token as string);
  console.log(decoded);
  //   if (typeof decoded === "object") {
  //     const user = await findUserByEmail(decoded?.email);
  //     return user;
  //   }
  return decoded;
};
