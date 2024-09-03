"use client";
import React, {useState} from "react";
import {Block, BlockNoteEditor, PartialBlock} from "@blocknote/core";
import {useCreateBlockNote} from "@blocknote/react";
import {BlockNoteView, darkDefaultTheme} from "@blocknote/mantine";
import {useTheme} from "next-themes";
import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";
import {toast} from "@/components/ui/use-toast";
import {lightGrayTheme} from "@/lib/blackNoteTheme";

type EditorProps = {
  initialContent?: PartialBlock[];
  editable?: boolean;
};

const uploadFile = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64data = reader.result;
      try {
        const response = await fetch("http://localhost:3000/api/cloudinary", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({data: base64data}),
        });
        const data = await response.json();
        if (data.success) {
          toast({
            title: "File uploaded Successfully!",
          });
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

const Editor = () => {
  const {resolvedTheme} = useTheme();
  // Stores the document JSON.
  const [blocks, setBlocks] = useState<Block[]>([]);
  const editor: BlockNoteEditor = useCreateBlockNote({
    uploadFile,
  });

  return (
    <div className="mt-4">
      {typeof window !== "undefined" && (
        <BlockNoteView
          editor={editor}
          editable={true}
          theme={resolvedTheme === "dark" ? darkDefaultTheme : lightGrayTheme}
          onChange={() => {
            // Saves the document JSON to state.
            setBlocks(editor.document);
          }}
          emojiPicker={true}
          filePanel={true}
        />
      )}
    </div>
  );
};

export default Editor;
