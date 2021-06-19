import React from "react";
import CustomButton from "../Button/Button";
import styles from "./Header.module.css";
const Header = () => {
  return (
    <header className={styles.header}>
      <img src={"./images/brand.svg"} className={styles.header__brand} />
      <CustomButton size={"sm"} onClick={() => {}}>
        Connect
      </CustomButton>
    </header>
  );
};

export default Header;
