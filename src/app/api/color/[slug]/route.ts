import {prisma} from "@/lib/prisma";
import {sendResponse} from "@/lib/utils";
import {Color} from "@prisma/client";

export async function GET({params}: {params: {slug: string}}) {
  try {
    const slug = params?.slug;
    console.log(params);
    const color = await prisma?.color.findUnique({where: {id: Number(slug)}});
    return Response.json(
      sendResponse<Color>({
        statusCode: 200,
        success: true,
        message: "Color retrieved successfully!",
        data: color,
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
