import React from "react";
import dynamic from "next/dynamic";
import NoteBanner from "./NoteBanner";
import {getAllColor} from "@/app/actions/color";

const AddNote = async () => {
  const Editor = dynamic(() => import("./Editor"), {ssr: false});
  const colors = await getAllColor();
  return (
    <div className="mx-auto py-5">
      <NoteBanner colors={colors?.data} />
      <Editor />
    </div>
  );
};

export default AddNote;
