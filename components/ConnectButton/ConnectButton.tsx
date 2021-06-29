import { useWalletModal } from "@pancakeswap-libs/uikit";
import React, { useContext } from "react";
// import { ExternalStateContext } from "../../Context/ExternalState";
import useAuth from "../../hooks/useAuth";
import Button, { ButtonProps } from "../Button/Button";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";

const ConnectButton = (props: ButtonProps) => {
  const { login, logout } = useAuth();
  const { account } = useWeb3React<Web3Provider>();
  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(
    login,
    logout,
    account
  );

  //   const { state: icoState } = useContext(ExternalStateContext);
  //   const endTime = icoState.endTime?.toNumber() * 1000;
  //   const startTime = icoState.startTime?.toNumber() * 1000;
  //   const hasEnded = endTime < Date.now();
  //   const hasStarted = startTime < Date.now();
  return (
    <Button
      {...props}
      size={"sm"}
      onClick={() => {
        account ? onPresentAccountModal() : onPresentConnectModal();
      }}

      //   disabled={!hasStarted || hasEnded}
    >
      {account
        ? account.substr(0, 3) + "..." + account.substr(account.length - 3, 3)
        : "CONNECT"}
    </Button>
  );
};

export default ConnectButton;
