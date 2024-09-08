import {getAllTodo} from "@/app/actions/todo";
import React from "react";
import {getAllCategory} from "@/app/actions/category";
import {getUserFromToken} from "@/app/actions/cookie";
import {User} from "@/app/types/user";
import AllTodos from "@/app/components/todos/AllTodos";
import {Category} from "@/app/types/category";

const Todos = async ({searchParams}: {searchParams?: {[key: string]: string | string[] | undefined}}) => {
  const user = await getUserFromToken();
  const categories = await getAllCategory();
  const data = await getAllTodo({...searchParams, userId: user?.userId});
  let usersCategory: Category[] = [];
  //
  categories?.data?.forEach((cat: Category, i: number) => {
    if (!cat?.userId || cat?.userId === user?.userId) {
      return usersCategory.push(cat);
    }
  });
  return (
    <section className="py-5 ">
      <AllTodos categories={usersCategory} user={user as User} todos={data?.data} searchParams={searchParams} />
    </section>
  );
};

export default Todos;
