"use client";
import React from "react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {CheckSquare, Share} from "lucide-react";
import {useNote} from "@/contexts/NoteContext";
import {createNote} from "@/app/actions/note";
import {toast} from "@/components/ui/use-toast";
const SaveAndShareNote = () => {
  const {note, loading, setLoading} = useNote();
  const saveNote = async () => {
    setLoading(true);
    const res = await createNote(note);
    setLoading(false);
    console.log(res);
    if (res?.success) {
      toast({
        title: "Note saved Successfully",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Note saved Successfully",
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
