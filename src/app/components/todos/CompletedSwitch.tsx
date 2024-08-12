"use client";
import React, {useCallback, useState} from "react";
import {Switch} from "@/components/ui/switch";
import {Label} from "@/components/ui/label";
import {useRouter, useSearchParams, usePathname} from "next/navigation";

const CompletedSwitch = () => {
  const {replace} = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      replace(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, replace]
  );
  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="completed" className="text-sm">
        Completed Todos
      </Label>
      <Switch id="completed" checked={searchParams.get("completed")?.toString() === "true" ? true : false} onCheckedChange={(check) => createQueryString("completed", check.toString())} />
    </div>
  );
};

export default CompletedSwitch;
