import React from "react";
import {getAllCategory} from "../actions/category";
import {getAllColor} from "../actions/color";
import {getUserFromToken} from "../actions/cookie";
import {User} from "../types/user";
import TodoAddForm from "../components/todos/TodoAddForm";

const Dashboard = async () => {
  const categories = await getAllCategory();
  const colors = await getAllColor();
  const user = await getUserFromToken();
  return (
    <div>
      <TodoAddForm categories={categories?.data} colors={colors?.data} user={user as User} />
    </div>
  );
};

export default Dashboard;
