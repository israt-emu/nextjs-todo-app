import {prisma} from "@/lib/prisma";
import {sendResponse} from "@/lib/utils";
import {Todo} from "@prisma/client";

//update todo status
export async function PATCH(request: Request) {
  try {
    const {userId, id, completed} = await request.json();
    const todo = await prisma?.todo.findUnique({where: {id, userId}});
    if (!todo?.id) {
      throw new Error("Todo do not found");
    }
    //updating todo
    const updateTodo = await prisma?.todo.update({
      where: {id, userId},
      data: {completed},
    });

    return Response.json(
      sendResponse<Partial<Todo>>({
        statusCode: 200,
        success: true,
        message: "Task updated successfully!",
        data: updateTodo,
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
