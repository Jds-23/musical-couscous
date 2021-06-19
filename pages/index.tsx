import Head from "next/head";
import React, { useState } from "react";
import Switch from "../components/Switch/Switch";
import Header from "../components/Header/Header";
import styles from "../styles/Home.module.css";
import { ModalFooter, ModalBody, useDisclosure } from "@chakra-ui/react";
import BuySection from "../components/BuySection/BuySection";
import SellSection from "../components/SellSection/SellSection";
import WalletInfoModal from "../components/WalletInfoModal/WalletInfoModal";
import ConfirmSwapModal from "../components/ConfirmSwapModal/ConfirmSwapModal";
import InfoCards from "../components/InfoCards/InfoCards";

export default function Home() {
  const [state, setState] = useState(0);
  const [walletInfoModal, setWalletInfoModal] = useState(false);
  const [confirmSwapModal, setConfirmSwapModal] = useState(false);
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
      <Header openWalletInfoModal={() => setWalletInfoModal(true)} />
      <WalletInfoModal
        isOpen={walletInfoModal}
        onClose={() => setWalletInfoModal(false)}
      />
      <ConfirmSwapModal
        isOpen={confirmSwapModal}
        onClose={() => setConfirmSwapModal(false)}
      />
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
        {state === 0 ? (
          <BuySection onOpen={() => setConfirmSwapModal(true)} />
        ) : (
          <SellSection onOpen={() => setConfirmSwapModal(true)} />
        )}
        <InfoCards
          infoArr={[
            { label: "Buyer Fee", data: "3.5% = 56,689 Gain" },
            { label: "Liquidity", data: "3.5% = 56,689 Gain" },
            { label: "Team", data: "3.5% = 56,689 Gain" },
            { label: "Sweepstakes", data: "3.5% = 56,689 Gain" },
          ]}
        />
        <InfoCards
          infoArr={[
            { label: "Minimum received", data: "0.038759 BNB" },
            { label: "Liquidity", data: "<0.01%", isYellow: true },
            { label: "Liquidity Provider Fee", data: "23.42 GAIN PROTOCOL" },
          ]}
        />
      </div>
    </div>
  );
}
