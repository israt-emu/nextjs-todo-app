"use client";
import {Button} from "@/components/ui/button";
import React from "react";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";
import {LogOut, LogOutIcon} from "lucide-react";

const LogoutButton = () => {
  const router = useRouter();
  const handleLogout = () => {
    Cookies.remove("accessToken");
    router.push("/signin");
  };
  return (
    <button onClick={handleLogout} className="py-1 px-2 rounded flex items-center justify-center bg-transparent border border-primary mt-2 text-green-700">
      <LogOutIcon className="w-5" />
      <p className="ml-2 text-sm font-semibold">Logout</p>
    </button>
  );
};

export default LogoutButton;
