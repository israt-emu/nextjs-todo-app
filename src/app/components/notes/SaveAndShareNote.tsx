"use client";
import React, {useState} from "react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {CheckCheck, CheckSquare, Copy, Share} from "lucide-react";
import {useNote} from "@/contexts/NoteContext";
import {createNote, updateNote} from "@/app/actions/note";
import {toast} from "@/components/ui/use-toast";
import {SaveShareProps} from "@/app/types/props";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";

const SaveAndShareNote = ({edit, noteId, userId}: SaveShareProps) => {
  const {note, setLoading} = useNote();
  const [copied, setCopied] = useState(false);
  const url = `${window.location.origin}/preview?userId=${note.userId}&noteId=${noteId}`;
  //saving note
  const saveNote = async () => {
    setLoading(true);
    let res;
    if (edit) {
      res = await updateNote(noteId as number, note, userId as number);
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
  const onCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
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
        {edit ? (
          <Popover>
            <PopoverTrigger>
              {" "}
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
            </PopoverTrigger>
            <PopoverContent className="border-0 bg-gray-300 dark:bg-[#404140]">
              <p className="mb-2">Share your plan with others..</p>
              <div className="grid grid-cols-5 items-center justify-center w-full">
                <div className="col-span-4 border-0 px-1.5 rounded-tl rounded-bl  bg-gray-100 dark:bg-[#5a5c5a]">
                  <Input value={url} readOnly className="bg-transparent border-0 outline-none focus:outline-none h-9" />
                </div>
                <Button size="icon" className="bg-black rounded-tl-none rounded-bl-none rounded-tr rounded-br hover:bg-gray-800 border-6 border-black" onClick={onCopy} disabled={copied}>
                  {copied ? <CheckCheck className="w-5 transition-all" /> : <Copy className="w-5 transition-all" />}
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        ) : null}
      </div>
    </>
  );
};

export default SaveAndShareNote;
