import {Plus} from "lucide-react";
import Image from "next/image";
import React from "react";
import notFound from "../../../assets/notes-not-found.png";
import Link from "next/link";
import {getAllNotes} from "@/app/actions/note";
import {Note} from "@/app/types/note";
import SingleNote from "@/app/components/notes/SingleNote";
import {getUserFromToken} from "@/app/actions/cookie";
import NoDataPlayer from "@/app/components/players/DataNotFound";
const StickyNotes = async () => {
  const user = await getUserFromToken();
  const notes = await getAllNotes(user?.userId as number);

  return (
    <div className="sm:w-11/12 lg:w-full mx-auto relative mt-6 ">
      <h1 className="text-2xl font-semibold border-b border-gray-300 pb-3 ">Notes</h1>
      {notes?.data?.length === 0 ? (
        <div className="w-10/12 mx-auto">
          <NoDataPlayer />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-5">
            {notes?.data?.map((note: Note, i: number) => (
              <SingleNote key={i} note={note} userId={user?.userId as number}/>
            ))}
          </div>
        </>
      )}

      <Link href={`/dashboard/notes/add-note`}>
        <button className="w-10 h-10 rounded-full bg-primary shadow-xl flex items-center justify-center fixed right-4 bottom-8 md:bottom-12 md:right-10 z-50">
          <Plus className="w-7 text-gray-100" strokeWidth={2.7} />
        </button>
      </Link>
    </div>
  );
};

export default StickyNotes;
