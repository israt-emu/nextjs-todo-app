import Image from "next/image";
import React from "react";
import img from "../../assets/avatar.png";
import Link from "next/link";
import {Menu, Search} from "lucide-react";
import TasksList from "../dashboard/components/TasksList";
import CategoryList from "../dashboard/components/CategoryList";
import LogoutButton from "./LogoutButton";
import {getUserFromToken} from "../actions/cookie";
const Sidebar = async () => {
  const user = await getUserFromToken();
  return (
    <div
      className="flex flex-col h-[calc(100vh-16px)] p-3 bg-gray-300 rounded-t-lg
    "
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2>Dashboard</h2>
          <button className="p-2">
            <Menu />
          </button>
        </div>

        {/* ///tasks  */}
        <div className="flex-1">
          <TasksList />
        </div>
        {/* ///category  */}

        <div className="flex-1">
          <CategoryList />
        </div>
      </div>

      <div className="flex items-center p-2 mt-6 space-x-3 justify-self-end">
        <Image src={img} width={50} height={50} alt="" className="w-12 h-12 rounded-lg dark:bg-gray-500" />
        <div>
          <h2 className="text-lg font-semibold">{user?.name}</h2>
          <span className="flex items-center space-x-1">
            <Link href="#" className="text-xs hover:underline">
              View profile
            </Link>
          </span>
        </div>
      </div>
      <LogoutButton />
    </div>
  );
};

export default Sidebar;
