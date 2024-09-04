import {prisma} from "@/lib/prisma";
import {sendResponse} from "@/lib/utils";
import {Note} from "@prisma/client";

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

export async function GET() {
  try {
    const notes = await prisma?.note.findMany({include: {color: true}});
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
