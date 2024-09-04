import {Note} from "@/app/types/note";
import React from "react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Image from "next/image";
import {EditIcon, Trash2} from "lucide-react";
const SingleNote = ({note}: {note: Note}) => {
  return (
    <>
      <Card className={`md:w-[320px] shadow-lg ${note?.color?.hexCode || "bg-gray-200"} border-gray-300`} style={{background: `${note?.color?.hexCode}`}}>
        <CardHeader>
          <Image src={note?.coverEmoji as string} alt="emoji" width={25} height={15} />
          <CardTitle>{note?.title}</CardTitle>
        </CardHeader>
        <div className="flex justify-end items-center gap-2 mb-2 mr-5">
          <div className="note-icon">
            <Trash2 className="w-5" />
          </div>
          <div className="note-icon">
            <EditIcon className="w-5" />
          </div>
        </div>
      </Card>
    </>
  );
};

export default SingleNote;
