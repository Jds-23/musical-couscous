import React from "react";
import ConnectButton from "../ConnectButton/ConnectButton";
import styles from "./Header.module.css";
import { Theme, useTheme } from "../../context/StateProvider";
interface MyProps {
  openWalletInfoModal: () => void;
}
const Header: React.FC<React.HTMLAttributes<HTMLDivElement> & MyProps> = ({
  openWalletInfoModal,
}) => {
  const { theme } = useTheme();
  return (
    <header
      className={`${styles.header} ${theme === "Dark" ? styles.dark : ""}`}
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
