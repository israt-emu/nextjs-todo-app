import React from "react";
import signupimg from "../../assets/sign-in-for-todo-app-1.svg";
import Image from "next/image";
import SignInForm from "./components/SignInForm";
const SignIn = () => {
  return (
    <div className="first-gradient grid grid-cols-2 gap-4 rounded">
      <Image src={signupimg} alt="signup" className="rounded-tl rounded-bl" />
      <div className="flex flex-col justify-center items-center">
        <h2 className="font-semibold text-2xl mb-2">Login to Your Account</h2>
        <SignInForm />
      </div>
    </div>
  );
};

export default SignIn;
