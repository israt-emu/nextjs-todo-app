import {getAllColor} from "@/app/actions/color";
import AddNote from "@/app/components/notes/AddNote";
import React from "react";

const AddNotePage = async () => {
  const colors = await getAllColor();
  return (
    <div className="md:w-11/12 lg:w-full mx-auto mt-8 md:mt-0">
      <AddNote colors={colors?.data} />
    </div>
  );
};

export default AddNotePage;
