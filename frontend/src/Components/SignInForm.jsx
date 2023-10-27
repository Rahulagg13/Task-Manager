import { useRef, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import Button from "../UI/Button";
import googleImage from "../assets/google.png";

const SignInForm = () => {
  const email = useRef(null);
  const password = useRef("");
  const { signin, isLoading, error } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: email.current.value,
      password: password.current.value,
    };
    await signin(data);
  };
  return (
    <div className="h-screen w-full flex flex-col mt-10 items-center mx-auto ">
      <div className=" flex flex-col items-center space-y-12 p-8 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold ">Log in</h1>
        <form
          className="flex flex-col space-y-4 mx-auto "
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col justify-start space-y-2  w-full md:w-[400px]">
            <label htmlFor="username" className="text-lg font-bold">
              email
            </label>
            <input
              type="text"
              id="email"
              placeholder="JohnDoe@mail.com"
              ref={email}
              className="border-2  border-black  px-4 py-2 text-2xl font-medium rounded-lg md:px-2 md:text-lg "
              required
            />
          </div>

          <div className="flex flex-col justify-start space-y-2">
            <label htmlFor="password" className="text-lg font-bold">
              Password
            </label>
            <input
              type="password"
              id="password"
              ref={password}
              placeholder="Enter your password"
              className="border-2 border-black px-4 py-2 text-2xl font-bold rounded-lg md:px-2 md:text-lg "
              required
            />
          </div>
          <div className=" flex flex-col ">
            <p>Forget Password ?</p>
            <Button type="submit" className="bg-green-400 mt-8 w-full">
              Sign in
            </Button>
          </div>
        </form>
      </div>
      <div className="flex flex-col items-center space-y-8 mt-4 ">
        <p className="font-semibold">Or</p>
        <button className="font-bold text-xl border-2 px-12 py-4 rounded-full bg-gray-300 flex items-center space-x-6 ">
          <span>
            <img
              src={googleImage}
              alt="google"
              className="bg-inherit w-8 h-8 mr-4"
            />
          </span>
          Continue with Google
        </button>
      </div>

      {error && toast.error(error)}
    </div>
  );
};

export default SignInForm;
