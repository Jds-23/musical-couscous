import Head from "next/head";
import React, { useState } from "react";
import CustomButton from "../components/Button/Button";
import Switch from "../components/Switch/Switch";
import Header from "../components/Header/Header";
import CustomModal from "../components/Modal/Modal";
import SwapCurrencyInputBox from "../components/SwapCurrencyInputBox/SwapCurrencyInputBox";
import styles from "../styles/Home.module.css";
import { ModalFooter, ModalBody, useDisclosure } from "@chakra-ui/react";
import Main from "../components/Main/Main";

export default function Home() {
  const [state, setState] = useState(0);
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState("");
  const [currency, setCurrency] = useState("bnb");
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div className={styles.home__container}>
      <Head>
        <title>Gain Protocol SwapX</title>
        <meta name="description" content="Coin offering" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="preload"
          href="/fonts/euro_technic_extended_regular.ttf"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/Eurostile-Bold.ttf"
          as="font"
          crossOrigin=""
        />
      </Head>
      <Header />
      <CustomModal title={"This a ti"} isOpen={isOpen} onClose={onClose}>
        <ModalBody>
          <h1>Iam a modal</h1>
        </ModalBody>
        <ModalFooter>
          <CustomButton onClick={onClose}>Close</CustomButton>
        </ModalFooter>
      </CustomModal>
      <div className={styles.home__content}>
        <CustomButton onClick={onOpen} block>
          Unlock Wallet
        </CustomButton>
        <Switch options={["Buy", "Sell"]} state={state} setState={setState} />
        <Main>
          <SwapCurrencyInputBox
            type={"to"}
            amount={amount}
            currency={currency}
            balance={balance}
            currencyOptions={["bnb"]}
            setAmount={setAmount}
            setCurrency={setCurrency}
          />
        </Main>
      </div>
    </div>
  );
}
