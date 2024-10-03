"use client";
import React, {useCallback, useState} from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {PlusIcon} from "lucide-react";
import TodoAddForm from "./TodoAddForm";

const AddTodo = ({categories, user}: any) => {
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="flex items-center gap-1 cursor-pointer">
          <div className="text-primary hover:bg-primary hover:text-gray-50 w-6 h-6 rounded-full flex items-center justify-center ">
            <PlusIcon className="w-5 " />
          </div>
          <div className="text-sm">Add Todo</div>
        </div>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle className="text-center py-2">Add Task</DialogTitle>

          <div>
            <TodoAddForm categories={categories} user={user} handleClose={handleClose} />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddTodo;
