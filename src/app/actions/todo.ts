"use server";

import {Todo} from "@prisma/client";
import {revalidateTag} from "next/cache";

//we can write database query in .ts file which uses server and also we can create api within app/api folder. The file convention for api route is same as page.

export const createTodo = async (todo: any) => {
  try {
    const response = await fetch(`http://localhost:3000/api/todo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    // Ensure to check and parse the response
    if (!response.ok) {
      throw new Error("Failed to create todo");
    }
    revalidateTag("todos");
    const newTodo = await response.json();
    return newTodo;
  } catch (error) {
    console.log(error);
  }
};
export const getAllTodo = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/todo`, {next: {tags: ["todos"]}});
    // Ensure to check and parse the response
    if (!response.ok) {
      throw new Error("Failed to get todos");
    }
    const todos = await response.json();
    return todos;
  } catch (error) {
    console.log(error);
  }
};
export const getTodoById = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:3000/api/todo/${id}`);
    // Ensure to check and parse the response
    if (!response.ok) {
      throw new Error("Failed to get todo");
    }
    const todo = await response.json();
    return todo;
  } catch (error) {
    console.log(error);
  }
};
export const deleteTodo = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:3000/api/todo/${id}`, {
      method: "DELETE",
    });
    // Ensure to check and parse the response
    if (!response.ok) {
      throw new Error("Failed to delete todos");
    }
    revalidateTag("todos");
    const todo = await response.json();
    return todo;
  } catch (error) {
    console.log(error);
  }
};
export const updateTodo = async (id: number, updateData: {data: object; newCategories: number[]}) => {
  try {
    const response = await fetch(`http://localhost:3000/api/todo/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });
    // Ensure to check and parse the response
    if (!response.ok) {
      throw new Error("Failed to update todos");
    }
    revalidateTag("todos");
    const todo = await response.json();
    return todo;
  } catch (error) {
    console.log(error);
  }
};
