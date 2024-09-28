import React from "react";
import SignInForm from "../components/signin/SignInForm";
import LoginPlayer from "../components/players/LoginPlayer";
const SignIn = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <LoginPlayer />
      <div className="flex flex-col justify-center items-center">
        <h2 className="font-semibold text-lg md:text-2xl mb-2 text-center">Login to Your Account</h2>
        <SignInForm />
      </div>
    </div>
  );
};

export default SignIn;
