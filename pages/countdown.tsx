import styles from "../styles/Countdown.module.css";
import Head from "next/head";
import Header from "../components/Header/Header";
import React, { useState } from "react";
import CountdownTimer from "../components/CountdownTimer/CountdownTimer";
import CountdownScreen from "../components/CountdownScreen/CountdownScreen";

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
      <div className={styles.home__background} />
      <img
        src={"./images/background/LeftTop.svg"}
        className={styles.home__bg_left_top}
      />

      <img
        src={"./images/background/TopRight.svg"}
        className={styles.home__bg_right_top}
      />
      <img
        src={"./images/background/LeftBottom.svg"}
        className={styles.home__bg_left_bottom}
      />
      <img
        src={"./images/background/RightBottom.svg"}
        className={styles.home__bg_right_bottom}
      />
      <Header openWalletInfoModal={() => setWalletInfoModal(true)} />
      <CountdownScreen opensDate="Jun 25, 2021 00:00:00" />
    </div>
  );
};

export default Countdown;
