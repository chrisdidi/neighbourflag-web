import { CrossIcon, MenuIcon } from "evergreen-ui";
import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import { useAuth } from "../providers/authProvider";
import { isPathActive } from "../utils/helpers";

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
  const history = useHistory();
  const { signOut } = useAuth();
  const [mobileShow, setMobileShow] = useState(false);

  const mobileMenuRef = useRef(null);

  useOnClickOutside(mobileMenuRef, () => setMobileShow(false));

  const onRedirect = (path: string) => {
    history.push(path);
    setMobileShow(false);
  };

  return (
    <div
      className={` z-30 fixed bottom-0 right-0 md:w-full max-w-xs font-poppins`}
      ref={mobileMenuRef}
    >
      {/** Web menu */}
      <div className=" hidden md:flex flex-col bg-secondary mr-4 rounded-t-xl overflow-hidden">
        <div
          className=" flex items-center bg-primary text-white font-semibold p-4 cursor-pointer"
          onClick={setMobileShow.bind(this, !mobileShow)}
        >
          {mobileShow ? <CrossIcon /> : <MenuIcon />}
          <p className=" ml-3">Menu</p>
        </div>
        <div
          className={`${
            mobileShow ? " max-h-96" : "max-h-0"
          } overflow-hidden transition-all duration-300`}
        >
          {menuItems.map((item, index) => (
            <div
              className={`${
                isPathActive(item.path)
                  ? " bg-opacity-100 text-white"
                  : " text-gray-50 bg-opacity-0"
              } bg-primary p-4 cursor-pointer hover:bg-opacity-100 hover:text-white transform duration-300 group`}
              key={`${item.path}_${index}`}
              onClick={onRedirect.bind(this, item.path)}
            >
              <p className=" font-semibold">{item.name}</p>
              <p
                className={`${
                  isPathActive(item.path) ? "text-secondary" : "text-gray-400"
                } group-hover:text-secondary italic text-sm`}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/**Mobile menu */}
      <div
        className={` md:hidden fixed top-0 left-0 bg-secondary w-screen h-screen transform duration-300 ${
          mobileShow ? " bg-opacity-70" : " bg-opacity-0 pointer-events-none"
        }`}
      />
      <div className=" relative md:hidden">
        <div>
          <div
            className={` absolute bottom-full right-0 mr-4 rounded-2xl mb-4 w-56 bg-gray-50 transform duration-500 ${
              mobileShow
                ? " max-h-96 overflow-y-auto scrollbar"
                : "max-h-0 overflow-y-hidden"
            }`}
          >
            <p className=" text-primary text-lg font-semibold p-3">Menu</p>
            <div className=" mb-6">
              {menuItems.map((item, index) => (
                <div
                  className={` px-3 py-2 cursor-pointer hover:bg-primary hover:text-white transform duration-300 ${
                    window.location.pathname.toLowerCase() ===
                    item.path.toLowerCase()
                      ? `text-white bg-primary`
                      : `text-secondary`
                  }`}
                  key={`${item.name}_${index}`}
                  onClick={onRedirect.bind(this, item.path)}
                >
                  <p className={` font-semibold cursor-pointer`}>{item.name}</p>
                  <p className=" text-gray-500 italic">{item.description}</p>
                </div>
              ))}
            </div>
            <p
              className=" p-3 text-primary font-semibold text-lg cursor-pointer hover:text-secondary transform duration-300"
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
          {mobileShow ? <CrossIcon /> : <MenuIcon />}
        </div>
      </div>
    </div>
  );
};

export default Menu;
