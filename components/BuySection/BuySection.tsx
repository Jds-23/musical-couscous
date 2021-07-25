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
import {
  getAmountIn,
  getAmountOut,
  tryParseEther,
  tryParseGain,
  useLiquidity,
} from "../../utils";
import { isUndefined } from "lodash";
import TotalAgainAvailable from "../TotalAgainAvailable/TotalAgainAvailable";
interface MyProps {
  onOpen: () => void;
}
const BuySection: React.FC<React.HTMLAttributes<HTMLDivElement> & MyProps> = ({
  onOpen,
}) => {
  const { library } = useWeb3React<Web3Provider>();
  const { account } = useWeb3React<Web3Provider>();
  const { state: swapState } = useContext(ExternalStateContext);
  const { gain, bnb } = useLiquidity();

  const [fromCurrency, setFromCurrency] = useState("BNB");
  const [toCurrency, setToCurrency] = useState("GAIN");

  const [showTotalGain, setShowTotalGain] = useState(false);

  const { state: appState, dispatch } = useAppContext();

  const checkIfDisabled = () => {
    if (!account) {
      return "Unlock Wallet";
    }
    if (!swapState.balance) {
      return "Loading..";
    }
    if (!appState.bnbInBigNumber) {
      return "Enter Amount";
    } else {
      if (appState.bnbInBigNumber.isZero()) {
        return "Enter Amount";
      }
      if (appState.bnbInBigNumber.gt(swapState.balance)) {
        return "Insufficient BNB Balance";
      }
      return "Buy";
    }
  };

  return (
    <div className={styles.container}>
      {showTotalGain ? (
        <TotalAgainAvailable
          setShowTotalGain={setShowTotalGain}
          style={{ height: "542.5px" }}
        />
      ) : (
        <Main type={"Buy"}>
          <SwapCurrencyInputBox
            type={"From"}
            amount={appState.bnbInBigNumber}
            currency={fromCurrency}
            balance={swapState.balance}
            currencyOptions={[]}
            setShowTotalGain={(a: boolean) => {}}
            setAmount={(amount) => {
              const value = tryParseEther(amount, undefined);
              if (isUndefined(value)) {
                return;
              }
              dispatch({
                type: Types.bnb,
                payload: {
                  gain: getAmountOut(bnb, gain, value),
                  bnb: value,
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
              alt="Swap"
              onClick={() =>
                dispatch({
                  type: Types.toggleBuyOrSell,
                  payload: {
                    toggleBuyOrSell: BuyOrSell.Sell,
                    liquidity: { gain, bnb },
                  },
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
            balance={swapState.GPBalance}
            currencyOptions={[]}
            setShowTotalGain={setShowTotalGain}
            setAmount={(amount) => {
              const value = tryParseGain(amount, undefined);
              dispatch({
                type: Types.gain,
                payload: {
                  gain: value,
                  bnb: getAmountIn(bnb, gain, value),
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
            disabled={checkIfDisabled() !== "Buy"}
            onClick={onOpen}
            block
          >
            {checkIfDisabled()}
          </CustomButton>
        </Main>
      )}
    </div>
  );
};

export default BuySection;
