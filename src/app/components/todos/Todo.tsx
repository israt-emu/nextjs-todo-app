"use client";

import {toast} from "@/components/ui/use-toast";
import {deleteTodo, updateTodoStatus} from "@/app/actions/todo";
import {TodoUpdateProps} from "@/app/types/props";
import {useState} from "react";
import TodoListView from "./TodoListView";
import TodoCardView from "./TodoCardView";

const SingleTodo = ({todo, categories, params, setIsSuccess}: any) => {
  const [loading, setLoading] = useState<boolean>(false);

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
    if (data?.success) {
      if (data?.data?.completed) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
      }
    }

    if (!data.success) {
      toast({
        variant: "destructive",
        title: "An error occured!",
      });
    }
  };

  return (
    <>
      {params?.view === "grid" ? (
        //
        //
        <TodoCardView todo={todo} categories={categories} loading={loading} todoDelete={todoDelete} changeStatus={changeStatus} />
      ) : (
        <TodoListView todo={todo} categories={categories} loading={loading} todoDelete={todoDelete} changeStatus={changeStatus} />
      )}
    </>
  );
};
export default SingleTodo;
