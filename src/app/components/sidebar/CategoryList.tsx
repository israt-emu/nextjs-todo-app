"use client";
import {Category} from "@/app/types/category";
import {ScrollArea} from "@/components/ui/scroll-area";
import {CopyCheck, PlusIcon} from "lucide-react";
import Link from "next/link";
import React from "react";

const CategoryList = ({categories}: any) => {
  return (
    <div>
      <div className="py-2 space-y-1 text-sm">
        <div className="rounded-sm">
          <Link href="#" className="flex items-center p-2 space-x-3 rounded-md">
            <span className="uppercase font-semibold">category</span>
          </Link>
          <ScrollArea className="h-[90px]">
            <div>
              {categories?.map((cat: Category, i: number) => (
                <div key={i} className="rounded-sm">
                  <Link href="#" className="flex items-center px-2 py-1 space-x-3 rounded-md">
                    <CopyCheck className="w-5" style={{color: cat?.color?.hexCode}} />
                    <span className="capitalize">{cat?.name}</span>
                  </Link>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="rounded-sm">
            <Link href="#" className="flex items-center px-2 py-1 space-x-3 rounded-md">
              <PlusIcon />
              <span>Add New Category</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
