import {getAllColor} from "@/app/actions/color";
import {getUserFromToken} from "@/app/actions/cookie";
import {findNoteById} from "@/app/actions/note";
import EditNote from "@/app/components/notes/EditNote";
import {Note} from "@/app/types/note";
import React from "react";

const EditNotePage = async ({params}: {params: {id: string}}) => {
  const colors = await getAllColor();
  const user = await getUserFromToken();
  const note = await findNoteById(Number(params?.id), Number(user?.userId));
  return (
    <div className="md:w-11/12 lg:w-full mx-auto">
      <EditNote colors={colors?.data} note={note as Note} />
    </div>
  );
};

export default EditNotePage;
