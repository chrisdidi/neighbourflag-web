import React from "react";
import { Logo } from "../assets/logo";
import Button from "../components/common/button";

const Home = () => {
  return (
    <div className=" absolute top-0 left-0 w-full max-w-screen responsive-padding font-poppins">
      <div className=" w-full h-screen flex">
        <div className="  w-full h-screen md:max-w-lg flex flex-col items-center justify-center">
          <div className=" w-full h-full flex flex-col items-start justify-end">
            <div className=" flex flex-col w-full justify-center ">
              <h1 className=" text-3xl font-bold text-secondary mr-2">
                Welcome to{" "}
              </h1>
              <Logo />
            </div>
            <p className=" text-gray-500 w-full mt-2">
              Raise a flag to ask for help or support a family in your
              community!
            </p>
          </div>
          <div className=" w-full h-full flex items-center justify-center">
            <div className=" grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
              <Button label="Raise a Flag" />
              <Button label="Send some love ❤" appearance="minimal" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
