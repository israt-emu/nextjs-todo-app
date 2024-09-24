/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, {useEffect} from "react";
import {BlockNoteEditor, PartialBlock} from "@blocknote/core";
import {useCreateBlockNote} from "@blocknote/react";
import {BlockNoteView, darkDefaultTheme} from "@blocknote/mantine";
import {useTheme} from "next-themes";
import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";
import {toast} from "@/components/ui/use-toast";
import {lightGrayTheme} from "@/lib/blackNoteTheme";
import {useNote} from "@/contexts/NoteContext";

//upload file to cloudinary
const uploadFile = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64data = reader.result;
      try {
        const response = await fetch(`${process.env.NEXT_API_URL}/api/cloudinary`, {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({data: base64data}),
        });
        const data = await response.json();
        if (data.success) {
          resolve(data.data);
        } else {
          throw new Error(data.error || "Upload failed");
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "An Error Occured!",
        });
        reject(error);
      }
    };
  });
};

const Editor = ({initialContent, edit, editable}: {initialContent?: string; edit: boolean; editable: boolean}) => {
  const {resolvedTheme} = useTheme();

  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : [
          {
            type: "paragraph",
            content: "",
          },
        ],
    uploadFile,
  });

  //setting content to note
  const {note, setNote} = useNote();
  useEffect(() => {
    if (initialContent !== "") {
      setNote({
        ...note,
        content: initialContent,
      });
    }
  }, [initialContent]);

  return (
    <div className="mt-4 pb-5">
      {typeof window !== "undefined" && (
        <BlockNoteView
          editor={editor}
          editable={editable}
          theme={resolvedTheme === "dark" ? darkDefaultTheme : lightGrayTheme}
          onChange={() => {
            setNote({
              ...note,
              content: JSON.stringify(editor.document),
            });
          }}
          emojiPicker={true}
          filePanel={true}
        />
      )}
    </div>
  );
};

export default Editor;
