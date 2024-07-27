"use server";

import {prisma} from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const color = await request.json();
    console.log(color);
    const newColor = await prisma?.color.create({
      data: color,
    });

    return Response.json({newColor: newColor});
  } catch (error) {
    console.log(error);
    return Response.json(error);
  }
}
export async function GET() {
  try {
    const colors = await prisma?.color.findMany({});
    return Response.json(colors);
  } catch (error) {
    return Response.json(error);
  }
}
