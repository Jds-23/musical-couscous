import { useState } from "react";
import { Theme, useTheme } from "../../context/StateProvider";
import styles from "./MobileMenu.module.css";
import MobileMenuDrawer from "./MobileMenuDrawer/MobileMenuDrawer";
interface MyProps {
  hamburgerMenu: boolean;
  setHamburgerMenu: (hamburgerMenu: boolean) => void;
}
const MobileMenu: React.FC<React.HTMLAttributes<HTMLDivElement> & MyProps> = ({
  hamburgerMenu,
  setHamburgerMenu,
}) => {
  const { theme, setTheme } = useTheme();
  const [searchDrawer, setSearchDrawer] = useState(false);
  const useToggle = () => {
    setHamburgerMenu(!hamburgerMenu);
  };
  return (
    <>
      <MobileMenuDrawer
        searchDrawer={searchDrawer}
        setSearchDrawer={setSearchDrawer}
        show={hamburgerMenu}
        setShow={setHamburgerMenu}
      />
      <button
        onClick={useToggle}
        style={searchDrawer ? { display: "none" } : {}}
        className={`${styles.hamburger} ${
          theme === "Light" ? styles.hamburger__dark : ""
        } ${hamburgerMenu ? styles.hamburger__is__active : ""}`}
      >
        <span className={styles.line}></span>
        <span className={styles.line}></span>
        <span className={styles.line}></span>
        <span className={styles.text}>{!hamburgerMenu ? "Menu" : "Close"}</span>
      </button>
    </>
  );
};

export default MobileMenu;
