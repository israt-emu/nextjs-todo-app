"use server";

import {prisma} from "@/lib/prisma";

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
    const newUser = await response.json();
    return newUser;
  } catch (error) {
    console.log(error);
  }
};
export const getAllUser = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/user`);
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
