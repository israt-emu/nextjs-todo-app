"use client";
import React from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {PlusIcon} from "lucide-react";
import TodoAddForm from "./TodoAddForm";
import {TodoAddProps} from "@/app/types/props";

const AddTodo = ({categories, user}: TodoAddProps) => {
  return (
    <Dialog>
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
          <TodoAddForm categories={categories} user={user} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddTodo;
