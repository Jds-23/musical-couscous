import styles from "./Header.module.css";
import Button from "../../Button/Button";
import { Theme, useTheme } from "../../../context/StateProvider";
import { useWeb3React } from "@web3-react/core";
import ConnectButton from "../../ConnectButton/ConnectButton";

interface MyProps {}
const Header: React.FC<React.HTMLAttributes<HTMLDivElement> & MyProps> = ({
  className,
  ...props
}) => {
  const { theme, setTheme } = useTheme();
  const { account } = useWeb3React();
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
