"use client";
import React, {useState} from "react";
import {ChevronLeft, LayoutDashboard, Menu} from "lucide-react";
import TasksList from "./TasksList";
import CategoryList from "./CategoryList";
import LogoutButton from "./LogoutButton";
import Avatar from "./Avatar";
import {cn} from "@/lib/utils";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {NavItem, navItems} from "@/app/constants/nav-items";
import {Icons} from "../icons";
import {TodoAddProps} from "@/app/types/props";
const Sidebar = ({categories, user}: any) => {
  const [collapse, setCollapse] = useState(false);
  const handleToggle = () => {
    setCollapse(!collapse);
  };
  const pathname = usePathname();
  return (
    <div
      className={`relative hidden md:flex flex-col h-[calc(100vh-16px)] md:px-3 pt-8 bg-gray-300 dark:bg-[#2b2c2b] rounded-t-lg  transition-[width] duration-500
       md:col-span-2 ${!collapse ? "w-60" : "w-[72px]"}`}
    >
      <div className="text-sm">
        <ChevronLeft className={cn("absolute -right-3 top-6 z-50  cursor-pointer rounded-full border border-gray-400 bg-background text-3xl text-foreground", collapse && "rotate-180")} onClick={handleToggle} />
        <TooltipProvider>
          {navItems?.map((item: NavItem, index) => {
            const Icon = (Icons as any)[item.icon || "arrowRight"];
            return (
              item.href && (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <Link href={item.href} className={cn("rounded-sm hover:bg-gray-100 dark:hover:bg-[#404140] flex items-center py-2", collapse ? "px-1 justify-center" : "space-x-3  px-2", pathname === item.href && "bg-gray-100 dark:bg-[#404140]")}>
                      <Icon className={item.className} />
                      {!collapse ? <span className="truncate">{item.title}</span> : ""}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent align="center" side="right" sideOffset={8} className={!collapse ? "hidden" : "inline-block"}>
                    {item.title}
                  </TooltipContent>
                </Tooltip>
              )
            );
          })}
        </TooltipProvider>

        {/* ///category  */}

        {collapse || (
          <div className="flex-1">
            <CategoryList categories={categories} user={user} />
          </div>
        )}
      </div>
      <Avatar user={user} collapse={collapse} />
      <LogoutButton collapse={collapse} />
    </div>
  );
};

export default Sidebar;
