"use server";
import {prisma} from "@/lib/prisma";
import bcrypt from "bcrypt";
export async function POST(request: Request) {
  try {
    const user = await request.json();
    const hashPass = await bcrypt.hash(user.password, 12);
    user.password = hashPass;
    const newUser = await prisma?.user.create({
      data: user,
    });

    return Response.json({newUser: newUser});
  } catch (error) {
    console.log(error);
    return Response.json(error);
  }
}
export async function GET() {
  try {
    const users = await prisma?.user.findMany({});
    // console.log(todos);
    return Response.json(users);
  } catch (error) {
    return Response.json(error);
  }
}

//bcrypt.compare(unhashpass, hashpass)
