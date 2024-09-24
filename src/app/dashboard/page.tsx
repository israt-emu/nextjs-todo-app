import React from "react";

import {UserDashboard} from "../components/dashboard/UserDashboard";
import {getUserFromToken} from "../actions/cookie";
import {getAllTodo} from "../actions/todo";
import {getAllNotes} from "../actions/note";

const Dashboard = async () => {
  const user = await getUserFromToken();
  const data = await getAllTodo({userId: user?.userId});
  const notes = await getAllNotes(user?.userId as number);
  return (
    <div className="py-4">
      <UserDashboard todos={data?.data} notes={notes?.data} />
    </div>
  );
};

export default Dashboard;
