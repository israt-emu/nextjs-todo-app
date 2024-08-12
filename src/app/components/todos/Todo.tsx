"use client";

import {Checkbox} from "@/components/ui/checkbox";
import {toast} from "@/components/ui/use-toast";
import {CalendarX, FilePenLine, Trash2} from "lucide-react";
import {format} from "date-fns";
import {deleteTodo, updateTodoStatus} from "@/app/actions/todo";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {TodoUpdateProps} from "@/app/types/props";
import {useState} from "react";
import Spinner from "@/components/ui/Spinner";
import Lottie from "react-lottie";
import * as completedSuccess from "../../../animations/completedSuccess.json";
import TodoUpdateForm from "./TodoUpdateForm";

export function SingleTodo({todo, categories, colors}: TodoUpdateProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [stop, setStop] = useState<boolean>(false);
  const [isAnimationPlaying, setIsAnimationPlaying] = useState<boolean>(false);
  const todoDelete = async () => {
    setLoading(true);
    const result = await deleteTodo(todo.id);
    setLoading(false);
    if (result?.success) {
      toast({
        title: "Task Deleted successfully!",
      });
    } else {
      toast({
        variant: "destructive",
        title: "An error occured!",
      });
    }
  };
  const changeStatus = async (e: boolean | string) => {
    setLoading(true);
    const data = await updateTodoStatus(todo?.id, e as boolean);
    setLoading(false);
    if (data.success) {
      setIsAnimationPlaying(true);
      setTimeout(() => {
        setIsAnimationPlaying(false);
      }, 2000);
    }
    if (!data.success) {
      toast({
        variant: "destructive",
        title: "An error occured!",
      });
    }
  };
  const defaultOptions = {
    autoplay: false,
    animationData: completedSuccess,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <>
      {isAnimationPlaying && <Lottie options={defaultOptions} isStopped={false} isClickToPauseDisabled={true} />}
      <div className="flex flex-row justify-between items-center p-4 my-1 border  border-b-gray-300">
        <div className="flex items-center gap-2">
          <Checkbox checked={todo?.completed ? true : false} onCheckedChange={(checked) => changeStatus(checked)} />
          <div className="text-xs sm:text-sm capitalize">
            <div className={`${todo.completed && "text-gray-500"}`}>{todo?.title}</div>

            {todo?.reminder && (
              <div className={`${todo.completed && "text-gray-500"} flex flex-row gap-1 items-center text-xs sm:text-sm`}>
                <CalendarX className="w-3 h-3 sm:w-4 sm:h-4" />
                <p className="h-4">{format(todo?.reminder, "dd/MM/yyyy")}</p>
              </div>
            )}
          </div>
        </div>
        <div>{loading && <Spinner color="border-secondary" />}</div>
        <div className="mr-4 flex gap-2 items-center">
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

          <Sheet>
            <SheetTrigger asChild>
              <FilePenLine className="cursor-pointer w-4" />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Edit Todo</SheetTitle>
                <SheetDescription> Click save when you are done.</SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <TodoUpdateForm categories={categories} colors={colors} todo={todo} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
}
