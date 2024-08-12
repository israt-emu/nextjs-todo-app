"use client";
import {CalendarDays, ChevronsRight, ClipboardList, ListChecks, PlusCircle} from "lucide-react";
import Link from "next/link";
import React from "react";

const TasksList = ({collapse}: any) => {
  return (
    <div>
      <ul className="text-sm">
        <li className="rounded-sm hover:bg-gray-100 dark:hover:bg-[#404140]">
          <Link href="/dashboard/todos" className={`flex items-center py-2 rounded-md ${collapse ? "px-1 justify-center" : "space-x-3  px-2"}`}>
            <ListChecks className="text-[#8544a0] dark:text-purple-500" />
            {!collapse ? <span className="truncate">Todos</span> : ""}
          </Link>
        </li>
        <li className="rounded-sm hover:bg-gray-100 dark:hover:bg-[#404140]">
          <Link href="/dashboard/upcoming-todos" className={`flex items-center py-2 rounded-md ${collapse ? "px-1 justify-center" : "space-x-3  px-2"}`}>
            <ChevronsRight className="text-sky-800 dark:text-sky-400" />
            {!collapse ? <span className="truncate">Upcoming Todos</span> : ""}
          </Link>
        </li>

        <li className="rounded-sm hover:bg-gray-100 dark:hover:bg-[#404140]">
          <Link href="/dashboard/calendar" className={`flex items-center py-2 rounded-md ${collapse ? "px-1 justify-center" : "space-x-3  px-2"}`}>
            <CalendarDays className="text-pink-800 dark:text-pink-400" />
            {!collapse ? <span className="truncate">Calendar</span> : ""}
          </Link>
        </li>
        <li className="rounded-sm hover:bg-gray-100 dark:hover:bg-[#404140]">
          <Link href="/dashboard/notes" className={`flex items-center py-2 rounded-md ${collapse ? "px-1 justify-center" : "space-x-3  px-2"}`}>
            <ClipboardList className="text-yellow-600 dark:text-yellow-500" />
            {!collapse ? <span className="truncate">Sticky Notes</span> : ""}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default TasksList;
