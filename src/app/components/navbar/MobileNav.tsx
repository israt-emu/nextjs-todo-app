"use client";

import {NavItem, navItems} from "@/app/constants/nav-items";
import {Sheet, SheetTrigger, SheetContent} from "@/components/ui/sheet";
import {LogOut, MenuIcon, User} from "lucide-react";
import React, {useEffect, useState} from "react";
import {Icons} from "../icons";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {usePathname, useRouter} from "next/navigation";
import Cookies from "js-cookie";

const MobileNav = () => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const handleLogout = () => {
    Cookies.remove("accessToken");
    router.push("/signin");
  };

  const pathname = usePathname();
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <div className="absolute top-0 left-0 block md:hidden border rounded border-gray-300 dark:border-gray-100 p-1 z-20 bg-background">
            <MenuIcon />
          </div>
        </SheetTrigger>
        <SheetContent side="left" className="!px-0">
          <div className="space-y-4 py-4">
            <div className="px-3 py-2">
              <div className="space-y-1">
                <div className="text-sm">
                  {navItems?.map((item: NavItem, index) => {
                    const Icon = (Icons as any)[item.icon || "arrowRight"];
                    return (
                      item.href && (
                        <Link key={index} href={item?.href} className={cn("rounded-sm hover:bg-gray-300 dark:hover:bg-[#404140] flex items-center p-2 space-x-3", pathname === item.href && "bg-gray-300 dark:bg-[#404140]")}>
                          <Icon className={item.className} />
                          <span className="truncate">{item.title}</span>
                        </Link>
                      )
                    );
                  })}
                  <Link href="/dashboard/user-profile" className={cn(" p-2 space-x-3 flex items-center hover:bg-gray-300 dark:hover:bg-[#404140] rounded-sm", pathname === "/dashboard/user-profile" && "bg-gray-300 dark:bg-[#404140]")}>
                    <User className="text-orange-700 dark:text-orange-500" />
                    <span className="truncate">Profile</span>
                  </Link>
                  <div className="p-2 space-x-3 flex items-center hover:bg-gray-300 dark:hover:bg-[#404140] rounded-sm" onClick={handleLogout}>
                    <LogOut className="pl-1 text-emerald-800 dark:text-emerald-500" strokeWidth={2.3} />
                    <span className="truncate">Logout</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileNav;
