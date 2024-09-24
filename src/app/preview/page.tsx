import React from "react";
import {findNoteById} from "../actions/note";
import NoteContent from "./NoteContent";

const NotePreview = async ({searchParams}: {searchParams?: {[key: string]: string | string[] | undefined}}) => {
  const note = await findNoteById(Number(searchParams?.noteId), Number(searchParams?.userId));

  return (
    <div className="w-11/12 sm:w-9/12 mx-auto pt-3 mt-6">
      <NoteContent note={note} />
    </div>
  );
};

export default NotePreview;
