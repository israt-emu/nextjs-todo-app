"use server";

import {Todo} from "@prisma/client";
import {revalidateTag} from "next/cache";

//we can write database query in .ts file which uses server and also we can create api within app/api folder. The file convention for api route is same as page.

export const createTodo = async (todo: any) => {
  try {
    const response = await fetch(`${process.env.NEXT_API_URL}/api/todo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });

    revalidateTag("todos");
    const newTodo = await response.json();
    return newTodo;
  } catch (error) {
    console.log(error);
  }
};
export const getAllTodo = async (searchParams: any) => {
  try {
    const queryString = Object.entries(searchParams)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as any)}`)
      .join("&");
    const response = await fetch(
      `${process.env.NEXT_API_URL}/api/todo?${queryString}`,

      {
        next: {tags: ["todos"]},
      }
    );

    const todos = await response.json();
    return todos;
  } catch (error) {
    console.log(error);
  }
};
export const getTodoById = async (id: number) => {
  try {
    const response = await fetch(`${process.env.NEXT_API_URL}/api/todo/${id}`);

    const todo = await response.json();
    return todo;
  } catch (error) {
    console.log(error);
  }
};
export const deleteTodo = async (id: number) => {
  try {
    const response = await fetch(`${process.env.NEXT_API_URL}/api/todo/${id}`, {
      method: "DELETE",
    });

    revalidateTag("todos");
    const todo = await response.json();
    return todo;
  } catch (error) {
    console.log(error);
  }
};
export const updateTodo = async (id: number, updateData: {data: object; newCategories: number[]}) => {
  try {
    const response = await fetch(`${process.env.NEXT_API_URL}/api/todo/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });

    revalidateTag("todos");
    const todo = await response.json();
    return todo;
  } catch (error) {
    console.log(error);
  }
};
export const updateTodoStatus = async (id: number, completed: boolean) => {
  try {
    const response = await fetch(`${process.env.NEXT_API_URL}/api/todo/change-status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id, completed}),
    });

    revalidateTag("todos");
    const todo = await response.json();
    return todo;
  } catch (error) {
    console.log(error);
  }
};
