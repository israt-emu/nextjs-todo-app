import {getAllTodo} from "@/app/actions/todo";
import React from "react";
import {getAllCategory} from "@/app/actions/category";
import {getUserFromToken} from "@/app/actions/cookie";
import {User} from "@/app/types/user";
import AllTodos from "@/app/components/todos/AllTodos";

const Todos = async ({searchParams}: {searchParams?: {[key: string]: string | string[] | undefined}}) => {
  const categories = await getAllCategory();
  const user = await getUserFromToken();
  const data = await getAllTodo({...searchParams, userId: user?.userId});
  return (
    <section className="py-5 ">
      <AllTodos categories={categories?.data} user={user as User} todos={data?.data} searchParams={searchParams} />
    </section>
  );
};

export default Todos;
