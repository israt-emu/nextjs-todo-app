import {prisma} from "@/lib/prisma";
import {sendResponse} from "@/lib/utils";
import {Todo} from "@prisma/client";
import {NextRequest, NextResponse} from "next/server";

export async function DELETE(request: NextRequest, {params}: {params: {slug: string}}) {
  try {
    const slug = params.slug;
    const searchParams = Object.fromEntries(request.nextUrl.searchParams.entries());
    const {userId} = searchParams;
    const result = await prisma.$transaction(async (tx) => {
      // Deleting categories (if any)
      await tx.todoCategory.deleteMany({
        where: {
          todoId: Number(slug),
          todo: {
            userId: Number(userId),
          },
        },
      });
      // Deleting todo
      const deleteTodo = await tx.todo.delete({
        where: {id: Number(slug), userId: Number(userId)},
      });

      return "Todo and associated categories deleted successfully!";
    });
    return NextResponse.json(
      sendResponse({
        statusCode: 200,
        success: true,
        message: result,
      })
    );
  } catch (error) {
    return NextResponse.json(
      sendResponse({
        statusCode: 400,
        success: false,
        message: (error as any).message,
      })
    );
  }
}
//get todo by id
export async function GET(request: NextRequest, {params}: {params: {slug: string}}) {
  try {
    const slug = params.slug;
    const searchParams = Object.fromEntries(request.nextUrl.searchParams.entries());
    const {userId} = searchParams;
    const todo = await prisma?.todo.findUnique({where: {id: Number(slug), userId: Number(userId)}, include: {categories: {include: {category: true}}}});
    return NextResponse.json(
      sendResponse<Partial<Todo>>({
        statusCode: 200,
        success: true,
        message: "Task retrieved successfully!",
        data: todo,
      })
    );
  } catch (error) {
    return NextResponse.json(
      sendResponse({
        statusCode: 400,
        success: false,
        message: (error as any).message,
      })
    );
  }
}
//update todo
export async function PATCH(request: NextRequest, {params}: {params: {slug: string}}) {
  try {
    const slug = params.slug;
    const {userId, data, newCategories} = await request.json();
    const result = await prisma.$transaction(async (tx) => {
      const todo = await tx?.todo.findUnique({where: {id: Number(slug), userId: Number(userId)}, include: {categories: true}});
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
          where: {
            todoId: Number(slug),
            todo: {
              userId: Number(userId),
            },
          },
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

    return NextResponse.json(
      sendResponse<Partial<Todo>>({
        statusCode: 200,
        success: true,
        message: "Task updated successfully!",
        data: result.updateTodo,
      })
    );
  } catch (error) {
    return NextResponse.json(
      sendResponse({
        statusCode: 400,
        success: false,
        message: (error as any).message,
      })
    );
  }
}
