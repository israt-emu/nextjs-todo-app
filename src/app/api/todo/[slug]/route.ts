import {prisma} from "@/lib/prisma";
import {sendResponse} from "@/lib/utils";
import {Todo} from "@prisma/client";

export async function DELETE(request: Request, {params}: {params: {slug: string}}) {
  try {
    const slug = params.slug;
    const result = await prisma.$transaction(async (tx) => {
      // Deleting todo
      const deleteTodo = await tx.todo.delete({
        where: {id: Number(slug)},
      });

      // Deleting categories (if any)
      await tx.todoCategory.deleteMany({
        where: {todoId: Number(slug)},
      });

      return "Todo and associated categories deleted successfully!";
    });
    return Response.json(
      sendResponse({
        statusCode: 200,
        success: true,
        message: result,
      })
    );
  } catch (error) {
    return Response.json(
      sendResponse({
        statusCode: 400,
        success: false,
        message: (error as any).message,
      })
    );
  }
}
//get todo by id
export async function GET({params}: {params: {slug: string}}) {
  try {
    const slug = params.slug;
    const todo = await prisma?.todo.findUnique({where: {id: Number(slug)}, include: {categories: {include: {category: true}}, color: true}});
    return Response.json(
      sendResponse<Partial<Todo>>({
        statusCode: 200,
        success: true,
        message: "Task retrieved successfully!",
        data: todo,
      })
    );
  } catch (error) {
    return Response.json(
      sendResponse({
        statusCode: 400,
        success: false,
        message: (error as any).message,
      })
    );
  }
}
//update todo
export async function PATCH(request: Request, {params}: {params: {slug: string}}) {
  try {
    const slug = params.slug;
    const {data, newCategories} = await request.json();
    const result = await prisma.$transaction(async (tx) => {
      const todo = await tx?.todo.findUnique({where: {id: Number(slug)}, include: {categories: true}});
      if (!todo?.id) {
        throw new Error("Todo do not found");
      }
      //updating todo
      const updateTodo = await tx.todo.update({
        where: {id: Number(slug)},
        data,
      });

      if (newCategories.length > 0) {
        //first deleting todocategory
        await tx.todoCategory.deleteMany({
          where: {todoId: Number(slug)},
        });

        // Creating category array
        const todoCategories = newCategories.map((cat: number) => ({
          todoId: todo.id,
          categoryId: cat,
        }));
        // Creating categories
        await tx.todoCategory.createManyAndReturn({
          data: todoCategories,
          skipDuplicates: true,
        });
      }
      return {updateTodo};
    });

    return Response.json(
      sendResponse<Partial<Todo>>({
        statusCode: 200,
        success: true,
        message: "Task updated successfully!",
        data: result.updateTodo,
      })
    );
  } catch (error) {
    return Response.json(
      sendResponse({
        statusCode: 400,
        success: false,
        message: (error as any).message,
      })
    );
  }
}
