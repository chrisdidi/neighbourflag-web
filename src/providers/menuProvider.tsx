import { useState, createContext, useContext } from "react";

interface IProps {
  show: boolean;
  showMenu: () => void;
  hideMenu: () => void;
}
const menuStore = createContext<IProps>({
  show: true,
  showMenu: () => {},
  hideMenu: () => {},
});

export const MenuProvider: React.FC = ({ children }) => {
  const menu = useProvideMenu();
  return <menuStore.Provider value={menu}>{children}</menuStore.Provider>;
};

export const useMenu = () => {
  return useContext(menuStore);
};

const useProvideMenu = () => {
  const [show, setShow] = useState(true);

  const showMenu = () => {
    setShow(true);
  };
  const hideMenu = () => {
    setShow(false);
  };

  return {
    show,
    showMenu,
    hideMenu,
  };
};
