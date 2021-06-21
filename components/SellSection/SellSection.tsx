import styles from "./SellSection.module.css";
import React, { useState } from "react";
import CustomButton from "../Button/Button";
import SwapCurrencyInputBox from "../SwapCurrencyInputBox/SwapCurrencyInputBox";
import Main from "../Main/Main";
import { useWalletAddress } from "../../context/StateProvider";
import { QuestionOutlineIcon } from "@chakra-ui/icons";
import ProgressStepper from "../ProgressStepper/ProgressStepper";
import ProgressBar from "../ProgressBar/ProgressBar";
import Info from "../Info/Info";
import HidableBar from "../HidableBar/HidableBar";

interface MyProps {
  onOpen: () => void;
  state: number;
  setState: (arg0: number) => void;
}
const SellSection: React.FC<React.HTMLAttributes<HTMLDivElement> & MyProps> = ({
  onOpen,
  setState,
  state,
}) => {
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState("");
  const [currency, setCurrency] = useState("bnb");
  const [state2, setState2] = useState(0);
  const [seeMoreDetails, setSeeMoreDetails] = useState(false);

  const [fromCurrency, setFromCurrency] = useState("GAINPROTOCOL");
  const [toCurrency, setToCurrency] = useState("BNB");
  const { address, setAddress } = useWalletAddress();
  return (
    <div className={styles.container}>
      <div className={styles.dailySellingLimit}>
        <Info>DAILY SELLING LIMITS</Info>
        <ProgressBar percent={50} />
      </div>
      <span
        className={styles.moreDetails}
        onClick={() => setSeeMoreDetails(!seeMoreDetails)}
      >
        {!seeMoreDetails ? "CLOSE" : "VIEW"} DETAILS
      </span>
      <HidableBar
        style={{ maxWidth: "500px", padding: "0 30px", marginBottom: "10px" }}
        isHidden={seeMoreDetails}
      >
        <div className={styles.GPInfo}>
          <div className={styles.label}>
            <Info>2% Liquidity</Info>
          </div>
          <div className={styles.data}>
            <p>5000,000</p>
            <img src={"./images/GP.svg"} />
          </div>
        </div>
        <div className={styles.GPInfo}>
          <div className={styles.label}>
            <Info>Daily Sell Capacity</Info>
          </div>
          <div className={styles.data}>
            <p>5000,000</p>
            <img src={"./images/GP.svg"} />
          </div>
        </div>
      </HidableBar>
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
          <img
            onClick={() => setState(0)}
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
            fontSize: "14px",
          }}
        >
          <p>Slippage Tolerance</p>
          <p>12%</p>
        </div>
        <div style={{ display: "flex", gap: "5px", width: "100%" }}>
          <CustomButton
            onClick={() => setState2(1)}
            style={{
              borderRadius: "14px",
              width: "40%",
              fontSize: "12px",
              lineHeight: "13px",
            }}
            disabled={state2 > 0}
          >
            {"Approve Gain Protocol"}
          </CustomButton>
          <CustomButton
            onClick={() => setState2(2)}
            style={{
              borderRadius: "14px",
              width: "60%",
              fontSize: "12px",
              lineHeight: "13px",
            }}
            disabled={state2 !== 1}
          >
            {"Swap"}
          </CustomButton>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <ProgressStepper state={state2} setState={setState2} />
        </div>
      </Main>
    </div>
  );
};

export default SellSection;
