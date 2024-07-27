import {getAllTodo} from "@/app/actions/todo";
import {Todo} from "@/app/types/todo";
import React from "react";

const TodaysTodos = async () => {
  const data = await getAllTodo();
  // console.log(data);
  return (
    <section className="px-5 py-5">
      {data?.map((todo: Todo, i: number) => (
        <div key={i}>
          <p>{todo.title}</p>
        </div>
      ))}
    </section>
  );
};

export default TodaysTodos;
