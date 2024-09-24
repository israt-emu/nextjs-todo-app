"use client";
import React from "react";
import Player from "lottie-react";
import notFound from "../../../animations/not-found.json";

const NotFoundPlayer = () => {
  return (
    <div className="w-9/12 sm:w-7/12 md:w-4/12 mx-auto">
      <Player autoplay animationData={notFound} />
    </div>
  );
};

export default NotFoundPlayer;
