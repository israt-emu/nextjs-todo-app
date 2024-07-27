import React from "react";
import TodoAddForm from "../components/TodoAddForm";
import {getAllCategory} from "../actions/category";
import {getAllColor} from "../actions/color";
import {getUserFromToken} from "../actions/cookie";
import {User} from "../types/user";

const Dashboard = async () => {
  const categories = await getAllCategory();
  const colors = await getAllColor();
  const user = await getUserFromToken();
  return (
    <div>
      <TodoAddForm categories={categories} colors={colors} user={user as User} />
    </div>
  );
};

export default Dashboard;
