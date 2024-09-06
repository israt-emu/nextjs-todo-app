import {getAllColor} from "@/app/actions/color";
import {findNoteById} from "@/app/actions/note";
import EditNote from "@/app/components/notes/EditNote";
import {Note} from "@/app/types/note";
import React from "react";

const EditNotePage = async ({params}: {params: {id: string}}) => {
  const colors = await getAllColor();
  const note = await findNoteById(Number(params?.id));
  return (
    <div className="md:w-11/12 lg:w-full mx-auto">
      <EditNote colors={colors?.data} note={note as Note} />
    </div>
  );
};

export default EditNotePage;
