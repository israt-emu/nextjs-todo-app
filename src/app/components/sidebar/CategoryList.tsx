"use client";
import {Category} from "@/app/types/category";
import {ScrollArea} from "@/components/ui/scroll-area";
import {CopyCheck, PlusIcon} from "lucide-react";
import Link from "next/link";
import React from "react";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import {Trash2} from "lucide-react";
import AddCategoryForm from "../category/AddCategoryForm";
import {User} from "@/app/types/user";
const CategoryList = ({categories, user}: any) => {
  let usersCategory: Category[] = [];
  //
  categories?.forEach((cat: Category, i: number) => {
    if (!cat?.userId || cat?.userId === user?.userId) {
      return usersCategory.push(cat);
    }
  });

  return (
    <div>
      <div className="py-2 space-y-1 text-sm">
        <div className="rounded-sm">
          <Link href="#" className="flex items-center p-2 space-x-3 rounded-md">
            <span className="uppercase font-semibold">category</span>
          </Link>
          <ScrollArea className="h-[90px]">
            <div>
              {usersCategory?.map((cat: Category, i: number) => (
                <div key={i} className="rounded-sm">
                  <Link href="#" className="flex items-center px-2 py-1 space-x-3 rounded-md">
                    <CopyCheck className="w-5 text-foreground" />
                    <span className="capitalize">{cat?.name}</span>
                  </Link>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="rounded-sm">
            <Dialog>
              <DialogTrigger>
                <div className="flex items-center px-2 py-1 space-x-3 rounded-md cursor-pointer">
                  <PlusIcon />
                  <span>Add New Category</span>
                </div>
              </DialogTrigger>
              <DialogContent className="">
                <div className="text-center">Add Category</div>
                <AddCategoryForm user={user as User} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
