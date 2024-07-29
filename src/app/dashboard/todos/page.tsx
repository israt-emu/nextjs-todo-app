import {getAllTodo} from "@/app/actions/todo";
import {Todo} from "@/app/types/todo";
import React from "react";
import {SingleTodo} from "./Todo";
import {getAllCategory} from "@/app/actions/category";
import {getAllColor} from "@/app/actions/color";

const Todos = async () => {
  const data = await getAllTodo();
  const categories = await getAllCategory();
  const colors = await getAllColor();
  // console.log(data);
  return (
    <section className="px-5 py-5">
      <div className="text-4xl font-semibold mb-4">Todos</div>
      {data?.map((todo: any, i: number) => (
        <div key={i}>
          <SingleTodo todo={todo} categories={categories} colors={colors} />
        </div>
      ))}
    </section>
  );
};

export default Todos;
