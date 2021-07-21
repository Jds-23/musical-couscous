import { useState, useContext } from "react";
import styles from "./BuySection.module.css";
import CustomButton from "../Button/Button";
import SwapCurrencyInputBox from "../SwapCurrencyInputBox/SwapCurrencyInputBox";
import Main from "../Main/Main";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { ExternalStateContext } from "../../context/ExternalState";
import { ethers, BigNumber } from "ethers";
import Price from "../Price/Price";
import { SwapState, useAppContext } from "../../context/StateProvider";
import { Types } from "../../reducer/reducer";
interface MyProps {
  onOpen: () => void;
}
const BuySection: React.FC<React.HTMLAttributes<HTMLDivElement> & MyProps> = ({
  onOpen,
}) => {
  const [toAmount, setToAmount] = useState("");
  const [fromAmount, setFromAmount] = useState("");

  const { account } = useWeb3React<Web3Provider>();
  const { state: swapState } = useContext(ExternalStateContext);

  const [fromCurrency, setFromCurrency] = useState("BNB");
  const [toCurrency, setToCurrency] = useState("GAIN");
  const { state: appState, dispatch } = useAppContext();

  const getGain = (amount: string) => {
    return swapState.reserves0
      ? swapState.reserves0
          .mul(998)
          .mul(BigNumber.from(10).pow(18).mul(amount))
          .div(
            swapState.reserves1
              .mul(1000)
              .add(BigNumber.from(10).pow(18).mul(998))
          )
      : undefined;
  };
  const getBnb = (amount: string) => {
    return swapState.reserves1
      ? swapState.reserves1
          .mul(BigNumber.from(10).pow(9).mul(amount))
          .mul(998)
          .div(
            swapState.reserves0
              .mul(1000)
              .add(BigNumber.from(10).pow(9).mul(998))
          )
      : undefined;
  };

  return (
    <div className={styles.container}>
      <Main type={"Buy"}>
        <SwapCurrencyInputBox
          type={"From"}
          amount={appState.bnbInString}
          currency={fromCurrency}
          balance={swapState.balance}
          currencyOptions={[]}
          setAmount={(amount) => {
            dispatch({
              type: Types.gain,
              payload: {
                gain: amount === "" ? "" : getGain(amount),
                bnb: BigNumber.from(10).pow(18).mul(amount),
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
                type: Types.swapState,
                payload: { swapState: SwapState.Sell },
              })
            }
            className={`${styles.swap_icon} `}
            src="./images/swap.svg"
          />
        </div>
        <SwapCurrencyInputBox
          type={"To"}
          amount={appState.gainInString}
          currency={toCurrency}
          balance={swapState.GPbalance}
          currencyOptions={[]}
          setAmount={(amount) => {
            dispatch({
              type: Types.gain,
              payload: {
                gain: BigNumber.from(10).pow(9).mul(amount),
                bnb: amount === "" ? "" : getBnb(amount),
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
        <Price />
        <CustomButton disabled={!account} onClick={onOpen} block>
          {account ? "Swap" : "Unlock Wallet"}
        </CustomButton>
      </Main>
    </div>
  );
};

export default BuySection;
