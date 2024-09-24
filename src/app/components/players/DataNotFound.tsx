"use client";
import React from "react";
import Player from "lottie-react";
import noData from "../../../animations/data-not-found.json";

const NoDataPlayer = () => {
  return (
    <div className="w-10/12 sm:w-9/12 md:w-6/12 mx-auto">
      <Player autoplay animationData={noData} />
    </div>
  );
};

export default NoDataPlayer;
