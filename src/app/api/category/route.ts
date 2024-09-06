"use server";

import {prisma} from "@/lib/prisma";
import {sendResponse} from "@/lib/utils";
import {Category} from "@prisma/client";

export async function POST(request: Request) {
  try {
    const category = await request.json();
    const newCategory = await prisma?.category.create({
      data: category,
    });

    return Response.json(
      sendResponse<Partial<Category>>({
        statusCode: 200,
        success: true,
        message: "Category created successfully!",
        data: newCategory,
      })
    );
  } catch (error) {
    return Response.json(
      sendResponse({
        statusCode: 400,
        success: false,
        message: (error as any)?.message,
      })
    );
  }
}
export async function GET() {
  try {
    const categories = await prisma?.category.findMany({});
    return Response.json(
      sendResponse<Category[]>({
        statusCode: 200,
        success: true,
        message: "Categories retrieved successfully!",
        data: categories,
      })
    );
  } catch (error) {
    return Response.json(
      sendResponse({
        statusCode: 400,
        success: false,
        message: (error as any)?.message,
      })
    );
  }
}
