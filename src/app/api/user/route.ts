"use server";
import {prisma} from "@/lib/prisma";
import {sendResponse} from "@/lib/utils";
import {User} from "@prisma/client";
import bcrypt from "bcrypt";
export async function POST(request: Request) {
  try {
    const user = await request.json();
    const hashPass = await bcrypt.hash(user.password, 12);
    user.password = hashPass;
    const newUser = await prisma?.user.create({
      data: user,
    });

    return Response.json(
      sendResponse<Partial<User>>({
        statusCode: 200,
        success: true,
        message: "Signed up successfully!",
        data: newUser,
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
    const users = await prisma?.user.findMany({});

    return Response.json(
      sendResponse<User[]>({
        statusCode: 200,
        success: true,
        message: "User retrieved successfully!",
        data: users,
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
export async function PATCH(request: Request) {
  try {
    const data = await request.json();

    const res = await prisma?.user.update({
      where: {userId: Number(data?.userId)},
      data,
    });

    return Response.json(
      sendResponse<Partial<User>>({
        statusCode: 200,
        success: true,
        message: "User updated successfully!",
        data: res,
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
export async function DELETE(request: Request) {
  try {
    const {id} = await request.json();
    const res = await prisma?.user.delete({
      where: {userId: Number(id)},
    });

    return Response.json(
      sendResponse<Partial<User>>({
        statusCode: 200,
        success: true,
        message: "User deleted successfully!",
        data: res,
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
