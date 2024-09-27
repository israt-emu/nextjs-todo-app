import {Note} from "@/app/types/note";
import React from "react";
import {Card, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Image from "next/image";
import {EditIcon} from "lucide-react";
import Link from "next/link";
import DeleteNote from "./DeleteNote";
const SingleNote = ({note, userId}: {note: Note; userId:number}) => {
  return (
    <>
      <Card className={`md:w-[240px] lg:w-[320px] shadow-lg ${note?.color?.hexCode || "bg-gray-200"} border-gray-300`} style={{background: `${note?.color?.hexCode}`}}>
        <CardHeader>
          <Image src={note?.coverEmoji as string} alt="emoji" width={25} height={15} />
          <CardTitle className="text-gray-900">{note?.title?.length > 20 ? `${note.title.substring(0, 20)}...` : note?.title}</CardTitle>
        </CardHeader>
        <CardFooter className="flex justify-end items-center gap-2 text-gray-900">
          <DeleteNote noteId={note?.id as number} userId={userId} />
          <Link href={`/dashboard/notes/${note?.id}`}>
            <div className="">
              <EditIcon className="w-5" />
            </div>
          </Link>
        </CardFooter>
      </Card>
    </>
  );
};

export default SingleNote;
