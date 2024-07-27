"use server";

import {prisma} from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const result = await prisma.$transaction(async (tx) => {
      const {title, userId, colorId, reminder, categories} = await request.json();

      // First creating todo
      const newTodo = await tx.todo.create({
        data: {title, userId, colorId, reminder},
      });

      if (newTodo.id && categories?.length > 0) {
        // Creating category array
        const todoCategories = categories.map((cat: number) => ({
          todoId: newTodo.id,
          categoryId: cat,
        }));

        // Creating categories
        const categoriesAdded = await tx.todoCategory.createManyAndReturn({
          data: todoCategories,
          skipDuplicates: true,
        });

        if (categoriesAdded.length === todoCategories.length) {
          return {newTodo, categoriesAdded};
        } else {
          throw new Error("There was an error adding categories");
        }
      }

      return {newTodo};
    });

    return Response.json(result);
  } catch (error) {
    console.error(error);
    return Response.json({error: "An error occurred during the transaction"}, {status: 500});
  }
}
export async function GET() {
  try {
    const todos = await prisma?.todo.findMany({include: {categories: {include: {category: true}}, color: true}});
    // console.log(todos);
    return Response.json(todos);
  } catch (error) {
    return Response.json(error);
  }
}
export async function DELETE(request: Request) {
  try {
    const {title, userId, colorId, reminder, categories} = await request.json();
    const newTodo = await prisma?.todo.create({
      data: {title, userId, colorId, reminder},
    });
    if (newTodo?.id && categories?.length > 0) {
      const todoCategories = categories?.map((cat: number) => {
        return {todoId: newTodo?.id, categoryId: cat};
      });
      const catgeoryadded = await prisma?.todoCategory.createMany(todoCategories);
    }
    return Response.json({newTodo});
  } catch (error) {
    console.log(error);
    return Response.json(error);
  }
}
