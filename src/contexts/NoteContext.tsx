"use client";
import Cookies from "js-cookie";
import jwt, {JwtPayload} from "jsonwebtoken";
import {Note} from "@/app/types/note";
import React, {createContext, useState, useContext, ReactNode} from "react";

// context type
type NoteContextType = {
  note: Note;
  setNote: (note: Note) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
};
//get token
const token = Cookies.get("accessToken");
const decoded = jwt.decode(token as string);

// Create the context with default values
const NoteContext = createContext<NoteContextType | undefined>(undefined);

// Create the provider component
export const NoteProvider = ({children}: {children: ReactNode}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [note, setNote] = useState<Note>({
    title: "",
    content: "",
    coverImg: "",
    colorId: 0,
    coverEmoji: "",
    userId: 0,
  });
  //setting user id
  if (decoded && typeof decoded !== "string") {
    const payload: JwtPayload = decoded;
    note.userId = payload.userId;
  } else {
    // console.error("Invalid token");
  }

  return <NoteContext.Provider value={{note, setNote, loading, setLoading}}>{children}</NoteContext.Provider>;
};

// Create a custom hook for easy access to the context
export const useNote = () => {
  const context = useContext(NoteContext);
  if (context === undefined) {
    throw new Error("useNote must be used within a noteProvider");
  }
  return context;
};
