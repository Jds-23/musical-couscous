import Head from "next/head";
import React, { useState } from "react";
import CustomButton from "../components/Button/Button";
import Switch from "../components/Switch/Switch";
import CustomModal from "../components/Modal/Modal";
import SwapCurrencyInputBox from "../components/SwapCurrencyInputBox/SwapCurrencyInputBox";
import styles from "../styles/Home.module.css";
import { ModalFooter, ModalBody, useDisclosure } from "@chakra-ui/react";

export default function Home() {
  const [state, setState] = useState(0);
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState("");
  const [currency, setCurrency] = useState("bnb");
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div className={styles.container}>
      <CustomModal title={"This a ti"} isOpen={isOpen} onClose={onClose}>
        <ModalBody>
          <h1>Iam a modal</h1>
        </ModalBody>
        <ModalFooter>
          <CustomButton onClick={onClose}>Close</CustomButton>
        </ModalFooter>
      </CustomModal>
      <h1>Hello</h1>
      <Head>
        <title>Gain Protocol SwapX</title>
      </Head>
      <CustomButton onClick={onOpen} block>
        Unlock Wallet
      </CustomButton>
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
