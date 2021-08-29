import React, { useEffect, useRef, useState } from "react";
import ConnectButton from "../ConnectButton/ConnectButton";
import styles from "./Header.module.css";
import { Theme, useTheme } from "../../context/StateProvider";
interface MyProps {
  openWalletInfoModal: () => void;
  visibility2?: boolean;
}
const Header: React.FC<React.HTMLAttributes<HTMLDivElement> & MyProps> = ({
  openWalletInfoModal,
  visibility2 = true,
}) => {
  const { theme } = useTheme();
  const [goingUp, setGoingUp] = useState(false);
  const prevScrollY = useRef(0);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (prevScrollY.current < currentScrollY && goingUp) {
        setGoingUp(false);
      }
      if (prevScrollY.current > currentScrollY && !goingUp) {
        setGoingUp(true);
      }
      prevScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [goingUp]);
  console.log(visibility2);
  return (
    <header
      className={`${styles.header} ${!visibility2 ? styles.visible : ""} ${
        theme === "Dark" ? styles.dark : ""
      }`}
    >
      {theme === "Light" ? (
        <img
          className={styles.header__brand}
          src={"./gain-protocol-logo-dark.svg"}
          alt="logo"
        />
      ) : (
        <img
          className={styles.header__brand}
          src={"./gain-protocol-logo.svg"}
          alt="logo"
        />
      )}
      <ConnectButton />
    </header>
  );
};

export default Header;
