import React from "react";
import CustomButton from "../Button/Button";
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
      <CustomButton
        size={"sm"}
        onClick={() => {
          openWalletInfoModal();
        }}
      >
        Connect
      </CustomButton>
    </header>
  );
};

export default Header;
