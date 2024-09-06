"use server";

import {prisma} from "@/lib/prisma";
import {revalidateTag} from "next/cache";
import {User} from "../types/user";

export const createUser = async (user: any) => {
  try {
    const response = await fetch(`http://localhost:3000/api/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    // Ensure to check and parse the response
    if (!response.ok) {
      throw new Error("Failed to create user");
    }
    revalidateTag("users");
    const newUser = await response.json();
    return newUser;
  } catch (error) {
    console.log(error);
  }
};
export const getAllUser = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/user`, {
      next: {tags: ["users"]},
    });
    // Ensure to check and parse the response
    if (!response.ok) {
      throw new Error("Failed to get users");
    }
    const users = await response.json();
    return users;
  } catch (error) {
    console.log(error);
  }
};

export const findUserByEmail = async (email: string) => {
  try {
    const user = await prisma?.user.findUnique({
      where: {email},
    });
    return user;
  } catch (error) {
    console.log(error);
  }
};
export const updateUser = async (data: Partial<User>) => {
  try {
    const response = await fetch(`http://localhost:3000/api/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    revalidateTag("users");
    const res = await response.json();
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const deleteUser = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:3000/api/user`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id}),
    });

    revalidateTag("users");
    const user = await response.json();
    return user;
  } catch (error) {
    console.log(error);
  }
};
