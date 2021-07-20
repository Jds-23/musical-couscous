import { useState, useContext } from "react";
import styles from "./BuySection.module.css";
import CustomButton from "../Button/Button";
import SwapCurrencyInputBox from "../SwapCurrencyInputBox/SwapCurrencyInputBox";
import Main from "../Main/Main";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { ExternalStateContext } from "../../context/ExternalState";
import { ethers } from "ethers";
interface MyProps {
  onOpen: () => void;
  state: number;
  setState: (arg0: number) => void;
}
const BuySection: React.FC<React.HTMLAttributes<HTMLDivElement> & MyProps> = ({
  onOpen,
  state,
  setState,
}) => {
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState("");

  const { account } = useWeb3React<Web3Provider>();
  const { state: swapState } = useContext(ExternalStateContext);

  const [fromCurrency, setFromCurrency] = useState("BNB");
  const [toCurrency, setToCurrency] = useState("GAIN");

  console.log(
    swapState.reserves2
      ? parseFloat(ethers.utils.formatUnits(swapState.reserves2, 6)).toFixed(2)
      : ""
  );
  console.log(
    swapState.reserves1
      ? parseFloat(ethers.utils.formatUnits(swapState.reserves1, 6)).toFixed(2)
      : ""
  );
  console.log(
    swapState.token0
      ? parseFloat(ethers.utils.formatUnits(swapState.token0, 6)).toFixed(2)
      : ""
  );
  return (
    <div className={styles.container}>
      <Main type={"Buy"}>
        <SwapCurrencyInputBox
          type={"From"}
          amount={amount}
          currency={fromCurrency}
          balance={swapState.balance}
          currencyOptions={[]}
          setAmount={setAmount}
          setCurrency={setFromCurrency}
          style={{ marginTop: "15px", marginBottom: "15px" }}
        />
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <img
            onClick={() => setState(1)}
            className={`${styles.swap_icon} ${
              state !== 0 ? styles.swap__icon__rotate : ""
            }`}
            src="./images/swap.svg"
          />
        </div>
        <SwapCurrencyInputBox
          type={"To"}
          amount={amount}
          currency={toCurrency}
          balance={swapState.GPbalance}
          currencyOptions={[]}
          setAmount={setAmount}
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
          <p>12%</p>
        </div>
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
          <p>Price</p>
          <p style={{ textAlign: "right" }}>
            0.049585748 BNB per GAIN
            <img
              style={{ display: "inline" }}
              src="./images/reload.svg"
              alt="reload"
            />
          </p>
        </div>
        <CustomButton disabled={!account} onClick={onOpen} block>
          {account ? "Swap" : "Unlock Wallet"}
        </CustomButton>
      </Main>
    </div>
  );
};

export default BuySection;
