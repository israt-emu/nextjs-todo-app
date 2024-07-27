"use server";

import {prisma} from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const category = await request.json();
    const newCategory = await prisma?.category.create({
      data: category,
    });

    return Response.json({newCategory: newCategory});
  } catch (error) {
    console.log(error);
    return Response.json(error);
  }
}
export async function GET() {
  try {
    const categories = await prisma?.category.findMany({
      include: {
        color: true,
      },
    });
    return Response.json(categories);
  } catch (error) {
    return Response.json(error);
  }
}
