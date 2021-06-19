import React from "react";
import CustomButton from "../Button/Button";
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
      <CustomButton
        size={"sm"}
        onClick={() => {
          if (address === "") {
            setAddress("0x394759jfhdsbjk3klpombvggma7s9d8asbn49nq2");
          } else {
            openWalletInfoModal();
          }
        }}
      >
        {address === ""
          ? "Connect"
          : address.substring(0, 5) +
            "..." +
            address.substring(address.length - 5, address.length)}
      </CustomButton>
    </header>
  );
};

export default Header;
