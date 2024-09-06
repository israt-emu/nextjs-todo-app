"use client";

import React, {useState} from "react";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import {Trash2} from "lucide-react";
import {Button} from "@/components/ui/button";
import {deleteNote} from "@/app/actions/note";
import {toast} from "@/components/ui/use-toast";
import Spinner from "@/components/ui/Spinner";

const DeleteNote = ({noteId}: {noteId: number}) => {
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    setLoading(true);
    const res = await deleteNote(noteId);
    setLoading(false);
    if (res?.success) {
      toast({
        title: "Note Deleted Successfully!",
      });
    } else {
      toast({
        variant: "destructive",
        title: "An error occured!",
      });
    }
  };
  return (
    <Dialog>
      <DialogTrigger>
        <div className="">
          <Trash2 className="w-5" />
        </div>
      </DialogTrigger>
      <DialogContent className="">
        <div>Are you sure want to delete this Note?</div>
        <div className="flex items-center justify-end gap-2">
          <Button className="bg-primary h-8 px-3 flex items-center justify-center gap-2" onClick={handleDelete}>
            {loading && <Spinner color="border-accent" />}
            <span>Yes</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteNote;
