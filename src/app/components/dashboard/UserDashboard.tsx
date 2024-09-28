import Link from "next/link";
import {Activity, ArrowUpRight, CircleUser, CreditCard, DollarSign, Flag, Menu, Package2, Search, Users} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {PieChartSection} from "./PieChart";
import {Todo} from "@/app/types/todo";
import {Icons} from "../icons";
import {format} from "date-fns";
import {priorityColors} from "@/app/constants/colors";

export function UserDashboard({todos, notes}: any) {
  const currentDate = new Date();
  const data = [
    {
      id: 1,
      title: "Todos",
      color: "text-purple-700 dark:text-purple-600 ",
      value: todos?.length,
      icon: "list",
    },
    {
      id: 1,
      title: "Completed Todos",
      color: "text-green-700 dark:text-green-600",
      value: todos.filter((todo: Todo) => todo?.completed)?.length,
      icon: "circleCheck",
    },
    {
      id: 1,
      title: "Overdue Todos",
      color: "text-red-700 dark:text-red-600",
      value: todos?.filter((todo: any) => {
        const dueDate = new Date(todo?.dueDate);
        return !todo.completed && dueDate < currentDate;
      })?.length,
      icon: "alert",
    },
    {
      id: 1,
      title: "Notes",
      color: "text-yellow-700 dark:text-yellow-600",
      value: notes?.length,
      icon: "notes",
    },
  ];
  const upcomingTodos = todos.filter((todo: any) => {
    const dueDate = new Date(todo.dueDate);
    return !todo.completed && dueDate > currentDate;
  });
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-col gap-y-4 sm:px-6 lg:px-4 py-8 mt-3 md:gap-8 mx-auto w-full">
        <div className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4 ">
          {data?.map((d, i) => {
            const Icon = (Icons as any)[d?.icon || "arrowRight"];
            return (
              <Card className="w-full border-gray-300 dark:border-gray-500" key={i}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{d?.title}</CardTitle>
                  <Icon className={`${d.color} h-5 w-5`} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{d?.value}</div>
                  {/* <p className="text-xs text-muted-foreground">------</p> */}
                </CardContent>
              </Card>
            );
          })}
        </div>
        <div className="grid gap-4 lg:grid-cols-2 w-full">
          <Card className="border-gray-300 dark:border-gray-500" x-chunk="dashboard-01-chunk-4">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle className="text-xl md:text-2xl">Upcoming Todos</CardTitle>
                <CardDescription>Finish your tasks fast..</CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="/dashboard/todos">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>

                    <TableHead className="text-right">Priority</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingTodos?.slice(0, 5)?.map((todo: Todo, i: number) => (
                    <TableRow key={i}>
                      <TableCell>
                        <div className="font-medium">{todo?.title}</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">{format(todo?.dueDate as Date, "dd/MM/yyyy")}</div>
                      </TableCell>

                      <TableCell className="text-right ">
                        <div className="flex items-center justify-end gap-1">
                          <p>{todo?.priority}</p>
                          <Flag className={`${priorityColors[todo?.priority]} w-4`} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card className="border-gray-300 dark:border-gray-500" x-chunk="dashboard-01-chunk-4">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle className="text-xl md:text-2xl">Recurring Todos</CardTitle>
                {/* <CardDescription>Finish your tasks fast..</CardDescription> */}
              </div>
              {/* <Button asChild size="sm" className="ml-auto gap-1 btn-gradient1 dark:btn-gradient2">
                <Link href="/dashboard/todo">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button> */}
            </CardHeader>
            <CardContent>Coming Soon...</CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
