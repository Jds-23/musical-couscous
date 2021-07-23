import { ethers, BigNumber } from "ethers";
import styles from "./Price.module.css";
import { ExternalStateContext } from "../../context/ExternalState";
import { useContext, useState } from "react";
import { useBoolean } from "@chakra-ui/react";
const Price = () => {
  const { state: swapState } = useContext(ExternalStateContext);
  const [flag, setFlag] = useBoolean();
  const bnbPerGain = () => {
    if (!swapState.reserves0 || !swapState.reserves1) {
      return "";
    }
    return swapState.reserves1
      ? ethers.utils.formatEther(
          swapState.reserves1
            .mul(BigNumber.from(10).pow(9))
            .mul(998)
            .div(
              swapState.reserves0
                .mul(1000)
                .add(BigNumber.from(10).pow(9).mul(998))
            )
        )
      : "";
  };
  const gainPerBNB = () => {
    if (!swapState.reserves0 || !swapState.reserves1) {
      return "";
    }
    return swapState.reserves0
      ? new Intl.NumberFormat("en-US").format(
          parseFloat(
            parseFloat(
              ethers.utils.formatUnits(
                swapState.reserves0
                  .mul(998)
                  .mul(BigNumber.from(10).pow(18))
                  .div(
                    swapState.reserves1
                      .mul(1000)
                      .add(BigNumber.from(10).pow(18).mul(998))
                  ),
                9
              )
            ).toFixed(2)
          )
        )
      : "";
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
