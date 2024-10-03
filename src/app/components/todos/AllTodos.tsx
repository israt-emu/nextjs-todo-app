"use client";
import React, {useState} from "react";
import AddTodo from "./AddTodo";
import SearchTodo from "./SearchTodo";
import ResetFilter from "./ResetFilter";
import FilterTodo from "./FilterTodo";
import SortingTodo from "./SortingTodo";
import TodoView from "./TodoView";
import CompletedSwitch from "./CompletedSwitch";
import SingleTodo from "./Todo";
import {Todo} from "@/app/types/todo";
import {User} from "@/app/types/user";
import Player from "lottie-react";
import completedSuccess from "../../../animations/completedSuccess.json";
import NoDataPlayer from "../players/DataNotFound";

const AllTodos = ({categories, todos, user, searchParams}: any) => {
  const [isSuccess, setIsSuccess] = useState(false);
  return (
    <>
      {isSuccess && (
        <div className="absolute inset-0 flex justify-center items-center z-20">
          <Player autoplay loop={false} animationData={completedSuccess} />
        </div>
      )}
      <div className="relative w-full md:w-11/12 lg:w-9/12 mx-auto mt-6">
        <div className="flex justify-between items-center pb-4  border-b border-gray-300">
          <div className="flex gap-1 items-center">
            <div className="text-2xl font-semibold ">Todos</div>
          </div>
          <AddTodo categories={categories} user={user as User} />
        </div>

        <div>
          <div className="py-3  border-b border-gray-300 grid grid-cols-1 md:grid-cols-2 items-center justify-between">
            <SearchTodo />
            <div className="col-span-1 flex items-center justify-center md:justify-end gap-2">
              <ResetFilter />
              <FilterTodo categories={categories} />
              <SortingTodo />
              <TodoView />
              <CompletedSwitch />
            </div>
          </div>
          {todos?.length === 0 && (
            <div>
              <NoDataPlayer />
            </div>
          )}

          <div className={`grid  ${searchParams?.view === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2" : "grid-cols-1"} `}>
            {todos?.map((todo: Todo, i: number) => (
              <div key={i}>
                <SingleTodo todo={todo} categories={categories} params={searchParams} setIsSuccess={setIsSuccess} user={user} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllTodos;
