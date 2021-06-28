import React from "react";
import CustomButton from "../Button/Button";
import ConnectButton from "../ConnectButton/ConnectButton";
import styles from "./Header.module.css";
import { useWalletAddress } from "../../context/StateProvider";
interface MyProps {
  openWalletInfoModal: () => void;
}
const Header: React.FC<React.HTMLAttributes<HTMLDivElement> & MyProps> = ({
  openWalletInfoModal,
}) => {
  const { address, setAddress } = useWalletAddress();
  return (
    <header className={styles.header}>
      <img src={"./images/brand.svg"} className={styles.header__brand} />
      <ConnectButton />
    </header>
  );
};

export default Header;
