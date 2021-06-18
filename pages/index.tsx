import Head from "next/head";
import React, { useState } from "react";
import CustomButton from "../components/Button/Button";
import Switch from "../components/Switch/Switch";
import SwapCurrencyInputBox from "../components/SwapCurrencyInputBox/SwapCurrencyInputBox";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [state, setState] = useState(0);
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState("");
  const [currency, setCurrency] = useState("bnb");
  return (
    <div className={styles.container}>
      <h1>Hello</h1>
      <Head>
        <title>Gain Protocol SwapX</title>
      </Head>
      <CustomButton block>Unlock Wallet</CustomButton>
      <Switch options={["Buy", "Sell"]} state={state} setState={setState} />
      <SwapCurrencyInputBox
        type={"to"}
        amount={amount}
        currency={currency}
        balance={balance}
        currencyOptions={["bnb"]}
        setAmount={setAmount}
        setCurrency={setCurrency}
      />
    </div>
  );
}
