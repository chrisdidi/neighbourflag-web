import { MenuIcon } from "evergreen-ui";
import React, { useRef, useState } from "react";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import { useAuth } from "../providers/authProvider";

const menuItems = [
  {
    name: "Raise Flag",
    description: "Ask for help",
    path: "/raise-flag",
  },
  {
    name: "My Flags",
    description: "Flags you’ve raised",
    path: "/my-flags",
  },
  {
    name: "Helps Sent!",
    description: "People you've helped",
    path: "/helps-sent",
  },
  {
    name: "View Profile",
    description: "Manage your profile",
    path: "/my-profile",
  },
];
const Menu = () => {
  const [mobileShow, setMobileShow] = useState(false);
  const { signOut } = useAuth();
  const mobileMenuRef = useRef(null);
  useOnClickOutside(mobileMenuRef, () => setMobileShow(false));
  return (
    <div
      className={`fixed bottom-0 right-0 md:static md:w-full max-w-xs font-poppins`}
    >
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
      <div className=" relative md:hidden" ref={mobileMenuRef}>
        <div
          className={` absolute bottom-full right-0 mr-4 rounded-2xl mb-4 w-56 bg-gray-50 transform duration-500 ${
            mobileShow
              ? " max-h-96 overflow-y-auto scrollbar"
              : "max-h-0 overflow-y-hidden"
          }`}
        >
          <div className=" p-3">
            <p className=" text-primary text-lg font-semibold">Menu</p>
            <div className=" mt-2 mb-6">
              {menuItems.map((item, index) => (
                <div
                  className={` mt-2 cursor-pointer ${
                    window.location.href.includes(item.path)
                      ? `text-white bg-primary`
                      : `text-secondary`
                  }`}
                  key={`${item.name}_${index}`}
                >
                  <p className={` font-semibold cursor-pointer`}>{item.name}</p>
                  <p className=" text-gray-500 italic">{item.description}</p>
                </div>
              ))}
            </div>
            <p
              className=" text-primary font-semibold text-lg"
              onClick={signOut}
            >
              Sign Out
            </p>
          </div>
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
