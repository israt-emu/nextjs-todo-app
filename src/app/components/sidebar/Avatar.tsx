"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import img from "../../../assets/avatar.png";

const Avatar = ({user}: any) => {
  return (
    <div className="flex items-center p-2 mt-6 space-x-3 justify-self-end">
      <Image src={img} width={50} height={50} alt="" className="w-12 h-12 rounded-lg dark:bg-gray-500" />
      <div>
        <h2 className="text-lg font-semibold">{user?.name}</h2>
        <span className="flex items-center space-x-1">
          <Link href="#" className="text-xs hover:underline">
            View profile
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Avatar;
