"use client";

import {Checkbox} from "@/components/ui/checkbox";

import {CalendarX, FilePenLine, Flag, Trash2} from "lucide-react";
import {format} from "date-fns";

import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import Spinner from "@/components/ui/Spinner";
import TodoUpdateForm from "./TodoUpdateForm";
import {Card, CardFooter, CardHeader} from "@/components/ui/card";
import {priorityColors} from "@/app/constants/colors";
import {useState} from "react";
//
const TodoCardView = ({todo, categories, loading, todoDelete, changeStatus, user,open,setOpen}: any) => {
  
  return (
    <>
      <Card className={`md:w-[200px] lg:w-[240px]  shadow-lg dark:backdrop-blur-md dark:bg-gray-700/30 border border-gray-300 dark:border-gray-900 mt-2 z-20`}>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Checkbox checked={todo?.completed ? true : false} onCheckedChange={(checked) => changeStatus(checked)} />
            <div className="text-xs sm:text-sm capitalize">
              <div className="flex items-center gap-1">
                <div className={`${todo.completed && "text-gray-500"}`}>{todo?.title?.length > 15 ? `${todo.title.substring(0, 15)}...` : todo?.title}</div>
                <Flag className={`${priorityColors[todo?.priority]} w-4`} />
              </div>
              {todo?.dueDate && (
                <div className={`${todo.completed && "text-gray-500"} flex flex-row gap-1 items-center text-xs sm:text-sm`}>
                  <CalendarX className="w-3 h-3 sm:w-4 sm:h-4" />
                  <p className="h-4">{format(todo?.dueDate, "dd/MM/yyyy")}</p>
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        <CardFooter className="flex justify-end items-center gap-2 text-gray-900 dark:text-gray-200">
          <div className="mr-4 flex gap-2 items-center">
            <div>{loading && <Spinner color="border-primary" />}</div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Trash2 className="cursor-pointer mr-3 w-4" onClick={todoDelete} />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <FilePenLine className="cursor-pointer w-4" />
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Edit Todo</SheetTitle>
                  <SheetDescription> Click save when you are done.</SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <TodoUpdateForm categories={categories} todo={todo} user={user} setOpen={setOpen} />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};
export default TodoCardView;
