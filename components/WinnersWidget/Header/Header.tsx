import styles from "./Header.module.css";
import Button from "../../Button/Button";
import { Theme, useTheme } from "../../../context/StateProvider";
import React from "react";
import ConnectButton from "../../ConnectButton/ConnectButton";

interface MyProps {}
const Header: React.FC<React.HTMLAttributes<HTMLDivElement> & MyProps> = ({
  className,
  ...props
}) => {
  const { theme, setTheme } = useTheme();
  return (
    <div
      {...props}
      className={`${styles.header} ${theme === "Dark" ? styles.dark : ""}`}
    >
      <ConnectButton size="sm" />
    </div>
  );
};

export default Header;
