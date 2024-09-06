"use server";

import {revalidateTag} from "next/cache";
import {Note} from "../types/note";
import {prisma} from "@/lib/prisma";

export const createNote = async (note: Note) => {
  try {
    const response = await fetch(`http://localhost:3000/api/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });

    revalidateTag("notes");
    const newNote = await response.json();
    return newNote;
  } catch (error) {
    console.log(error);
  }
};
export const getAllNotes = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:3000/api/notes?userId=${id}`, {
      next: {tags: ["notes"]},
    });
    // Ensure to check and parse the response
    if (!response.ok) {
      throw new Error("Failed to get notes");
    }
    const notes = await response.json();
    return notes;
  } catch (error) {
    console.log(error);
  }
};
export const findNoteById = async (id: number) => {
  try {
    const note = await prisma?.note.findUnique({where: {id}, include: {color: true}});
    // const response = await fetch(`http://localhost:3000/api/color/getSingle`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({id}),
    // });

    // if (!response.ok) {
    //   throw new Error("Failed to get color");
    // }
    // const color = await response.json();
    // console.log(color);
    return note;
  } catch (error) {
    console.log(error);
  }
};
export const updateNote = async (id: number, note: Note) => {
  try {
    const response = await fetch(`http://localhost:3000/api/notes`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id, note}),
    });

    revalidateTag("notes");
    const updatedNote = await response.json();
    return updatedNote;
  } catch (error) {
    console.log(error);
  }
};
export const deleteNote = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:3000/api/notes`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id}),
    });

    revalidateTag("notes");
    const note = await response.json();
    return note;
  } catch (error) {
    console.log(error);
  }
};
