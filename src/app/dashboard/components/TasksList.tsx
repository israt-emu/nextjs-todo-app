import {CalendarDays, ChevronsRight, ClipboardList, ListChecks} from "lucide-react";
import Link from "next/link";
import React from "react";

const TasksList = () => {
  return (
    <div>
      <ul className="py-2 space-y-1 text-sm">
        <li className="rounded-sm">
          <Link href="#" className="flex items-center p-2 space-x-3 rounded-md">
            <span className="uppercase font-semibold">Tasks</span>
          </Link>
          <ul>
            <li className="rounded-sm">
              <Link href="/dashboard/todos" className="flex items-center px-2 py-1 space-x-3 rounded-md">
                <ListChecks className="text-primary" />
                <span>Todos</span>
              </Link>
            </li>
            <li className="rounded-sm">
              <Link href="/dashboard/upcoming-todos" className="flex items-center px-2 py-1 space-x-3 rounded-md">
                <ChevronsRight className="text-sky-800" />
                <span>Upcoming Todos</span>
              </Link>
            </li>

            <li className="rounded-sm">
              <Link href="/dashboard/calendar" className="flex items-center px-2 py-1 space-x-3 rounded-md">
                <CalendarDays className="text-secondary" />
                <span>Calendar</span>
              </Link>
            </li>
            <li className="rounded-sm">
              <Link href="/dashboard/notes" className="flex items-center px-2 py-1 space-x-3 rounded-md">
                <ClipboardList className="text-yellow-500" />
                <span>Sticky Notes</span>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default TasksList;
