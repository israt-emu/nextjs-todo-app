"use client";
import React from "react";
import Player from "lottie-react";
import login from "../../../animations/login-animations.json";

const LoginPlayer = () => {
  return (
    <div className="w-11/12 mx-auto">
      <Player autoplay animationData={login} />
    </div>
  );
};

export default LoginPlayer;
