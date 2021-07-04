import styles from "./SellSection.module.css";
import React, { useState, useContext } from "react";
import CustomButton from "../Button/Button";
import SwapCurrencyInputBox from "../SwapCurrencyInputBox/SwapCurrencyInputBox";
import Main from "../Main/Main";
import ProgressStepper from "../ProgressStepper/ProgressStepper";
import ProgressBar from "../ProgressBar/ProgressBar";
import Info from "../Info/Info";
import HidableBar from "../HidableBar/HidableBar";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { ExternalStateContext } from "../../context/ExternalState";

interface MyProps {
  onOpen: () => void;
  state: number;
  setState: (arg0: number) => void;
}
const SellSection: React.FC<React.HTMLAttributes<HTMLDivElement> & MyProps> = ({
  setState,
  state,
}) => {
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState("");
  const [currency, setCurrency] = useState("bnb");
  const [state2, setState2] = useState(0);
  const [seeMoreDetails, setSeeMoreDetails] = useState(false);

  const { account } = useWeb3React<Web3Provider>();
  const { state: swapState } = useContext(ExternalStateContext);
  const [approving, setApproving] = useState(false);

  const [fromCurrency, setFromCurrency] = useState("GAINPROTOCOL");
  const [toCurrency, setToCurrency] = useState("BNB");
  const approve = () => {
    setApproving(true);
    setTimeout(() => {
      console.log("Hello");
      setState2(1);
      setApproving(false);
    }, 40500);
  };
  return (
    <div className={styles.container}>
      <div className={styles.dailySellingLimit}>
        <Info
          tooltip="The total amount of GAIN you are allowed to sell within 24 hours without
activating the whale protection protocol. Be aware, once whale protection is
activated your transaction will accumulate additional fees depending on the
total amount of GAIN being sold."
          style={{ marginBottom: "7px" }}
        >
          DAILY SELL LIMIT
        </Info>
        <ProgressBar percent={50} />
      </div>
      <span
        className={styles.moreDetails}
        onClick={() => setSeeMoreDetails(!seeMoreDetails)}
      >
        {seeMoreDetails ? "CLOSE" : "VIEW"} DETAILS
      </span>
      <HidableBar
        style={{ maxWidth: "500px", padding: "0 30px", marginBottom: "10px" }}
        isHidden={!seeMoreDetails}
      >
        <div className={styles.GPInfo}>
          <div className={styles.label}>
            <Info
              tooltip="The total amount of available liquidity. Available liquidity sets the daily sell
limit and price impact for all transactions. "
            >
              Total Liquidity
            </Info>
          </div>
          <div className={styles.data}>
            <p>5,000,000 GAIN</p>
          </div>
        </div>
        <div className={styles.GPInfo}>
          <div className={styles.label}>
            <Info
              tooltip="The total amount of GAIN you are allowed to sell within 24 hours without
activating the whale protection protocol. Be aware, once whale protection is
activated your transaction will accumulate additional fees depending on the
total amount of GAIN being sold."
            >
              Daily Sell Limit
            </Info>
          </div>
          <div className={styles.data}>
            <p>5,000,000 GAIN</p>
          </div>
        </div>
      </HidableBar>
      <Main style={{ marginTop: "10px" }} type={"Sell"}>
        <SwapCurrencyInputBox
          type={"From"}
          amount={amount}
          currency={fromCurrency}
          balance={swapState.GPbalance}
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
          balance={swapState.balance}
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
          <p>Price</p>
          <p style={{ textAlign: "right" }}>
            0.049585748 BNB per GAIN{" "}
            <img
              className={styles.reload}
              src="./images/reload.svg"
              alt="reload"
            />
          </p>
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
          <p>Slippage Tolerance</p>
          <p>12%</p>
        </div>
        <div style={{ display: "flex", gap: "5px", width: "100%" }}>
          <CustomButton
            onClick={approve}
            style={{
              borderRadius: "14px",
              width: "40%",
              fontSize: "12px",
              lineHeight: "13px",
            }}
            disabled={state2 > 0 || approving}
          >
            {state2 === 0 && !approving && "Approve Gain Protocol"}
            {approving && (
              <span>
                Approving
                <img
                  src="./images/reload.svg"
                  className={styles.approving}
                  alt="approving"
                />
              </span>
            )}
            {state2 >= 1 && !approving && "Approved"}
          </CustomButton>
          <CustomButton
            onClick={() => setState2(2)}
            style={{
              borderRadius: "14px",
              width: "60%",
              fontSize: "12px",
              lineHeight: "13px",
            }}
            disabled={state2 < 1 || approving}
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
