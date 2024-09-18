"use client";
import React from "react";
import Player from "lottie-react";
import noteTaking from "../../animations/landing.json";

const NotePlayer = () => {
  return (
    <div className="flex items-center justify-center z-0">
      <Player autoplay animationData={noteTaking} />
    </div>
  );
};

export default NotePlayer;
