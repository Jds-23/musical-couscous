import { useState, useContext } from "react";
import styles from "./BuySection.module.css";
import CustomButton from "../Button/Button";
import SwapCurrencyInputBox from "../SwapCurrencyInputBox/SwapCurrencyInputBox";
import Main from "../Main/Main";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { ExternalStateContext } from "../../context/ExternalState";
import { BigNumber } from "ethers";
import Price from "../Price/Price";
import { BuyOrSell, useAppContext } from "../../context/StateProvider";
import { Types } from "../../reducer/reducer";
import { parseEther, parseUnits } from "ethers/lib/utils";
interface MyProps {
  onOpen: () => void;
}
const BuySection: React.FC<React.HTMLAttributes<HTMLDivElement> & MyProps> = ({
  onOpen,
}) => {
  const { library } = useWeb3React<Web3Provider>();
  const { account } = useWeb3React<Web3Provider>();
  const { state: swapState } = useContext(ExternalStateContext);

  const [fromCurrency, setFromCurrency] = useState("BNB");
  const [toCurrency, setToCurrency] = useState("GAIN");
  const { state: appState, dispatch } = useAppContext();

  const getGain = (amount: string) => {
    return swapState.reserves0 &&
      process.env.NEXT_PUBLIC_VARIABLE_1 &&
      process.env.NEXT_PUBLIC_VARIABLE_2
      ? swapState.reserves0
          .mul(process.env.NEXT_PUBLIC_VARIABLE_1)
          .mul(parseEther(amount === "" || amount === "." ? "0" : amount))
          .div(
            swapState.reserves1
              .mul(process.env.NEXT_PUBLIC_VARIABLE_2)
              .add(
                BigNumber.from(10)
                  .pow(18)
                  .mul(process.env.NEXT_PUBLIC_VARIABLE_1)
              )
          )
      : undefined;
  };
  const getBnb = (amount: string) => {
    return swapState.reserves1 &&
      process.env.NEXT_PUBLIC_VARIABLE_1 &&
      process.env.NEXT_PUBLIC_VARIABLE_2
      ? swapState.reserves1
          .mul(parseUnits(amount === "" || amount === "." ? "0" : amount, 9))
          .mul(process.env.NEXT_PUBLIC_VARIABLE_1)
          .div(
            swapState.reserves0
              .mul(process.env.NEXT_PUBLIC_VARIABLE_2)
              .add(
                BigNumber.from(10)
                  .pow(9)
                  .mul(process.env.NEXT_PUBLIC_VARIABLE_1)
              )
          )
      : undefined;
  };
  const checkIfDisabled = () => {
    if (
      appState.bnbInBigNumber !== undefined
        ? appState.bnbInBigNumber.isZero()
        : true
    ) {
      return true;
    }
    if (appState.bnbInBigNumber) {
      if (appState.bnbInBigNumber.gt(swapState.balance)) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className={styles.container}>
      <Main type={"Buy"}>
        <SwapCurrencyInputBox
          type={"From"}
          amount={appState.bnbInBigNumber}
          currency={fromCurrency}
          balance={swapState.balance}
          currencyOptions={[]}
          setAmount={(amount) => {
            dispatch({
              type: Types.gain,
              payload: {
                gain:
                  amount === "" || amount === "." ? undefined : getGain(amount),
                bnb:
                  amount === "" || amount === "."
                    ? undefined
                    : parseEther(amount),
              },
            });
          }}
          setCurrency={setFromCurrency}
          style={{ marginTop: "15px", marginBottom: "15px" }}
        />
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <img
            onClick={() =>
              dispatch({
                type: Types.toggleBuyOrSell,
                payload: { toggleBuyOrSell: BuyOrSell.Sell },
              })
            }
            className={`${styles.swap_icon} `}
            src="./images/swap.svg"
          />
        </div>
        <SwapCurrencyInputBox
          type={"To"}
          amount={appState.gainInBigNumber}
          currency={toCurrency}
          balance={swapState.GPbalance}
          currencyOptions={[]}
          setAmount={(amount) => {
            dispatch({
              type: Types.gain,
              payload: {
                gain:
                  amount === "" || amount === "."
                    ? undefined
                    : parseUnits(amount, 9),
                bnb:
                  amount === "" || amount === "." ? undefined : getBnb(amount),
              },
            });
          }}
          setCurrency={setToCurrency}
          style={{ marginTop: "15px", marginBottom: "15px" }}
        />
        <div
          style={{
            display: "flex",
            marginBottom: "30px",
            justifyContent: "space-between",
            color: "#7A71A7",
            padding: "1px 5px",
            fontSize: "14px",
          }}
        >
          <p>Slippage Tolerance</p>
          <p>{appState.slippageTolerance}%</p>
        </div>
        <div
          style={{
            display: "flex",
            marginBottom: "30px",
            justifyContent: "space-between",
            color: "#7A71A7",
            padding: "1px 5px",
            fontSize: "12px",
          }}
        >
          <p>Price</p>
          <p style={{ textAlign: "right" }}>
            <Price />
          </p>
        </div>
        <CustomButton
          disabled={!account ? true : checkIfDisabled()}
          onClick={onOpen}
          block
        >
          {account ? "Swap" : "Unlock Wallet"}
        </CustomButton>
      </Main>
    </div>
  );
};

export default BuySection;
