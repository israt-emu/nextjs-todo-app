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
      <div className="mx-auto pt-3 mt-6 md:mt-12">
        <SaveAndShareNote edit={false} />
        <NoteBanner colors={colors} />
        <Editor initialContent="" edit={false} editable={true} />
      </div>
    </NoteProvider>
  );
};

export default AddNote;
