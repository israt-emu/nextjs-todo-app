import {prisma} from "@/lib/prisma";
import {sendResponse} from "@/lib/utils";
import {Note} from "@prisma/client";
import {NextRequest} from "next/server";

export async function POST(request: Request) {
  try {
    const {colorId, ...note} = await request.json();

    const newNote = await prisma?.note.create({
      data: colorId === 0 ? {...note} : {colorId, ...note},
    });

    return Response.json(
      sendResponse<Partial<Note>>({
        statusCode: 200,
        success: true,
        message: "Note created successfully!",
        data: newNote,
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

export async function GET(request: NextRequest) {
  try {
    const searchParams = Object.fromEntries(request.nextUrl.searchParams.entries());
    const notes = await prisma?.note.findMany({where: {userId: Number(searchParams?.userId)}, include: {color: true}});
    return Response.json(
      sendResponse<Note[]>({
        statusCode: 200,
        success: true,
        message: "Notes retrieved successfully!",
        data: notes,
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
    const {note, id} = await request.json();
    const {colorId, ...others} = note;
    const newNote = await prisma?.note.update({
      where: {id: Number(id)},
      data: colorId === 0 ? {...others} : {colorId, ...others},
    });

    return Response.json(
      sendResponse<Partial<Note>>({
        statusCode: 200,
        success: true,
        message: "Note updated successfully!",
        data: newNote,
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
    const newNote = await prisma?.note.delete({
      where: {id: Number(id)},
    });

    return Response.json(
      sendResponse<Partial<Note>>({
        statusCode: 200,
        success: true,
        message: "Note deleted successfully!",
        data: newNote,
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
