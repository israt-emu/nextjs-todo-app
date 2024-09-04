"use client";
import React from "react";
import dynamic from "next/dynamic";
import NoteBanner from "./NoteBanner";
import {NoteProvider} from "@/contexts/NoteContext";
import {Color} from "@/app/types/color";
import SaveAndShareNote from "./SaveAndShareNote";

const AddNote = ({colors}: {colors: Color[]}) => {
  const Editor = dynamic(() => import("./Editor"), {ssr: false});

  return (
    <NoteProvider>
      <div className="mx-auto pt-3">
        <SaveAndShareNote />
        <NoteBanner colors={colors} />
        <Editor />
      </div>
    </NoteProvider>
  );
};

export default AddNote;
