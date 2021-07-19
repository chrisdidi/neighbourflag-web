import { MenuIcon } from "evergreen-ui";
import React, { useState } from "react";

const Menu = () => {
  const [mobileShow, setMobileShow] = useState(false);
  return (
    <div className={`fixed bottom-0 right-0 md:static md:w-full max-w-xs`}>
      {/** Web menu */}
      <div className=" pt-20 p-4 hidden md:flex flex-col bg-secondary  md:h-screen">
        <p>First item</p>
      </div>
      {/**Mobile menu */}
      <div
        className={` md:hidden fixed top-0 left-0 bg-secondary w-screen h-screen transform duration-300 ${
          mobileShow ? " bg-opacity-70" : " bg-opacity-0 pointer-events-none"
        }`}
      />
      <div className=" relative md:hidden">
        <div
          className={` absolute bottom-full right-0 mr-4 rounded-lg mb-4 w-40 bg-gray-50 transform duration-500 ${
            mobileShow
              ? " max-h-80 overflow-y-scroll"
              : "max-h-0 overflow-y-hidden"
          }`}
        >
          <p>Item 1</p>
          <p>Item 1</p>
          <p>Item 1</p>
        </div>
        <div
          className=" border-4 border-solid border-white w-max mr-4 mb-8 relative bg-primary rounded-3xl p-4 text-white shadow-md cursor-pointer hover:mb-9 hover:shadow-lg transform duration-300"
          onClick={setMobileShow.bind(this, !mobileShow)}
        >
          <MenuIcon />
        </div>
      </div>
    </div>
  );
};

export default Menu;
