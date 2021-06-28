import { useWalletModal } from "@pancakeswap-libs/uikit";
import React, { useContext } from "react";
// import { ExternalStateContext } from "../../Context/ExternalState";
import useAuth from "../../hooks/useAuth";
import Button, { ButtonProps } from "../Button/Button";

const ConnectButton = (props: ButtonProps) => {
  const { login, logout } = useAuth();
  const { onPresentConnectModal } = useWalletModal(login, logout);

  //   const { state: icoState } = useContext(ExternalStateContext);
  //   const endTime = icoState.endTime?.toNumber() * 1000;
  //   const startTime = icoState.startTime?.toNumber() * 1000;
  //   const hasEnded = endTime < Date.now();
  //   const hasStarted = startTime < Date.now();
  return (
    <Button
      {...props}
      size={"sm"}
      onClick={onPresentConnectModal}
      //   disabled={!hasStarted || hasEnded}
    >
      CONNECT
    </Button>
  );
};

export default ConnectButton;
