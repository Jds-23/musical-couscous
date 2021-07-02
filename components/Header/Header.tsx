import React from "react";
import ConnectButton from "../ConnectButton/ConnectButton";
import styles from "./Header.module.css";
interface MyProps {
  openWalletInfoModal: () => void;
}
const Header: React.FC<React.HTMLAttributes<HTMLDivElement> & MyProps> = ({
  openWalletInfoModal,
}) => {
  return (
    <header className={styles.header}>
      <img src={"./images/brand.svg"} className={styles.header__brand} />
      <ConnectButton />
    </header>
  );
};

export default Header;
