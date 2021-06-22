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
import Info from "../components/Info/Info";
import ErrorModal from "../components/ErrorModal/ErrorModal";
import SuccessModal from "../components/SuccessModal/SuccessModal";
import HidableBar from "../components/HidableBar/HidableBar";
import { useToast, Box } from "@chakra-ui/react";

export default function Home() {
  const [state, setState] = useState(0);
  const [walletInfoModal, setWalletInfoModal] = useState(false);
  const [confirmSwapModal, setConfirmSwapModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [seeMoreDetails, setSeeMoreDetails] = useState(false);
  const toast = useToast();

  const successToast = () => {
    toast({
      position: "top",
      render: () => (
        <Box width={"100%"} color="#24135B" p={3} bg="#FFFFFF">
          <h1 style={{ fontSize: "22px", marginBottom: "50px" }}>
            Swap 0.0584758 BNB for 5794877 GAIN PROTOCOL
          </h1>
          <h1 style={{ fontSize: "19px", marginBottom: "10px" }}>
            View on BscScan
          </h1>
        </Box>
      ),
      isClosable: true,
    });
  };
  return (
    <>
      <WalletInfoModal
        isOpen={walletInfoModal}
        onClose={() => setWalletInfoModal(false)}
      />
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
        <ConfirmSwapModal
          isOpen={confirmSwapModal}
          successToast={successToast}
          onSuccessOpen={() => setSuccessModal(true)}
          onClose={() => setConfirmSwapModal(false)}
        />
        <ErrorModal isOpen={errorModal} onClose={() => setErrorModal(false)} />
        <SuccessModal
          isOpen={successModal}
          onClose={() => setSuccessModal(false)}
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
            <BuySection
              state={state}
              setState={setState}
              onOpen={() => setConfirmSwapModal(true)}
            />
          ) : (
            <SellSection
              state={state}
              setState={setState}
              onOpen={() => setConfirmSwapModal(true)}
            />
          )}
          <InfoCards>
            <div
              style={{
                fontSize: "14px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Info>Buyer Fee</Info>
              <p>3.5%</p>
              <p>56,789</p>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  textDecoration: "underline",
                  fontSize: "10px",
                  color: "#7a71a7",
                  cursor: "pointer",
                }}
                onClick={() => setSeeMoreDetails(!seeMoreDetails)}
              >
                {seeMoreDetails ? "CLOSE" : "VIEW"} DETAILS
              </span>
            </div>
            <HidableBar isHidden={!seeMoreDetails}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  width: "100%",
                }}
              >
                <div>
                  <Info>Liquidity</Info>
                  <Info>Team</Info>
                  <Info>Sweepstakes</Info>
                </div>
                <div style={{ textAlign: "center" }}>
                  <p>3.5%</p>
                  <p>3.5%</p>
                  <p>3.5%</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p>56,789</p>
                  <p>56,789</p>
                  <p>56,789</p>
                </div>
              </div>
            </HidableBar>
          </InfoCards>
          <InfoCards>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                width: "100%",
              }}
            >
              <div>
                <Info>Minimum received</Info>
                <Info>Price Impact</Info>
                <Info>Liquidity Provider Fee</Info>
              </div>
              <div style={{ textAlign: "right" }}>
                <p>56,789</p>
                <p style={{ color: "#ECB42A" }}>{"<"}0.01%</p>
                <p>23.42 GAIN PROTOCOL</p>
              </div>
            </div>
          </InfoCards>
        </div>
      </div>
    </>
  );
}
