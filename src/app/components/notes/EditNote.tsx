"use client";
import {NoteProvider} from "@/contexts/NoteContext";
import React from "react";
import NoteBanner from "./NoteBanner";
import SaveAndShareNote from "./SaveAndShareNote";
import dynamic from "next/dynamic";
import {EditNoteProps} from "@/app/types/props";

const EditNote = ({colors, note}: EditNoteProps) => {
  const Editor = dynamic(() => import("./Editor"), {ssr: false});
  return (
    <div>
      <NoteProvider>
        <div className="mx-auto pt-3 mt-6 md:mt-12">
          <SaveAndShareNote edit={true} noteId={note?.id} />
          <NoteBanner colors={colors} singleNote={note} />
          <Editor initialContent={note?.content as string} edit={true} editable={true} />
        </div>
      </NoteProvider>
    </div>
  );
};

export default EditNote;
