import {getAllTodo} from "@/app/actions/todo";
import {Todo} from "@/app/types/todo";
import React from "react";
import {getAllCategory} from "@/app/actions/category";
import {getAllColor} from "@/app/actions/color";
import FilterTodo from "../../components/todos/FilterTodo";
import {PlusIcon} from "lucide-react";
import CompletedSwitch from "../../components/todos/CompletedSwitch";
import SortingTodo from "../../components/todos/SortingTodo";
import TodoView from "../../components/todos/TodoView";
import ResetFilter from "../../components/todos/ResetFilter";
import SearchTodo from "../../components/todos/SearchTodo";
import {SingleTodo} from "@/app/components/todos/Todo";

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
          </div>
          <div className="flex items-center gap-1 cursor-pointer">
            <div className="text-secondary hover:bg-secondary hover:text-gray-50 w-6 h-6 rounded-full flex items-center justify-center ">
              <PlusIcon className="w-5 " />
            </div>
            <div className="text-sm">Add Task</div>
          </div>
        </div>
        <div className="py-3  border-b border-gray-300 flex items-center justify-between">
          <SearchTodo />
          <div className="flex items-center justify-center gap-2">
            <ResetFilter />
            <FilterTodo categories={categories?.data} />
            <SortingTodo />
            <TodoView />
            <CompletedSwitch />
          </div>
        </div>

        {data?.data?.map((todo: Todo, i: number) => (
          <div key={i}>
            <SingleTodo todo={todo} categories={categories?.data} colors={colors?.data} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Todos;
