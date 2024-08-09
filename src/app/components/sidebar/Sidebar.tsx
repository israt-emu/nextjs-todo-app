"use client";
import React, {useState} from "react";
import {ChevronLeft, Menu} from "lucide-react";
import TasksList from "./TasksList";
import CategoryList from "./CategoryList";
import LogoutButton from "./LogoutButton";
import Avatar from "./Avatar";
import {cn} from "@/lib/utils";
const Sidebar = ({categories, user}: any) => {
  const [collapse, setCollapse] = useState(false);
  const handleToggle = () => {
    setCollapse(!collapse);
  };
  return (
    <div
      className={`relative flex flex-col h-[calc(100vh-16px)] px-3 pt-8 bg-gray-300 rounded-t-lg  transition-[width] duration-500
       col-span-2 ${!collapse ? "w-60" : "w-[72px]"}`}
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2>Dashboard</h2>
        </div>
        <ChevronLeft className={cn("absolute -right-3 top-6 z-50  cursor-pointer rounded-full border border-gray-400 bg-background text-3xl text-foreground", collapse && "rotate-180")} onClick={handleToggle} />
        {/* ///tasks  */}
        <div className="flex-1">
          <TasksList />
        </div>
        {/* ///category  */}

        <div className="flex-1">
          <CategoryList categories={categories} />
        </div>
      </div>
      <Avatar user={user} />
      <LogoutButton />
    </div>
  );
};

export default Sidebar;
