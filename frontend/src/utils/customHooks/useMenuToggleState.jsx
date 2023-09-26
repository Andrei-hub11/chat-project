import { useState, useCallback } from "react";

const useMenuToggleState = () => {
  const [menus, setMenus] = useState(["register"]);

  const openMenu = useCallback((menuName) => {
    setMenus((prevMenus) => [...prevMenus, menuName]);
  }, []);

  const closeMenu = useCallback((menuName) => {
    setMenus((prevMenu) => prevMenu.filter((name) => name !== menuName));
  }, []);

  const isMenuOpen = useCallback((menuId) => menus.includes(menuId), [menus]);

  return {
    menus,
    openMenu,
    closeMenu,
    isMenuOpen,
  };
};

export default useMenuToggleState;
