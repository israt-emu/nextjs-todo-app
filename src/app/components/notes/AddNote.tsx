import React from "react";
import dynamic from "next/dynamic";

const AddNote = () => {
  const Editor = dynamic(() => import("./Editor"), {ssr: false});
  return (
    <div>
      <Editor />
    </div>
  );
};

export default AddNote;
