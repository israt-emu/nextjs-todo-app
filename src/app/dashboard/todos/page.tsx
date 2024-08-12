import {getAllTodo} from "@/app/actions/todo";
import {Todo} from "@/app/types/todo";
import React, {Suspense} from "react";
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
import AddTodo from "@/app/components/todos/AddTodo";
import {getUserFromToken} from "@/app/actions/cookie";
import {User} from "@/app/types/user";
import {Skeleton} from "@/components/ui/skeleton";

const Todos = async ({searchParams}: {searchParams?: {[key: string]: string | string[] | undefined}}) => {
  const data = await getAllTodo(searchParams);
  const categories = await getAllCategory();
  const colors = await getAllColor();
  const user = await getUserFromToken();
  return (
    <section className="py-5 ">
      <div className="w-full md:w-9/12 mx-auto">
        <div className="flex justify-between items-center pb-4  border-b border-gray-300">
          <div className="flex gap-1 items-center">
            <div className="text-2xl font-semibold ">Todos</div>
          </div>
          <AddTodo categories={categories?.data} colors={colors?.data} user={user as User} />
        </div>
        <Suspense
          fallback={
            <div className="space-y-2 w-9/12 mx-auto mt-12">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          }
        >
          <div>
            <div className="py-3  border-b border-gray-300 grid grid-cols-1 md:grid-cols-2 items-center justify-between">
              <SearchTodo />
              <div className="flex items-center justify-center md:justify-end gap-2">
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
        </Suspense>
      </div>
    </section>
  );
};

export default Todos;
