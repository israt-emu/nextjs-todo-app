"use server";

import {prisma} from "@/lib/prisma";
import {sendResponse} from "@/lib/utils";
import {Color} from "@prisma/client";

export async function POST(request: Request) {
  try {
    const color = await request.json();
    console.log(color);
    const newColor = await prisma?.color.create({
      data: color,
    });

    return Response.json(
      sendResponse<Partial<Color>>({
        statusCode: 200,
        success: true,
        message: "Color created successfully!",
        data: newColor,
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
    const colors = await prisma?.color.findMany({});
    return Response.json(
      sendResponse<Color[]>({
        statusCode: 200,
        success: true,
        message: "Color retrieved successfully!",
        data: colors,
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
