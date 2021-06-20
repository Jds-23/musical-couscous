import styles from "../styles/Countdown.module.css";
import Head from "next/head";
import Header from "../components/Header/Header";
import { useState } from "react";

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
        <div className={styles.timer}>
          <div>
            <h3>17</h3>
            <p>days</p>
          </div>
          <div>
            <h3>23</h3>
            <p>hours</p>
          </div>
          <div>
            <h3>3</h3>
            <p>minutes</p>
          </div>
          <div>
            <h3>23</h3>
            <p>seconds</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
