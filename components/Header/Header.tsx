import React, { useContext, useEffect } from "react";
import ConnectButton from "../ConnectButton/ConnectButton";
import styles from "./Header.module.css";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { ExternalStateContext } from "../../Context/ExternalState";

interface MyProps {
  openWalletInfoModal: () => void;
}
const Header: React.FC<React.HTMLAttributes<HTMLDivElement> & MyProps> = ({
  openWalletInfoModal,
}) => {
  const { account } = useWeb3React<Web3Provider>();
  const { state: swapState } = useContext(ExternalStateContext);
  useEffect(() => {
    if (account) {
      console.log(swapState.balance);
      // Here I am facing error
    }
  }, [account]);
  return (
    <header className={styles.header}>
      <img src={"./images/brand.svg"} className={styles.header__brand} />
      <ConnectButton />
    </header>
  );
};

export default Header;
