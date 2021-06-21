import { useState } from "react";
import styles from "./BuySection.module.css";
import CustomButton from "../Button/Button";
import SwapCurrencyInputBox from "../SwapCurrencyInputBox/SwapCurrencyInputBox";
import Main from "../Main/Main";
import { useWalletAddress } from "../../context/StateProvider";
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

  const [fromCurrency, setFromCurrency] = useState("BNB");
  const [toCurrency, setToCurrency] = useState("GAINPROTOCOL");
  const { address, setAddress } = useWalletAddress();
  return (
    <div className={styles.container}>
      <Main type={"Buy"}>
        <SwapCurrencyInputBox
          type={"From"}
          amount={amount}
          currency={fromCurrency}
          balance={balance}
          currencyOptions={["bnb"]}
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
          balance={balance}
          currencyOptions={["bnb"]}
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
        <CustomButton onClick={onOpen} block>
          {address === "" ? "Unlock Wallet" : "Swap"}
        </CustomButton>
      </Main>
    </div>
  );
};

export default BuySection;
