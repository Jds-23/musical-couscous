import { ethers, BigNumber } from "ethers";
import styles from "./Price.module.css";
import { ExternalStateContext } from "../../context/ExternalState";
import { useContext, useState } from "react";
import { useBoolean } from "@chakra-ui/react";
import { formatEtherShort, formatGain, useLiquidity } from "../../utils";
import { useAppContext } from "../../context/StateProvider";
import { formatEther } from "ethers/lib/utils";
const Price = () => {
  const { gain, bnb } = useLiquidity();
  const { state: swapState } = useContext(ExternalStateContext);
  const [flag, setFlag] = useBoolean();
  const { state: appState } = useAppContext();
  const bnbPerGain = () => {
    if (
      !appState.gainInBigNumber ||
      !appState.bnbInBigNumber ||
      appState.gainInBigNumber.isZero()
    ) {
      return "-";
    }
    return formatEtherShort(
      appState.bnbInBigNumber
        .mul(BigNumber.from(10).pow(9))
        .div(appState.gainInBigNumber),
      14
    );
  };
  const gainPerBNB = () => {
    if (
      !appState.gainInBigNumber ||
      !appState.bnbInBigNumber ||
      appState.bnbInBigNumber.isZero()
    ) {
      return "-";
    }
    return formatGain(
      appState.gainInBigNumber
        .mul(BigNumber.from(10).pow(18))
        .div(appState.bnbInBigNumber),
      4
    );
  };
  return (
    <>
      {flag ? (
        <>{bnbPerGain()} BNB per GAIN </>
      ) : (
        <>{gainPerBNB()} GAIN per BNB </>
      )}
      <img
        className={styles.reload}
        src="./images/reload.svg"
        role="button"
        alt="reload"
        onClick={setFlag.toggle}
      />
    </>
  );
};

export default Price;
