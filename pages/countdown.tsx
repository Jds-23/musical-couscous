import styles from "../styles/Countdown.module.css";
import Head from "next/head";
import Header from "../components/Header/Header";
import React, { useState } from "react";
import CountdownTimer from "../components/CountdownTimer/CountdownTimer";

const Countdown = () => {
  const [walletInfoModal, setWalletInfoModal] = useState(false);

  return (
    <div className={styles.countdown__container}>
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
      <Header openWalletInfoModal={() => setWalletInfoModal(true)} />
      <div className={styles.countdown__content}>
        <h1>TRADING OPENS IN </h1>
        <div className={styles.line}></div>
        <CountdownTimer opensDate={"Jun 25, 2021 00:00:00"} />
      </div>
    </div>
  );
};

export default Countdown;
