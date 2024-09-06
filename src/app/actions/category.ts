"use server";
import {revalidateTag} from "next/cache";
import {Category} from "../types/category";

export const createCategory = async (cat: Category) => {
  try {
    const response = await fetch(`http://localhost:3000/api/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cat),
    });
    // Ensure to check and parse the response
    if (!response.ok) {
      throw new Error("Failed to create category");
    }
    revalidateTag("cat");
    const newCat = await response.json();
    return newCat;
  } catch (error) {
    console.log(error);
  }
};
export const getAllCategory = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/category`, {
      next: {tags: ["cat"]},
    });
    // Ensure to check and parse the response
    if (!response.ok) {
      throw new Error("Failed to get categories");
    }
    const categories = await response.json();
    return categories;
  } catch (error) {
    console.log(error);
  }
};
