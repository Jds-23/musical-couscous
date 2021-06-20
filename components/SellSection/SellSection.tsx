import styles from "./SellSection.module.css";
import { useState } from "react";
import CustomButton from "../Button/Button";
import SwapCurrencyInputBox from "../SwapCurrencyInputBox/SwapCurrencyInputBox";
import Main from "../Main/Main";
import { useWalletAddress } from "../../context/StateProvider";
import { QuestionOutlineIcon } from "@chakra-ui/icons";

interface MyProps {
  onOpen: () => void;
}
const SellSection: React.FC<React.HTMLAttributes<HTMLDivElement> & MyProps> = ({
  onOpen,
}) => {
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState("");
  const [currency, setCurrency] = useState("bnb");

  const [fromCurrency, setFromCurrency] = useState("GAINPROTOCOL");
  const [toCurrency, setToCurrency] = useState("BNB");
  const { address, setAddress } = useWalletAddress();
  return (
    <div className={styles.container}>
      <div className={styles.GPInfo}>
        <div className={styles.label}>
          <h4>Total Liquidity</h4>
          <QuestionOutlineIcon />
        </div>
        <div className={styles.data}>
          <p>5000,000</p>
          <img src={"./images/GP.svg"} />
        </div>
      </div>
      <div className={styles.GPInfo}>
        <div className={styles.label}>
          <h4>2% Liquidity</h4>
          <QuestionOutlineIcon />
        </div>
        <div className={styles.data}>
          <p>5000,000</p>
          <img src={"./images/GP.svg"} />
        </div>
      </div>
      <div className={styles.GPInfo}>
        <div className={styles.label}>
          <h4>Daily Sell Capacity</h4>
          <QuestionOutlineIcon />
        </div>
        <div className={styles.data}>
          <p>5000,000</p>
          <img src={"./images/GP.svg"} />
        </div>
      </div>
      <Main type={"Sell"}>
        <SwapCurrencyInputBox
          type={"From"}
          amount={amount}
          currency={fromCurrency}
          balance={balance}
          currencyOptions={["bnb"]}
          setAmount={setAmount}
          setCurrency={setCurrency}
          style={{ marginTop: "15px", marginBottom: "15px" }}
        />
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19.979"
            height="22.166"
            viewBox="0 0 19.979 22.166"
          >
            <defs>
              <linearGradient
                id="linear-gradient"
                y1="0.5"
                x2="1"
                y2="0.5"
                gradientUnits="objectBoundingBox"
              >
                <stop offset="0" stop-color="#cfc5f7" />
                <stop offset="0.894" stop-color="#cfa8f7" />
              </linearGradient>
            </defs>
            <path
              id="ArrowBottom"
              d="M6547.521,560.4a1.6,1.6,0,0,0-2.26,0l-5.663,5.663V550.919a1.6,1.6,0,1,0-3.2,0V566l-5.663-5.663a1.6,1.6,0,0,0-2.26,2.26l8.258,8.258a1.589,1.589,0,0,0,1.263.629h.028a1.594,1.594,0,0,0,1.13-.468l8.363-8.363A1.6,1.6,0,0,0,6547.521,560.4Z"
              transform="translate(-6528.011 -549.32)"
              fill="url(#linear-gradient)"
            />
          </svg>
        </div>
        <SwapCurrencyInputBox
          type={"To"}
          amount={amount}
          currency={toCurrency}
          balance={balance}
          currencyOptions={["bnb"]}
          setAmount={setAmount}
          setCurrency={setCurrency}
          style={{ marginTop: "15px", marginBottom: "15px" }}
        />
        <div
          style={{
            display: "flex",
            marginBottom: "30px",
            justifyContent: "space-between",
            color: "#7A71A7",
            padding: "1px 5px",
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

export default SellSection;
