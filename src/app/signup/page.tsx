import React from "react";
import SignUpForm from "../components/signup/SignUpForm";
import LoginPlayer from "../components/players/LoginPlayer";
const SignUp = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded">
      <LoginPlayer />
      <div className="flex flex-col justify-center items-center">
        <h2 className="font-semibold text-lg md:text-2xl mb-2">Create an Account</h2>
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUp;
