"use server";

import {prisma} from "@/lib/prisma";
import {sendResponse} from "@/lib/utils";
import {Todo} from "@prisma/client";
import {NextRequest} from "next/server";

export async function POST(request: Request) {
  try {
    const result = await prisma.$transaction(async (tx) => {
      const {title, userId, reminder, priority, dueDate, categories} = await request.json();

      // First creating todo
      const newTodo = await tx.todo.create({
        data: {title, userId, reminder, priority, dueDate},
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
      }

      return {newTodo};
    });
    const res = sendResponse<Partial<Todo>>({
      statusCode: 200,
      success: true,
      message: "Task created successfully!",
      data: result.newTodo,
    });
    return Response.json(res);
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
//get todo with search and filter
export async function GET(request: NextRequest) {
  try {
    const searchParams = Object.fromEntries(request.nextUrl.searchParams.entries());
    const {category, dueDate, priority, orderBy, order, completed, todoSearch, userId} = searchParams;
    let whereClause: any = {};
    // Filter by category if provided
    if (category && category !== "all") {
      whereClause.categories = {
        some: {
          category: {
            name: category,
          },
        },
      };
    }
    if (userId) {
      whereClause.userId = Number(userId);
    }
    if (priority && priority !== "all") {
      whereClause.priority = priority;
    }
    //filter by completed
    if (completed === "true") {
      whereClause.completed = true;
    }

    if (completed === "false") {
      whereClause.completed = false;
    }

    //search
    if (todoSearch) {
      whereClause.OR = [{title: {contains: todoSearch, mode: "insensitive"}}];
    }

    // Filter by reminder
    if (dueDate && dueDate !== "all") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      //todays todo
      if (dueDate === "today") {
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        whereClause.dueDate = {
          gte: today,
          lt: tomorrow,
        };
      }
      //this week todos
      if (dueDate === "this-week") {
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay()); // Set to Sunday

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(endOfWeek.getDate() + 7); // Set to next Sunday

        whereClause.dueDate = {
          gte: startOfWeek,
          lt: endOfWeek,
        };
      }
      //this month todos
      if (dueDate === "this-month") {
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        endOfMonth.setHours(23, 59, 59, 999); // Set to end of last day of month

        whereClause.dueDate = {
          gte: startOfMonth,
          lte: endOfMonth,
        };
      }
      if (dueDate === "next-30") {
        const today = new Date();
        const thirtyDaysFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);

        whereClause.dueDate = {
          gte: today,
          lte: thirtyDaysFromNow,
        };
      }
    }
    ///orderClause
    let orderClause: any = [];
    if (orderBy && order) {
      orderClause.push({[orderBy]: order});
    } else {
      orderClause.push({createdAt: "desc"});
    }

    //getting todo
    const todos = await prisma?.todo.findMany({
      where: {
        AND: {...whereClause},
      },
      orderBy: orderClause,
      include: {
        categories: {include: {category: true}},
      },
    });
    // console.log(todos);
    return Response.json(
      sendResponse<Todo[]>({
        statusCode: 200,
        success: true,
        message: "Task created successfully!",
        data: todos,
      })
    );
  } catch (error) {
    return Response.json(
      sendResponse({
        statusCode: 400,
        success: false,
        message: "An error occured!",
      })
    );
  }
}
