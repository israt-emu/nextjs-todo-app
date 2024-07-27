import React from "react";
import signupimg from "../../assets/sign-in-for-todo-app.svg";
import Image from "next/image";
import SignUpForm from "./components/SignUpForm";
const SignUp = () => {
  return (
    <div className="first-gradient grid grid-cols-2 gap-4 rounded">
      <Image src={signupimg} alt="signup" className="rounded-tl rounded-bl" />
      <div className="flex flex-col justify-center items-center">
        <h2 className="font-semibold text-2xl mb-2">Create an Account</h2>
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUp;
