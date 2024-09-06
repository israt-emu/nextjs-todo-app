"use client";
import React from "react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {CheckSquare, Share} from "lucide-react";
import {useNote} from "@/contexts/NoteContext";
import {createNote, updateNote} from "@/app/actions/note";
import {toast} from "@/components/ui/use-toast";
import {SaveShareProps} from "@/app/types/props";
const SaveAndShareNote = ({edit, noteId}: SaveShareProps) => {
  const {note, setLoading} = useNote();
  //saving note
  const saveNote = async () => {
    setLoading(true);
    let res;
    if (edit) {
      res = await updateNote(noteId as number, note);
    } else {
      res = await createNote(note);
    }
    setLoading(false);

    if (res?.success) {
      toast({
        title: "Note saved Successfully",
      });
    } else {
      toast({
        variant: "destructive",
        title: "An error occured!",
      });
    }
  };
  return (
    <>
      <div className="flex items-center gap-3 mb-2 justify-end">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="note-icon" onClick={saveNote}>
                <CheckSquare className="w-4 sm:w-5" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Save</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="note-icon">
                <Share className="w-4 sm:w-5" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Share</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </>
  );
};

export default SaveAndShareNote;
