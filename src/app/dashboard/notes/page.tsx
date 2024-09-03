import {Plus} from "lucide-react";
import Image from "next/image";
import React from "react";
import notFound from "../../../assets/notes-not-found.png";
import Link from "next/link";
const StickyNotes = () => {
  return (
    <div className="sm:w-11/12 mx-auto relative mt-5">
      <h1 className="text-2xl font-semibold border-b border-gray-300 pb-3">Notes</h1>
      <Image src={notFound} alt="notes-not-found" className="w-2/6 mx-auto mt-12" />
      <div className="text-muted-foreground text-sm text-center">No Matching Records Found!</div>
      <Link href={`/dashboard/notes/add-note`}>
        <button className="w-10 h-10 rounded-full bg-primary shadow-xl flex items-center justify-center fixed right-4 bottom-8 md:bottom-12 md:right-10 z-50">
          <Plus className="w-7 text-gray-100" strokeWidth={2.7} />
        </button>
      </Link>
    </div>
  );
};

export default StickyNotes;
