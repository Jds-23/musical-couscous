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
        <Switch
          options={["Buy", "Sell"]}
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "48px",
          }}
          state={state}
          setState={setState}
        />
        <Main>
          <SwapCurrencyInputBox
            type={"From"}
            amount={amount}
            currency={""}
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
            currency={currency}
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
            Unlock Wallet
          </CustomButton>
        </Main>
      </div>
    </div>
  );
}
