"use client";
import {NoteProvider} from "@/contexts/NoteContext";
import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

const NoteContent = ({note}: any) => {
  const Editor = dynamic(() => import("../components/notes/Editor"), {ssr: false});
  return (
    <NoteProvider>
      <div
        className="h-52  relative"
        style={{
          backgroundImage: `url(${note?.coverImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: `${note?.color?.hexCode || "#9C68B2"}`,
        }}
      >
        {note?.coverEmoji ? (
          <div className="absolute bottom-2 left-2 right-0 flex ">
            <Image src={note.coverEmoji} alt="emoji" width={40} height={15} />
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="text-2xl sm:text-4xl font-bold mt-2">{note?.title}</div>
      <Editor initialContent={note?.content || ""} edit={false} editable={false} />
    </NoteProvider>
  );
};

export default NoteContent;
