import {cookies} from "next/headers";
import jwt from "jsonwebtoken";
import {findUserByEmail} from "./user";
export const getUserFromToken = async () => {
  const token = cookies().get("accessToken");
  const value = token?.value;
  const decoded = jwt.decode(value as string);
  if (typeof decoded === "object") {
    const user = await findUserByEmail(decoded?.email);
    return user;
  }
  return null;
};

// export const logOut = () => {
//   cookies().delete("accessToken");
// };
