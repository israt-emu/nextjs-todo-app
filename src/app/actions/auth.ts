"use server";
import {cookies} from "next/headers";
export const loginUser = async (payload: any) => {
  try {
    const response = await fetch(`${process.env.NEXT_API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    // Ensure to check and parse the response
    if (!response.ok) {
      throw new Error("Failed to login user");
    }

    const res = await response.json();
    //set token to cookies
    cookies().set("accessToken", res.data, {
      secure: false,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
