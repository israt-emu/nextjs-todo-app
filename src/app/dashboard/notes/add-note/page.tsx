import {getAllColor} from "@/app/actions/color";
import AddNote from "@/app/components/notes/AddNote";
import React from "react";

const AddNotePage = async () => {
  const colors = await getAllColor();
  return (
    <div>
      <AddNote colors={colors?.data} />
    </div>
  );
};

export default AddNotePage;
