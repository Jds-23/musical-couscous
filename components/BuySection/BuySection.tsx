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
  const [toAmount, setToAmount] = useState("");
  const [fromAmount, setFromAmount] = useState("");
  const [balance, setBalance] = useState("");

  const { account } = useWeb3React<Web3Provider>();
  const { state: swapState } = useContext(ExternalStateContext);

  const [fromCurrency, setFromCurrency] = useState("BNB");
  const [toCurrency, setToCurrency] = useState("GAIN");
  const getGain = (amount: string) => {
    return swapState.reserves0
      ? ethers.utils.formatUnits(
          swapState.reserves0
            .mul(998)
            .mul(BigNumber.from(10).pow(18).mul(amount))
            .div(
              swapState.reserves1
                .mul(1000)
                .add(BigNumber.from(10).pow(18).mul(998))
            ),
          9
        )
      : "";
  };
  const getBnb = (amount: string) => {
    return swapState.reserves1
      ? ethers.utils.formatEther(
          swapState.reserves1
            .mul(BigNumber.from(10).pow(9).mul(amount))
            .mul(998)
            .div(
              swapState.reserves0
                .mul(1000)
                .add(BigNumber.from(10).pow(9).mul(998))
            )
        )
      : "";
  };
  const setBNBAmount = (amount: string) => {
    console.log(amount);
    setToAmount(amount === "" ? "" : getBnb(amount));
    setFromAmount(amount);
  };
  const setGAINAmount = (amount: string) => {
    console.log(amount);
    setToAmount(amount);
    setFromAmount(amount === "" ? "" : getGain(amount));
  };
  return (
    <div className={styles.container}>
      <Main type={"Buy"}>
        <SwapCurrencyInputBox
          type={"From"}
          amount={toAmount}
          currency={fromCurrency}
          balance={swapState.balance}
          currencyOptions={[]}
          setAmount={setGAINAmount}
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
          amount={fromAmount}
          currency={toCurrency}
          balance={swapState.GPbalance}
          currencyOptions={[]}
          setAmount={setBNBAmount}
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
        <Price />
        <CustomButton disabled={!account} onClick={onOpen} block>
          {account ? "Swap" : "Unlock Wallet"}
        </CustomButton>
      </Main>
    </div>
  );
};

export default BuySection;
