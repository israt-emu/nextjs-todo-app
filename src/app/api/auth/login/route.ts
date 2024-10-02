"use server";

import {prisma} from "@/lib/prisma";
import {createToken, sendResponse} from "@/lib/utils";
import bcrypt from "bcrypt";
import {Secret} from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const {email, password} = await request.json();
    const isExist = await prisma?.user.findUnique({
      where: {email},
    });
    if (isExist?.userId) {
      const passMatch = await bcrypt.compare(password, isExist.password);
      if (passMatch) {
        const token = createToken({email: isExist.email, userId: isExist.userId}, process.env.NEXT_PUBLIC_JWT_SECRET as Secret, {expiresIn: process.env.NEXT_PUBLIC_JWT_EXPIRES_IN});
        return Response.json(
          sendResponse({
            statusCode: 200,
            success: true,
            message: "Logged In successfully!",
            data: token,
          })
        );
      } else {
        throw new Error("User email or password is incorrect!");
      }
    } else {
      throw new Error("User doesn't exists");
    }
  } catch (error) {
    return Response.json(
      sendResponse({
        statusCode: 200,
        success: false,
        message: (error as any)?.message,
      })
    );
  }
}
