// pages/api/upload.js
import {sendResponse} from "@/lib/utils";
import {v2 as cloudinary} from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "50mb",
    },
  },
};

export async function POST(req: Request) {
  try {
    const {data} = await req.json();
    const uploadResponse = await cloudinary.uploader.upload(data, {
      // upload_preset: "your_upload_preset",
    });
    return Response.json(
      sendResponse({
        statusCode: 200,
        success: true,
        message: "File Uploaded successfully!",
        data: uploadResponse.secure_url,
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
