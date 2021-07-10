import React from "react";
import { useHistory } from "react-router-dom";
import { Logo } from "../assets/logo";
const Header = () => {
  const history = useHistory();
  return (
    <div
      className={
        " flex-between-center p-3 md:px-20 responsive-padding animation-all sticky top-0 border-b border-solid border-gray-200"
      }
    >
      <div className=" cursor-pointer" onClick={() => history.push("/")}>
        <Logo size={"md"} />
      </div>
      <div className=" flex-end-center group cursor-pointer  relative">
        <div className=" w-0 overflow-hidden group-hover:w-40 group-hover:px-2 py-2 absolute mr-9 animation-all transition-all bg-gray-700 rounded-md bg-opacity-90">
          <p className=" whitespace-nowrap text-center text-gray-50">
            How does it work?
          </p>
        </div>
        <div className=" w-8 h-8 flex-center border rounded-full border-primary">
          <p className=" font-poppins text-primary">?</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
