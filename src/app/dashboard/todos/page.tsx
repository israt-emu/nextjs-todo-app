import {getAllTodo} from "@/app/actions/todo";
import {Todo} from "@/app/types/todo";
import React from "react";
import {SingleTodo} from "./Todo";
import {getAllCategory} from "@/app/actions/category";
import {getAllColor} from "@/app/actions/color";
import FilterTodo from "./FilterTodo";
import {ArrowDownUp, ListFilter, PlusIcon, RotateCcw, Search} from "lucide-react";
import CompletedSwitch from "./CompletedSwitch";
import SortingTodo from "./SortingTodo";
import TodoView from "./TodoView";
import ResetFilter from "./ResetFilter";

const Todos = async ({searchParams}: {searchParams?: {[key: string]: string | string[] | undefined}}) => {
  const data = await getAllTodo(searchParams);
  const categories = await getAllCategory();
  const colors = await getAllColor();

  return (
    <section className="px-5 py-5 ">
      <div className="flex justify-end"></div>
      <div className="w-9/12 mx-auto">
        <div className="flex justify-between items-center pb-4  border-b border-gray-300">
          <div className="flex gap-1 items-center">
            <div className="text-2xl font-semibold ">Tasks</div>
            <ResetFilter />
          </div>
          <div className="flex items-center gap-1">
            <PlusIcon className="w-5" />
            <div className="text-sm">Add Task</div>
          </div>
        </div>
        <div className="py-3  border-b border-gray-300 flex items-center justify-between">
          <div className="flex items-center justify-center gap-2">
            <FilterTodo categories={categories} />
            <SortingTodo />
            <TodoView />
            <CompletedSwitch />
          </div>
        </div>

        {data?.data?.map((todo: any, i: number) => (
          <div key={i}>
            <SingleTodo todo={todo} categories={categories} colors={colors} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Todos;
